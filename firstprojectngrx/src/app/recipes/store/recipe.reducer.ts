import { Recipe } from '../recipe.model';
import { RecipeActions } from './recipe.actions';
import { ActionType } from './recipe.actions';

export interface State {
    recipes: Recipe[];
}

const initialState: State = {
    recipes: []
}

export function recipeReducer(state = initialState, action: RecipeActions) {
    switch (action.type) {
        case ActionType.SET_RECIPES:
           return {
               ...state,
               recipes: [...action.payload]
           };
        case ActionType.ADD_RECIPE:
            return {
                ...state,
                recipes: [...state.recipes, action.payload]
            };
        case ActionType.UPDATE_RECIPE:
            const updatedRecipe = {
                ...state.recipes[action.payload.index],
                ...action.payload.recipe
            };

            const updatedRecipes = [...state.recipes];
            updatedRecipes[action.payload.index] = updatedRecipe;

            return {
                ...state,
                recipes: updatedRecipes
            };
        case ActionType.DELETE_RECIPE:
        return {
            ...state,
            recipes: [...state.recipes.filter((recipe, index) => { return index != action.payload; })]
        };
        default:
            return state; 
    }
}