
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecipesComponent } from "./recipes.component";
import { authGuardFn } from "../auth/auth2.guard";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipesResolver } from "./recipes-resolver2.service";

const routes: Routes = [

//{path: 'recipes', component: RecipesComponent, canActivate:[authGuardFn] , children: [
//that path recipes here, I will change it to an empty path because now we need to add something to our app routing module for lazy loading to work.
//in AppRoutingModule, I'll again add another route and that will be the route for recipes. So the path I just removed from the recipes module. GO TO ApppRoutingModule

    {path: '', component: RecipesComponent, canActivate:[authGuardFn] , children: [
        {path: '', component:RecipeStartComponent},
        {path: 'new', component: RecipeEditComponent},
        {path: ':id', component:RecipeDetailComponent , resolve: {data: RecipesResolver}}, 
        {path: ':id/edit', component: RecipeEditComponent, resolve: {data : RecipesResolver}},
    ]},
]


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
   
})
export class RecipesRoutingModule {

}