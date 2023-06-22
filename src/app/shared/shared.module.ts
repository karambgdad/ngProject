import { NgModule } from "@angular/core";
import { AlertComponent } from "./alert/alert.component";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { PlaceHolderDirective } from "./placeholder/placeholder.directive";
import { DropdownDirective } from "./dropdown.directive";
import { CommonModule } from "@angular/common";
import { DropdownEasierDirective } from "./dropdown-easier.directive";

@NgModule({

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


    
    exports:[
        AlertComponent,
        LoadingSpinnerComponent,
        PlaceHolderDirective,
        DropdownDirective,
        DropdownEasierDirective,
        CommonModule
    ]
    
})
export class SharedModule {

}

//the most problematic bug you often end up with when providing services in our modules. You might be providing a service in something like a shared module where you think, Yeah, I'm going to put all my shared services into this, but you might still have shared services that should use the same instance across your entire application. Well, as soon as you're importing your shared module into a lazy loaded module, the services provided in the shared module will be recreated for the lazy loaded module. And all of a sudden you might have a behavior you don't want. So whilst providing a service directly in the lazy loaded module might be something you control deliberately, providing it in a shared module is a common gotcha, where you think you use the same service instance in the entire app when you don't.

