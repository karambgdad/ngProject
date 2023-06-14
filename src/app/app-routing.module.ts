import { NgModule, inject } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipeListComponent } from "./recipes/recipe-list/recipe-list.component";
import { RecipeStartComponent } from "./recipes/recipe-start/recipe-start.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
import { RecipeResolverService } from "./recipes/recipes-resolver.service";
import { DataStorageService } from "./shared/data-storage.service";


//the new and short way to apply resolve
const appRoutes: Routes = [
  {path: '', redirectTo: '/recipes', pathMatch : 'full'},
  {path: 'recipes', component: RecipesComponent, children: [
      {path: '', component:RecipeStartComponent},
      {path: 'new', component: RecipeEditComponent},//when this line is after the "path: ':id'," line due to the way how we ordered our route it will try to parse "new" as an id, therefore we will get an error
      {path: ':id', component:RecipeDetailComponent , resolve: { data: ()=> inject(DataStorageService).fetchRecipes()}}, 
      //we inject DataStorageService then we can call its funtion, the result is the recipes, or an array of recipes, the result is assigned to the data variable/property of this object{} then we resolve the data, every time this route is loaded
      {path: ':id/edit', component: RecipeEditComponent, resolve: { data: ()=> inject(DataStorageService).fetchRecipes()}},
      //now angular will run this resolver before loading this routing 
  ]},
  {path: 'shopping-list', component: ShoppingListComponent}
]


/* the deprecated way for resolver
const appRoutes: Routes = [
    {path: '', redirectTo: '/recipes', pathMatch : 'full'},
    {path: 'recipes', component: RecipesComponent, children: [
        {path: '', component:RecipeStartComponent},
        {path: 'new', component: RecipeEditComponent},//when this line is after the "path: ':id'," line due to the way how we ordered our route it will try to parse "new" as an id, therefore we will get an error
        {path: ':id', component:RecipeDetailComponent , resolve: [RecipeResolverService]}, 
        {path: ':id/edit', component: RecipeEditComponent, resolve:[RecipeResolverService]},
        //now angular will run this resolver before loading this routing 
      ]},
      {path: 'shopping-list', component: ShoppingListComponent}
    ]
/* 

/* the new way of applying resolver depending on external service and external exported const and ResolveFn
see: recipes-resolver2.service.ts file and  export const RecipesResolver       
const appRoutes: Routes = [
    {path: '', redirectTo: '/recipes', pathMatch : 'full'},
    {path: 'recipes', component: RecipesComponent, children: [
        {path: '', component:RecipeStartComponent},
        {path: 'new', component: RecipeEditComponent},//when this line is after the "path: ':id'," line due to the way how we ordered our route it will try to parse "new" as an id, therefore we will get an error
        {path: ':id', component:RecipeDetailComponent , resolve: {data: RecipesResolver}}, 
        {path: ':id/edit', component: RecipeEditComponent, resolve: {data : RecipesResolver}},
        
        //now angular will run this resolver before loading this routing 
    ]},
    {path: 'shopping-list', component: ShoppingListComponent}
  ]
*/
        
        
      
///very imporant in regard of resolve///////

/*
so when we resolve a function that returns an array of recipes, for example, and we apply the resolver on one route, whenever we load this route the resolver wil resolve this function, but what this means, the retured value from resolver will be available for the component of that page or what?

Yes, when you apply a resolver to a route in Angular, the resolver function will be executed before the route is activated. The resolved value from the resolver will then be available for the component associated with that route.

Here's the sequence of events when a route with a resolver is navigated to:
The route with the resolver is activated.
The resolver function is executed.
The resolver function fetches or generates the data needed for the route (in your example, an array of recipes).
Once the data is resolved, it is made available in the data property of the ActivatedRouteSnapshot.
The associated component (in your case, the component for that route) is rendered.
Inside the component, you can access the resolved data through the ActivatedRoute's data property.
For example, if you have a RecipeListComponent associated with the route, you can access the resolved recipes in the component like this:


import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from './recipe.model';
@Component({
  // Component metadata
})
export class RecipeListComponent {
  recipes: Recipe[];

  constructor(private route: ActivatedRoute) {
    this.recipes = this.route.snapshot.data;
  }

  // Component logic
}
In this example, the RecipeListComponent accesses the resolved recipes by accessing this.route.snapshot.data.recipes. The resolved recipes are stored in the recipes property of the component, which can then be used within the component's template or for any other component logic.
By using a resolver, you can ensure that the necessary data is resolved before the component is rendered, avoiding any issues with loading data asynchronously within the component itself.
I hope this clarifies how the resolved value from the resolver is made available to the component associated with the route. 
*/

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {






}