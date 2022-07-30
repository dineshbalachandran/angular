import { Actions, ofType, Effect } from '@ngrx/effects';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import * as AuthActions from './auth.actions';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user.model';
import { AuthService } from '../auth.service';

export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean
}


const handleAuthentication = ((expiresIn: number, email: string, token : string, userId: string) => { //map always returns an observable
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    localStorage.setItem('userData', JSON.stringify(user));
    return new AuthActions.AuthenticateSucess(
    {
        email: email, 
        token: token, 
        expirationDate: expirationDate,
        userId: userId,
        redirect: true
    });    
});

const handleError = errorRes => {
    let errorMessage = 'An unknown error occured';
    if (!errorRes.error || !errorRes.error.error) {
        return of(new AuthActions.AuthenticateFail(errorMessage)); // of creates an observable
    }
    switch(errorRes.error.error.message) {
        case 'EMAIL_EXISTS':
            errorMessage = 'This email exists already';
        case 'EMAIL_NOT_FOUND':
            errorMessage = 'This email does not exist';
        case 'INVALID_PASSWORD':
            errorMessage = 'This password is not correct'
    }
    return of(new AuthActions.AuthenticateFail(errorMessage)); 
};

@Injectable()
export class AuthEffects {    

    @Effect()
    authSignUp = this.actions$.pipe(
        ofType(AuthActions.ActionType.SIGNUP_START),
        switchMap((signupAction: AuthActions.SignupStart) => {
            return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAiFrCyOEB71GKwugDlBLqbmvnkKT57mr4',
            {
                email: signupAction.payload.email,
                password: signupAction.payload.password,
                returnSecureToken: true
            })
            .pipe(
                tap(resData => {
                    this.authService.setLogoutTimer(+resData.expiresIn * 1000);
                }),
                map(resData => {return handleAuthentication(+resData.expiresIn, resData.email, resData.idToken, resData.localId);}),
                //can't throw an error else the  actions$ observable stream will die
                catchError(errorRes => {return handleError(errorRes);}) 
            );
        }));

    @Effect()
    authLogin = this.actions$.pipe(
        ofType(AuthActions.ActionType.LOGIN_START),
        switchMap((authData: AuthActions.LoginStart) => { //create a new observable
            return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAiFrCyOEB71GKwugDlBLqbmvnkKT57mr4',
            {
                email: authData.payload.email,
                password: authData.payload.password,
                returnSecureToken: true
            })
            .pipe(
                tap(resData => {
                    this.authService.setLogoutTimer(+resData.expiresIn * 1000);
                }),
                map(resData => {return handleAuthentication(+resData.expiresIn, resData.email, resData.idToken, resData.localId);}),
                //can't throw an error else the  actions$ observable stream will die
                catchError(errorRes => {return handleError(errorRes);})
            );
        })
    );

    @Effect({dispatch: false}) //to indicate that there is no dispatchable action from this effect
    authRedirect = this.actions$.pipe(
        ofType(AuthActions.ActionType.AUTHENTICATE_SUCCESS), 
        tap((authSuccessAction: AuthActions.AuthenticateSucess) => {
            if (authSuccessAction.payload.redirect)
                this.router.navigate(['/']);
        })
    );

    @Effect({dispatch: false})
    authLogout = this.actions$.pipe(
        ofType(AuthActions.ActionType.LOGOUT),
        tap(() => {
            this.authService.clearLogoutTimer();
            localStorage.removeItem('userData');
            this.router.navigate(['/auth']);
        })
    );
    
    @Effect()
    authAutoLogin = this.actions$.pipe(
        ofType(AuthActions.ActionType.AUTO_LOGIN),
        map(() => {
            const userData : {
                email: string;
                id: string;
                _token: string;
                tokenExpirationDate: string;
            } = JSON.parse(localStorage.getItem('userData'));
    
            if (!userData) {
                return { type: 'DUMMY' };
            }
    
            const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData.tokenExpirationDate));
    
            if (loadedUser.token) {
                const expirationDuration = new Date(userData.tokenExpirationDate).getTime() - new Date().getTime();
                this.authService.setLogoutTimer(expirationDuration);
                return new AuthActions.AuthenticateSucess({
                    email: loadedUser.email,
                    userId: loadedUser.id,
                    token: loadedUser.token,
                    expirationDate: new Date(userData.tokenExpirationDate),
                    redirect: false
                });
                
                //this.autoLogout(expirationDuration);
            }
            return { type: 'DUMMY' };
        })

    )

    constructor(private actions$: Actions, private http: HttpClient, private router: Router, private authService: AuthService) {}
}