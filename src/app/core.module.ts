import { NgModule } from "@angular/core";
import { ShoppingListService } from "./shopping-list/shopping-list.service";
import { RecipeService } from "./recipes/recipe.service";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthIntceptorService } from "./auth/auth-interceptor.service";

// Now that we had a look at feature modules and shared modules, let's have a look at the third important module type you can work with, and that would be the CoreModule. And of course, let me highlight that all these modules are created in the same way with NgModule, just the things we put in there and how we use them differs.

//The CoreModule is basically there to make the AppModule a bit leaner. Let's say in the AppModule we have the AppComponent, and here we are providing two services. Well then we can use a CoreModule to move these services out of the AppModule into the CoreModule, which then in turn, is added back to the AppModule. The alternative to that would of course be to use providedIn in @Injectable on the services, which means we don't have to add them to providers at all.

//CoreModule is a pattern that you don't need to use or can't use if you are using providedIn in @Injectable.

//In our AppModule, if we have a look at the providers, I have the ShoppingListService and the RecipeService there, and my interceptor. Now, the idea behind the CoreModule is that we simply provide all these application-wide services that are important right from the start of the application, that we provide them in a separate module, which we then simply import into the AppModule.


@NgModule({
    providers:[

        ShoppingListService,
        RecipeService,
        {provide: HTTP_INTERCEPTORS, useClass: AuthIntceptorService, multi: true }

    ]
})
export class CoreModule {

}

//you don't need to export your services because services work differently than declarations. Only declarations and other modules need to be exported. Services are automatically injected on a root level, you don't need to export them to make this happen.