import { NgModule } from "@angular/core";
import { ShoppingListComponent } from "./shopping-list.component";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";

import { FormsModule} from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";


@NgModule({
    declarations:[
        ShoppingListComponent,
        ShoppingEditComponent
    ],

    imports:[
        //CommonModule, //we have it in the SharedModule
        FormsModule,
        RouterModule.forChild([// We don't need to export router module here because we only did this when we had a separate routing module, since it's now all included in the feature module we already got that in the place where it should be.
        //we did exported RouterModule in recipes-routing.module, so we can import it in the recipes.module, but here we alreafy have RouterModule in the ShoppingModule.

            {path: '', component: ShoppingListComponent},
        ]),
        SharedModule
    ],

    exports:[
       // ShoppingListComponent,
       // ShoppingEditComponent
    ]
})
export class ShoppingModule {

}