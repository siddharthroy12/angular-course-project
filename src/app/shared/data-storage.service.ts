import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RecipeService } from "../recipes/recipe.service";
import { map, tap } from 'rxjs/operators';
import { Recipe } from "../recipes/recipe.model";

const API_LINK = 'https://ng-tutorial-2721a-default-rtdb.firebaseio.com/';

@Injectable({ providedIn: 'root' })
export default class DataStorageService {
  constructor(private http: HttpClient,
              private recipesService: RecipeService) {}

  storeRecipes() {
    const recipes = this.recipesService.getRecipes();
    this.http.put(API_LINK+'recipes.json', recipes).subscribe();
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>(API_LINK+'recipes.json').
      pipe(map(res => {
        return res.map(recipe => {
          return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
        });
      }), tap( res => {
        this.recipesService.setRecipes(res);
      }));
  }
}
