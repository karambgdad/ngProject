import { NgModule, inject } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

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
    {path: '', redirectTo: '/recipes', pathMatch : 'full'},//we didnt define a path that leads to component here, we only redirect the route, therefore we can delete all of the recipes components from imports above, and therfore we can import this AppRoutingModule in the app.module, without having RecipeComponent to be inthe declaration array.
    
    {path:'auth', component: AuthComponent}
  ]

        
      

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})


export class AppRoutingModule {//here the name of the module is AppRoutingModule, but we alredy above has exported the RouterModule, which in order holds the appRoutes array/Routes






}