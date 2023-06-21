import { NgModule } from "@angular/core";
import { AlertComponent } from "./alert/alert.component";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { PlaceHolderDirective } from "./placeholder/placeholder.directive";
import { DropdownDirective } from "./dropdown.directive";
import { CommonModule } from "@angular/common";
import { DropdownEasierDirective } from "./dropdown-easier.directive";

@NgModule({//Now, the idea here is that you still now declare and import anything into this module that might be used by other modules, but since every module works standalone, to then also make these things available in other modules, you will also export all these things which you're importing.

    declarations:[
        AlertComponent,
        LoadingSpinnerComponent,
        PlaceHolderDirective,
        DropdownDirective,
        DropdownEasierDirective,
    ],
    imports: [
        CommonModule,

    ],


    //since we don't wanna use these features in the shared module, but import the shared module into other modules, we can and we should export this here. And we export the alert component, the loading spinner component, the placeholder directive, the dropdown directive, and also the common module. And now, the idea is that wherever we import the shared module, we have access to all these features which we initialize here.
    exports:[
        AlertComponent,
        LoadingSpinnerComponent,
        PlaceHolderDirective,
        DropdownDirective,
        DropdownEasierDirective,
        CommonModule
    ]
    //So, in other modules, where we want to use one or all of these features, we don't have to add them to their modules, we just import the shared module and we got access because we're exporting all these stuff. If we wouldn't export it, we would not have access.

})
export class SharedModule {

}


//and that is now another super important concept you gotta understand about modules. You can only define, or declare, components, directives and pipes once. You can't do that multiple times. You can import a module into multiple imports. So, it is fine if we import the RouterModule in RecipesModule and AppRoutingModule and many places, Imports are okay, but declarations are not.

//If you declare the shopping list component here, in the ShoppingModule, you must not declare it anywhere else. Even if you need it in another module, you must not declare it there. The solution then, instead, is to export it in the ShoppingModule and import that module into another module where you need the "shopping list component"  and that's exactly what we're doing with the SharedModule.

//Here, we are declaring and exporting stuff. So, anywhere where we wanna use one of these features we now have to bring in the shared module because double declarations, as we currently have them also in the app module, where I again declare the dropdown directive and so on, are not allowed.

//So instead here, we now have to remove the dropdown directive, the loading spinner component and the placeholder directive and the alert component. We have to remove all of that from app.module, but we just have to make sure that we import the shared module in the app.module because we still need access to certain features. We need access to the dropdown directive because we are using it in the header component, which is part of the app module. So now, we need to import the shared module here into the app module.


//only declair things once, and use imports and exports to dahe them.