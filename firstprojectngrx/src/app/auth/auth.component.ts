import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';
import { Store } from '@ngrx/store';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit, OnDestroy {
    isLoginMode = true;
    isLoading = false;
    error: string = null;

    private storesub: Subscription;

    constructor(private store: Store<fromApp.AppState>) {}

    ngOnInit() {
        this.store.select('auth').subscribe(authState => {
            this.isLoading = authState.loading;
            this.error = authState.authError;
        });
    }

    onSwitchMode() {
        this.isLoginMode= !this.isLoginMode;
    }

    onSubmit(authForm: NgForm) {
        const email = authForm.value.email;
        const password = authForm.value.password;
       
        this.isLoading = true;
        
        if (this.isLoginMode) {            
            this.store.dispatch(
                new AuthActions.LoginStart({
                    email: email,
                    password: password
                })
            );
        } else {
            this.store.dispatch(
                new AuthActions.SignupStart({
                    email: email,
                    password: password
                })
            );
        }

        authForm.reset();
    }

    ngOnDestroy () {
        if (this.storesub) {
            this.storesub.unsubscribe();
        }        
    }

    onHandleError() {
        this.store.dispatch(new AuthActions.ClearErrror());
    }

}