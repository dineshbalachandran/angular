import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Recipe } from './recipe.model';
import * as RecipeActions from './store/recipe.actions';
import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { take, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({providedIn: 'root'})
export class RecipesResolverService implements Resolve<Recipe[]> {

    constructor(private store: Store<fromApp.AppState>, 
        private actions$: Actions) {}
    
    resolve(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot):
         Recipe[] | import("rxjs").Observable<Recipe[]> | Promise<Recipe[]> {
       
        return this.store.select('recipes').pipe(
            take(1),
            map(recipesState => {
                return recipesState.recipes;
            }),
            switchMap(recipes => {
                if (recipes.length === 0) {
                    this.store.dispatch(new RecipeActions.FetchRecipes());
                    return this.actions$.pipe(ofType(RecipeActions.ActionType.SET_RECIPES), take(1));
                } else {
                    return of(recipes);
                }            
            })
        );
                     
    }
}