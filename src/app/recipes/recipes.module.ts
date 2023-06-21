//We now have the recipes module that should be responsible for defining the building blocks of the recipe feature area.

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
    //and here you now can add basically whatever you also added to the AppModule.
    //we will add declarations and add all recipes related components to this RecipesModule

    declarations:[
        RecipesComponent,//so it's really important to understand that you don't just add to declarations what you plan on using in a template, but you also have to add any routes here that you load via routing.
        RecipeListComponent,
        RecipeDetailComponent,
        RecipeItemComponent,
        RecipeStartComponent,
        RecipeEditComponent
    ],
    //How can we now use our RecipesModule in the AppModule? Now, as a first step, since I declare all the recipe components here, we could simply add the exports array to the recipes module and export all components which we declared here so that we can not just use them in the recipes module but in any module that imports the recipe module.
     
    //we now have to import the recipes module there "in app.module". So simply add recipes module to the imports of the AppModule.

    imports: [
        RouterModule,
       // CommonModule,
        ReactiveFormsModule,
        RecipesRoutingModule,
        SharedModule
    ],

    exports:[
        //The other important thing I wanted to highlight is that now that we manage the loading of our components there with recipes routing "RecipesRoutingModule", we do define which component should be loaded for which route. There is no reason to still export all these recipe components because we're now only using them internally in the recipes module.

        //We're using them either embedded into other components here in RecipesModule, or by loading them through the recipes routing module. Both is part of this file. So there is no reason to export the recipe components anymore because we're not using these recipe components in the app component or any child component of the app component.

        //RecipesComponent,
        //RecipeListComponent,
        //RecipeDetailComponent,
        //RecipeItemComponent,
        //RecipeStartComponent,
        //RecipeEditComponent
    ]

    //after importing recipes.module in the app.module, I actually get an error, router outlet is not a known elementand this error is comming from the RecipesModule, RecipesComponent. And the problem we have here is that in the RecipesComponent, I am indeed using router outlet. The problem is router outlet is a directive provided by angular, and it's not magically available in the entire application. It is made available by the router module, which I import in app-routing-module. This is not just there to configure our routes, it also adds routing features like the router link directive which we use to add a link or the router outlet directive. Now I export it here in the app-routing-module "exports: [RouterModule]", and since I import that in the AppModule, in the AppModule this router module and its features are available and only there, the RouterModule isn't available in recipe.module, because Everything in a module works standalone. You can export something to then be able to import it into another module. as I'm doing it here with all these components. But that alone does not mean that in this module, in the RecipesModule here, you can use features that are made available in the AppModule.

    //So the recipe module and the components in there got absolutely no access to all the things we import into our AppModule.

    //you absolutely have to understand is whatever you declare here, whatever you use in the template of these components has to be imported in that module. It's not enough if you import it in the app module. The only exception to the rule are services. These only need to be set up once in the app module and you can access them in your whole application even in components which you added to feature modules. Anything that's used in a template, components, directives, pipes, these things need to be declared or imported into the module where you plan on using them. It's not enough to use them in another module even if you export your things to that other module. Even then, it's not enough. Angular, treats and parts of every ng module stand alone.

})
export class RecipesModule {

}