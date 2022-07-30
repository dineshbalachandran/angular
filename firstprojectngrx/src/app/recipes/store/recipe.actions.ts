import { Action } from '@ngrx/store';
import { Recipe } from '../recipe.model';

export enum ActionType {
    SET_RECIPES = '[Recipes] Set Recipes',
    FETCH_RECIPES = '[Recipes] Fetch Recipes',
    ADD_RECIPE = '[Recipe] Add Recipe',
    UPDATE_RECIPE = '[Recipe] Update Recipe',
    DELETE_RECIPE = '[Recipe] Delete Recipe',
    STORE_RECIPES = '[Recipe] Store Recipes'
}

export class SetRecipes implements Action {
    readonly type = ActionType.SET_RECIPES;

    constructor(public payload: Recipe[]) {}
}

export class FetchRecipes implements Action {
    readonly type = ActionType.FETCH_RECIPES;
}

export class AddRecipe implements Action {
    readonly type = ActionType.ADD_RECIPE;
    constructor(public payload: Recipe) {}
}

export class UpdateRecipe implements Action {
    readonly type = ActionType.UPDATE_RECIPE;
    constructor(public payload: {index: number, recipe: Recipe}) {}
}

export class DeleteRecipe implements Action {
    readonly type = ActionType.DELETE_RECIPE;
    constructor(public payload: number) {}
}

export class StoreRecipe implements Action {
    readonly type = ActionType.STORE_RECIPES;
}

export type RecipeActions = SetRecipes | FetchRecipes | AddRecipe | DeleteRecipe | UpdateRecipe | StoreRecipe; 