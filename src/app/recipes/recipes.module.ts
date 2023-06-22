
//LAZY LOADING: For EXAMPLE:  when we're not authenticated we certainly don't need to load the recipes module code because we can't even access anything from the recipes module here. It might also not make sense to load the shopping list module even though we can access it because unless we do, there is no need to download that code, but let us start with RecipesModule.


//Now, having the routes registered here "seperate file : RecipesRoutingModule " is an important starting point. For a lazy loading to work, your feature module needs to bring its own routes. As we're doing it here, it needs to bring its own route config. We're doing that here and it needs to bring that with forChild, which is also what we're doing here.

//Now one thing we'll need to change though, GO TO : RecipesRoutingModule

import { NgModule } from "@angular/core";
import { RecipesComponent } from "./recipes.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { RecipesRoutingModule } from "./recipes-routing.module";
import { SharedModule } from "../shared/shared.module";

@NgModule({
    

    declarations:[
        RecipesComponent,
        RecipeListComponent,
        RecipeDetailComponent,
        RecipeItemComponent,
        RecipeStartComponent,
        RecipeEditComponent
    ],
    

    imports: [
        RouterModule,
        ReactiveFormsModule,
        RecipesRoutingModule,
        SharedModule
    ],

    exports:[
       
    ]

  
})
export class RecipesModule {

}