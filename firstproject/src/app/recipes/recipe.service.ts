import { Recipe } from './recipe.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingService } from '../shopping-list/shopping.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {

  recipesChanged = new Subject<Recipe[]>();

  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'A Test Recipe',
  //     'This is simply a test',
  //     'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg',
  //     [
  //       new Ingredient('Meat', 1),
  //       new Ingredient('French Fries', 20)
  //     ]),
  //   new Recipe(
  //     'A Test Another Recipe',
  //     'This is simply a test',
  //     'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg',
  //     [
  //       new Ingredient('Buns', 2),
  //       new Ingredient('Meat', 1)
  //     ])
  // ];

  private recipes: Recipe[] = [];

  constructor(private slService: ShoppingService) { }

  getRecipes() {
    return this.recipes.slice(); //a copy of the array
  }

  addIngredientsToShoppingList(ingredients : Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  addRecipe(recipe: Recipe) {

    this.recipes.push(recipe);
    this.recipesChanged.next(this.getRecipes());

  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipesChanged.next(this.getRecipes());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.getRecipes());
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.getRecipes());
  }
}
