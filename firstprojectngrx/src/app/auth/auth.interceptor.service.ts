import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpParams } from '@angular/common/http';
import { take, exhaustMap, map } from 'rxjs/operators';
import * as fromApp from '../store/app.reducer'; 
import { Store } from '@ngrx/store';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

    constructor(private store: Store<fromApp.AppState>) {}

    intercept(req: import("@angular/common/http").HttpRequest<any>, next: import("@angular/common/http").HttpHandler): import("rxjs").Observable<import("@angular/common/http").HttpEvent<any>> {
        return this.store.select('auth').pipe(
            take(1),
            map(authState => {
                return authState.user;
            }),
            exhaustMap(user => {
                if (!user) {
                    return next.handle(req);
                }
                const modifiedReq = req.clone({params: new HttpParams().set('auth', user.token)});
                return next.handle(modifiedReq);
            })
        );
    }

}