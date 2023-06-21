import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import{ HttpClientModule} from '@angular/common/http'

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AuthComponent } from './auth/auth.component';
import { RecipesModule } from './recipes/recipes.module';
import { ShoppingModule } from './shopping-list/shopping.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import { AuthModule } from './auth/auth.module';





@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    
   
    
    
  ],
  imports: [
    BrowserModule,
  //FormsModule,//this is still required because the AuthComponent needs it, but we can drop the FormsModule, and the AuthComponent from   declarations array after creating a new feature module for Auth Feature.
   
    //ReactiveFormsModule,

    HttpClientModule,//We need the HTTP client module because turns out that this is a module that only sets up some global services, the injectable HTTP service, and we need that, so we will keep that.

    ShoppingModule,
    RecipesModule,
    AppRoutingModule,

    CoreModule,//we have to import our CoreModule, even though it's not exporting anything, but to still include it here into our build process.

    SharedModule,// we also import it here, because we need access to the drop down directive we are using in the header component
    AuthModule
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
