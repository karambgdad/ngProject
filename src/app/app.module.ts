import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import{ HttpClientModule} from '@angular/common/http'

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { AppRoutingModule } from './app-routing.module';
//import { RecipesModule } from './recipes/recipes.module'; of course also we should remove this import statement, otherwise you won't save anything in code size
//import { ShoppingModule } from './shopping-list/shopping.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
//import { AuthModule } from './auth/auth.module';





@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    
   
    
    
  ],
  imports: [
    BrowserModule,
 

    HttpClientModule,
   // ShoppingModule,

   // RecipesModule,//if we run the app, we will get an error, because we are both normally loading the RecipesModule and we are lazy loading the RecipesModule

    AppRoutingModule,

    CoreModule,
    SharedModule,
    //AuthModule
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
