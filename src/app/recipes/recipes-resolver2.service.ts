
import { Inject, Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Recipe } from "./recipe.model";
import { DataStorageService } from "../shared/data-storage.service";
import { RecipeService } from "./recipe.service";

//  @Injectable({providedIn:'root'})
// export class RecipeResolver2Service{
// constructor(private recipeService: RecipeService){}




/////////////very important////////////
//we use this way because we encouter a bug in editing a recipe, when editing a recipe and hitting the save button, the details for the recipe isnt updating, the route every time is fetching the already stored recipe in the server, therefore it is overwriting the edited recipe, so we see no changes in the recipe page .

//This file is not a class; it is a TypeScript module that exports a resolver function.


export const RecipesResolver: ResolveFn<Recipe[]> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
   ) => {
    const dataStorageService = inject(DataStorageService)
     const recipes:Recipe[] =  inject (RecipeService).getRecipes()
        if(recipes.length===0){
            return dataStorageService.fetchRecipes()
        }else {
            return recipes;//else we do have recipes, so there is no need to fetch them again
        }
       
}


















//another way, differ little bit
/*export const RecipesResolver: ResolveFn<Recipe[]> = (
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
        dataStorageService : DataStorageService = inject(DataStorageService)) =>{
           
         const recipes:Recipe[] =  inject (RecipeService).getRecipes()
            if(recipes.length===0){
                return dataStorageService.fetchRecipes()
            }else {
                return recipes;
            }
           
}
*/
