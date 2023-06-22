import { NgModule } from "@angular/core";
import { AuthComponent } from "./auth.component";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";



@NgModule({
    declarations:[
        AuthComponent
    ],

    imports:[
        SharedModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            {path:'', component: AuthComponent}
        ])
    ]
})
export class AuthModule {

}