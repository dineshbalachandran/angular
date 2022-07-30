import { Component, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import * as fromApp from '../store/app.reducer'; 
import { Store } from '@ngrx/store';
import * as AuthActions from '../auth/store/auth.actions';
import * as RecipeActions from '../recipes/store/recipe.actions';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
}) 
export class HeaderComponent implements OnInit, OnDestroy {  

    private userSub: Subscription;
    isAuthenticated = false;


    constructor(private store: Store<fromApp.AppState>) {}

    ngOnDestroy(): void {
        this.userSub.unsubscribe();
    }
    ngOnInit(): void {
        this.userSub = this.store.select('auth').subscribe(authState => {
            this.isAuthenticated = !!authState.user;            
            console.log(this.isAuthenticated);
        });
    }
    onSave() {
        this.store.dispatch(new RecipeActions.StoreRecipe());
    }

    onFetch() {        
        this.store.dispatch(new RecipeActions.FetchRecipes());
    }

    onLogout() {
        this.store.dispatch(new AuthActions.Logout());
    }
    
}
