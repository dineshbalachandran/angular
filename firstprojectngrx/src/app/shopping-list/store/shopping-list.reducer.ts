import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';

export interface State {
    ingredients: Ingredient[];
    editedIngredient: Ingredient;
    editedIngredientIndex: number;
}

const initialState: State = {
    ingredients : [
        new Ingredient('Apple', 5),
        new Ingredient('Tomato', 10)
    ],
    editedIngredient: null,
    editedIngredientIndex: -1
};

export function shoppingListReducer(state: State = initialState, action : ShoppingListActions.ShoppingListActions) {   
    switch (action.type) {
        case ShoppingListActions.ActionType.ADD_INGREDIENT:
            console.log(action.type);
            console.log(action.payload);
            return {
                ...state,
                ingredients : [...state.ingredients, action.payload]
            };
        case ShoppingListActions.ActionType.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: [...state.ingredients, ...action.payload]
            };
        case ShoppingListActions.ActionType.UPDATE_INGREDIENT:
            const ingredient = state.ingredients[state.editedIngredientIndex];
            //"patch" the new data into the old; in a new copy
            const updatedIngredient = {...ingredient, ...action.payload.ingredient}; 
            const updatedIngredients = [...state.ingredients];
            updatedIngredients[state.editedIngredientIndex] = updatedIngredient;
           
            return {
                ...state,
                ingredients: updatedIngredients,
                editedIngredientIndex: -1,
                editedIngredient: null
            }
        case ShoppingListActions.ActionType.DELETE_INGREDIENT:
            return {
                ...state,
                ingredients: state.ingredients.filter((ig, i) => {
                    return state.editedIngredientIndex != i;
                }),
                editedIngredientIndex: -1,
                editedIngredient: null
            }
        case ShoppingListActions.ActionType.START_EDIT:
        return {
            ...state,
            editedIngredientIndex: action.payload,
            editedIngredient: {...state.ingredients[action.payload]} 
        }
        case ShoppingListActions.ActionType.STOP_EDIT:
            return {
                ...state,
                editedIngredientIndex: -1,
                editedIngredient: null
            }
        default:
            return state;
    }
}