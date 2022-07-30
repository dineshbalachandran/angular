import { Actions, Effect, ofType } from '@ngrx/effects';
import * as RecipeActions from './recipe.actions';
import { HttpClient } from '@angular/common/http';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';
import { Recipe } from '../recipe.model';
import { Injectable } from '@angular/core';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';

@Injectable()
export class RecipeEffects {
    constructor(private actions$: Actions, private http: HttpClient, private store: Store<fromApp.AppState>) {}

    @Effect()
    fetchRecipes = this.actions$.pipe(
            ofType(RecipeActions.ActionType.FETCH_RECIPES),
            switchMap(() => {
                return this.http.get<Recipe[]>('https://ng-course-recipe-book-ca953.firebaseio.com/recipes.json');
            }),
            map(recipes => {
                return recipes.map(recipe => {
                    return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []} ;
                });
            }),
            map(recipes => {
                return new RecipeActions.SetRecipes(recipes);
            })
        );
    
    @Effect()
    storeRecipes = this.actions$.pipe(
        ofType(RecipeActions.ActionType.STORE_RECIPES),
        withLatestFrom(this.store.select('recipes')),
        switchMap(([actionData, recipesState]) => {
            return this.http.put('https://ng-course-recipe-book-ca953.firebaseio.com/recipes.json', 
                    recipesState.recipes);
        })
    );
}