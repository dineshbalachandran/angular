import { Action } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/ingredient.model';

export enum ActionType {
    ADD_INGREDIENT = '[Shopping List] Add Ingredient', //idiomatic way to define these global values 
    ADD_INGREDIENTS = '[Shopping List] Add Ingredients',
    UPDATE_INGREDIENT = "[Shopping List] Update Ingredient",
    DELETE_INGREDIENT = "[Shopping List] Delete Ingredient",
    START_EDIT = "[Shopping List] Start Edit",
    STOP_EDIT = "[Shopping List] Stop Edit"
};

export class AddIngredient implements Action {
    readonly type = ActionType.ADD_INGREDIENT;
    constructor(public payload: Ingredient) {}
}
export class AddIngredients implements Action {
    readonly type = ActionType.ADD_INGREDIENTS;
    constructor(public payload: Ingredient[]) {}
}
export class UpdateIngredient implements Action {
    readonly type = ActionType.UPDATE_INGREDIENT;
    constructor(public payload: {ingredient: Ingredient}) {}
}
export class DeleteIngredient implements Action {
    readonly type = ActionType.DELETE_INGREDIENT;
}
export class StartEdit implements Action {
    readonly type = ActionType.START_EDIT;
    constructor(public payload: number) {}
}
export class StopEdit implements Action {
    readonly type = ActionType.STOP_EDIT;   
}


export type ShoppingListActions = AddIngredient | 
    AddIngredients | 
    UpdateIngredient | 
    DeleteIngredient |
    StartEdit |
    StopEdit;