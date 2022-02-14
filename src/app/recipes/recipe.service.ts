import { EventEmitter, Injectable } from '@angular/core'
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes:Recipe[] = [
    new Recipe(
      'A Test Recipe',
      "This is a simple desc",
      "https://www.thespruceeats.com/thmb/yK8psUDvXdEKOvzFtLtx-n4ETuQ=/940x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/vegan-tofu-tikka-masala-recipe-3378484-hero-01-d676687a7b0a4640a55be669cba73095.jpg",
      [
        new Ingredient("Meat", 1),
        new Ingredient("French Fries", 20)
      ]
    )
  ];

  constructor(private slService: ShoppingListService) {}

  getRecipes() {
    return [ ...this.recipes ];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }
}
