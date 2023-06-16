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
import { RecipesResolver } from "./recipes/recipes-resolver2.service";
import { AuthComponent } from "./auth/auth.component";


// const appRoutes: Routes = [
//   {path: '', redirectTo: '/recipes', pathMatch : 'full'},
//   {path: 'recipes', component: RecipesComponent, children: [
//       {path: '', component:RecipeStartComponent},
//       {path: 'new', component: RecipeEditComponent},
//       {path: ':id', component:RecipeDetailComponent , resolve: { data: ()=> inject(DataStorageService).fetchRecipes()}}, 
//       {path: ':id/edit', component: RecipeEditComponent, resolve: { data: ()=> inject(DataStorageService).fetchRecipes()}},
   
//   ]},
//   {path: 'shopping-list', component: ShoppingListComponent}
// ]


    
const appRoutes: Routes = [
    {path: '', redirectTo: '/recipes', pathMatch : 'full'},
    {path: 'recipes', component: RecipesComponent, children: [
        {path: '', component:RecipeStartComponent},
        {path: 'new', component: RecipeEditComponent},
        {path: ':id', component:RecipeDetailComponent , resolve: {data: RecipesResolver}}, 
        {path: ':id/edit', component: RecipeEditComponent, resolve: {data : RecipesResolver}},
    ]},
    {path: 'shopping-list', component: ShoppingListComponent},
    {path:'auth', component:AuthComponent}
  ]

        
      

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {






}