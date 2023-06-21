//We can also move the recipes related route configuration away from the app routing module.
//you could add forChild for RouterModule, because forRoot is only used once, an that is in the app routing module where
//here i put the recipes route, with all of its nested routes

import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecipesComponent } from "./recipes.component";
import { authGuardFn } from "../auth/auth2.guard";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipesResolver } from "./recipes-resolver2.service";

const routes: Routes = [

    {path: 'recipes', component: RecipesComponent, canActivate:[authGuardFn] , children: [
        {path: '', component:RecipeStartComponent},
        {path: 'new', component: RecipeEditComponent},
        {path: ':id', component:RecipeDetailComponent , resolve: {data: RecipesResolver}}, 
        {path: ':id/edit', component: RecipeEditComponent, resolve: {data : RecipesResolver}},
    ]},
]


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule], //now we can exports this RouterModule here, so that in the RecipesModule we can import : RecipesRoutingModule
    //we automatically import all of the exported modules in the RecipesRoutingModule
    //and this will work, and will get as child routes for or root routes in AppRoutingModule, becuse in the recipes.module we have imported this RecipesRoutingModule and in the app.module we have imported both recipes.module , which has this RecipesRoutingModule and we have imported in the app.module also the AppRoutingModule 
})
export class RecipesRoutingModule {

}