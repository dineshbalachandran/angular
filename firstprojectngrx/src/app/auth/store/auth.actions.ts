import { Action } from '@ngrx/store';

export enum ActionType {
    AUTHENTICATE_SUCCESS = "[Auth] Authenticate Success",
    LOGOUT = "[Auth] Logout",
    LOGIN_START = "[Auth] Login Start",
    AUTHENTICATE_FAIL = "[Auth] Authenticate Fail",
    SIGNUP_START = "[Auth] Signup Start",
    CLEAR_ERROR = "[Auth] Clear Error",
    AUTO_LOGIN = "[Auth] Auto Login"
}

export class AuthenticateSucess implements Action {
    readonly type = ActionType.AUTHENTICATE_SUCCESS;
    constructor(public payload: {
        email: string;
        userId: string;
        token: string;
        expirationDate: Date,
        redirect: boolean
    }) {}
}

export class Logout implements Action {
    readonly type = ActionType.LOGOUT;    
}

export class LoginStart implements Action {
    readonly type = ActionType.LOGIN_START;
    constructor(public payload: {email: string, password: string}) {}
}

export class AuthenticateFail implements Action {
    readonly type = ActionType.AUTHENTICATE_FAIL;
    constructor(public payload: string) {}
}

export class SignupStart implements Action {
    readonly type = ActionType.SIGNUP_START;
    constructor(public payload: {email: string, password: string}) {}
}

export class ClearErrror implements Action {
    readonly type = ActionType.CLEAR_ERROR;
}

export class AutoLogin implements Action {
    readonly type = ActionType.AUTO_LOGIN;
}

export type AuthActions = 
    AuthenticateSucess |
    Logout | 
    AuthenticateFail | 
    LoginStart | 
    SignupStart | 
    ClearErrror |
    AutoLogin;