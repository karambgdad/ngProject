//after updating the recipes accordig to the HTTP request section, and when we click on a recipe, we are re routed to this link for ex. http://localhost:4200/recipes/0, when we reload the page we encouter an error, and that is related to us trying to reload the detail page of a recipe, which basically doesnt exist, because we are fetching our recipes from a back end.



//Now there are different ways of making this work. One of course would be to simply add a guard, that prevents us from accessing recipes/2 or the added route, which also has a an ID encoded in the URL. When we have no recipes loaded and instead redirects us to just /recipes for example.


//But we can also use well yet a guard, but another type of guard we can use a "resolver" A resolver is essentially some code that runs before a route is loaded to ensure that certain data that the route depends on is there. we add it in the recipes folder under the name: recipes-resolver.service.ts

//So now we try to define have a valid resolver that loads the data before this page is loaded
//http://localhost:4200/recipes/:id.
//or even this page is loaded http://localhost:4200/recipes/:id/edit
//so we should apply this revolver on the app-routing.module.ts

import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Recipe } from "./recipe.model";
import { DataStorageService } from "../shared/data-storage.service";

@Injectable({providedIn: 'root'})// will get injected on the route itself

export class RecipeResolverService implements Resolve<Recipe[]> {//it is a generic inferface, which means we need to define which type of data we are resolving in the end, in our case that will be the recipe data, so an array of recipes.

    constructor(private dataStorageService: DataStorageService){}//we inject DataStorageService, because this is the service that will make the http request here


    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){

        //the goal is to return either an array of recipes which we can't because we need to load it first, or an observable that will in the end yield an array of recipes.





        //For that, let's have a look at the data storage service. There, we have fetch recipes, and right now we subscribe in here. We just have to tweak this a little bit. I still want to set the recipes in the recipeService from inside fetchRecipes()
        // this.recipeService.setRecipes(recipes)
        // but we can simply do this by adding another RXjs operator, the TAP operator. The TAP operator allows us to execute some code here in place without altering the data that is funneled through that observable. So in here we will get our recipes array indeed and I will simply set the recipes in a service then, as before. 
        //But now I will not subscribe here anymore but instead return this call to this HTTP service "DataStorageService"
        //return this.http.get<Recipe[]>
        //And that means that in the header component, we now have to subscribe here. And you don't even have to pass in a function if you're not caring about the response anyways. So therefore here in the header component, this change of course is a bit redundant.

        return this.dataStorageService.fetchRecipes()//this will return the get methode(the observable)

        // but it's now really helpful here in the resolve() method. Because here we can now return this.dataStorageService.fetchRecipes. Now please note that I'm not subscribing here, but I'm simply not subscribing here because the resolver this Angular feature will subscribe for me to basically find out once the data is there.




    }

}


