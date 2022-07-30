import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { map, take } from 'rxjs/operators';
import * as fromApp from '../store/app.reducer'; 
import { Store } from '@ngrx/store';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private store: Store<fromApp.AppState>) {}

    canActivate(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
        return this.store.select('auth').pipe(
            take(1),    
            map(authState => {
                const isAuth = !!authState.user;
                if (isAuth) {
                    return true;
                }
                return this.router.createUrlTree(['/auth']);
            })
        );
    }
}