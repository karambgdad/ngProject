import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipeListComponent } from "./recipes/recipe-list/recipe-list.component";
import { RecipeStartComponent } from "./recipes/recipe-start/recipe-start.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";


const appRoutes: Routes = [
    {path: '', redirectTo: '/recipes', pathMatch : 'full'},
    {path: 'recipes', component: RecipesComponent, children: [
        {path: '', component:RecipeStartComponent},
        {path: 'new', component: RecipeEditComponent},//when this line is after the "path: ':id'," line due to the way how we ordered our route it will try to parse "new" as an id, therefore we will get an error
        {path: ':id', component:RecipeDetailComponent}, 
        {path: ':id/edit', component: RecipeEditComponent}
    ]},
    {path: 'shopping-list', component: ShoppingListComponent}
  ]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {






}