import { NgModule, inject } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

import { AuthComponent } from "./auth/auth.component";




    
const appRoutes: Routes = [
    {path: '', redirectTo: '/recipes', pathMatch : 'full'},

    //Here, I'll again add another route and that will be the route for recipes. So the path I just removed from the recipes module. Now here I'm in the app routing module. Important.

    //I add that path again here, but now, I don't add a component which I wanna load but instead you add loadChildren. That's a special property in a route config which Angular understands as please only load the code content or the module I'm going to point you at when anyone, when the user visits this path here.

    //{path: 'recipes', loadChildren: './recipes/recipes.module.ts#RecipesModule'},

    //We can now add a string here, not a type, not a component type you pointed, but a string which is a path to the module you wanna load when this page or when this path here is visited.
    //so i add the module not the routing module : " './recipes/recipes.module.ts' "

    //And now you also need to add something here. You know it's not just a path, but you also need to add the name of that module because Angular can't know that and it needs to know the class name because technically it will go to that path and then try to dynamically import a specific object from that file and theoretically that could be named anything. We are of course following that naming convention of naming this RecipesModule{} in this casing here when the file name is named recipes.module but no one is forcing us to follow that naming pattern.

    //and therefore we explicitly have to tell Angular what the name of the exported class in that file is.



    //The effect of that will be that now the code is split at that point and everything at this path here so this entire module and everything that module uses so all the declarations of that module will be put into a separate code bundle which is then downloaded and parsed on the demand as soon as a user visits this page but not sooner. And that is simply achieved by the Angular CLI essentially analyzing this when we build our app.


    //Important for this to have a real effect and safe code is that you have these import statements only in the RecipesModule and you don't have any old import statements to let's say the RecipesComponent in let's say the app module. Because ultimately for the build process it's important what you import here at the top like:
    //import { RecipeListComponent } from "./recipe-list/recipe-list.component";
    // so what you import at the top  is all bundled together into one code bundle.

    //So in the recipes module, in the end, the build process will look at these imports "on top" which are required for this to work, but it will look at these imports and whatever is included there will be included in the same bundle. So if you have another even unused import, for ex lying around in your app module, then this part would be included into the app module code bundle even though you're not using it there. So to have the biggest effect and save the most code make sure your imports here at the top are correct. If they are, then you'll get the biggest possible effect from that code splitting.

    //Now in the recipe's routing module, it's important that you have an empty path because you have to keep in mind that we now change the route config to include the path here in the app routing module and it will load the recipes module whenever we visit /recipes. And therefore in the recipes module, we now already are at /recipes. And hence here in the recipes routing module, which is only kicking in once we do visit this module, we should start with /nothing because again, we already are at /recipes.

    {path: 'recipes', loadChildren: ()=> import('./recipes/recipes.module').then(m=>m.RecipesModule)},

    //Here is that other syntax you could use. Instead of having this string here to identify the module which should be loaded, you can add a function here, an anonymous arrow function. And in the function body you call import like a function. So you don't use import as we do it up there to import modules, but you call it dynamically as a function. To import you then pass the path to the module so /recipes/recipes.module. And now you don't add a hashtag thereafter to identify the module, but instead import resolves a promise. So now you call then there. And in this promise or in this then block you pass in a function which receives in the end the module which was loaded here. Hence I named the argument m. And on this module object, you can extract your modules the recipes module in this case.
    //////////////////////////////////////////////////////////////////////////////////////////////////////


    {path: 'recipes', loadChildren: ()=> import('./recipes/recipes.module').then(m=>m.RecipesModule)},
    
    {path: 'shopping-list', loadChildren: ()=> import('./shopping-list/shopping.module').then(m=>m.ShoppingModule)},

    {path:'auth', loadChildren: ()=> import('./auth/auth.module').then(m=>m.AuthModule)}
  ]

        
      

@NgModule({

  //Right now we load code whenever we need it. So as soon as we visit /recipes, for example after logging in, we bring in the recipes module. Now the downside of that of course, is that this is downloaded in parts just when we need it leading to a very tiny delay in our application.
  //And therefore we can actually tell angular to preload lazy loaded modules to avoid this delay.
  
  //For this we simply go to our root router module. So here where we configure our root routes and you can pass a second argument to that.This is an object where you can configure that root route

  imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
  //you're telling angler, generally we're using lazy loading so it will not put all the code into one bundle. It will split it as we saw it, but it will preload the bundles as soon as possible. So when we are on the auth page, it will already preload recipes and shopping list, so that these code bundles are already available when we need them. The advantage is that the initial download bundle still is kept small because there that code is not included and therefore the initial loading phase is fast.

  //But then when the user is browsing the page and therefore has we have some idle time anyways, then we preload these additional code bundles to make sure that subsequent navigation requests are faster.

  //So we're getting the best of both worlds a fast initial load and thereafter fast subsequent loads.


  exports: [RouterModule]
})


export class AppRoutingModule {





}


/*
see the youtube video: Whats the Difference Between Callbacks and Promises?

why loadChildren uses callback function?

The loadChildren property in Angular's routing configuration uses a callback function for lazy loading to provide flexibility and allow for asynchronous module loading.

The reason loadChildren uses a callback function instead of directly specifying a module is to support dynamic module loading, which is a key feature of lazy loading. The callback function is invoked when the specified route is accessed, and it returns a Promise that resolves to the dynamically loaded module.

Here are the reasons behind using a callback function:

Asynchronous Loading: Lazy loading involves loading modules asynchronously when they are needed. By using a callback function, Angular can defer the loading of the module until the corresponding route is accessed. This enables more efficient application loading, as only the necessary modules are fetched and instantiated when required.

Module Resolution: The callback function allows you to dynamically resolve the module to be loaded. This can be useful when you have conditional logic or dynamic routing configurations. The callback function can contain conditional statements or other dynamic mechanisms to determine the appropriate module to load based on specific conditions or routes.

Dependency Management: The callback function provides a way to handle module dependencies. If a module has dependencies on other modules or services, the callback function can ensure that those dependencies are properly resolved and loaded before returning the module.

By using a callback function with loadChildren, Angular allows you to customize the module loading process, handle dependencies, and load modules asynchronously when needed. It provides flexibility and efficient resource utilization in large-scale applications.


*/



/*
////////////////////////////////////////////////
The then() method is a standard JavaScript function that is used with Promises. In the context of lazy loading in Angular routing, the then() method is called on the promise returned by the import() function.

Here's a breakdown of how then() works:

import('./recipes/recipes.module'): This dynamically imports the specified module (RecipesModule) using the import() function. The import() function returns a Promise that resolves to the loaded module.

.then(m => m.RecipesModule): The then() method is called on the Promise object returned by import(). It takes a callback function that is executed when the Promise is fulfilled (i.e., the module is successfully loaded).

(m => m.RecipesModule): This is the callback function provided to then(). It receives the loaded module (m) as a parameter and returns the specific module that should be used.

In the example code you provided, then(m => m.RecipesModule) simply returns the RecipesModule from the loaded module. It allows Angular's lazy loading mechanism to retrieve the necessary module when needed.

The then() method is commonly used with Promises to handle the successful fulfillment of an asynchronous operation. In this case, it is used to handle the successful loading of the module and make it available for routing in Angular.

///////////////////////////////////////////////
so what is m here?

In the code snippet you provided:

.then(m => m.RecipesModule)
The m parameter represents the loaded module. It is a parameter of the callback function passed to the then() method. The naming of the parameter (m in this case) is arbitrary and can be any valid JavaScript identifier.

When the Promise returned by the import() function is resolved and the module is successfully loaded, the callback function specified in then() is invoked. The loaded module is passed as an argument to this callback function, allowing you to access and work with the module.

In the example code, m represents the loaded module. The arrow function (m => m.RecipesModule) then returns the RecipesModule from the loaded module.

The actual naming of the parameter (m in this case) is not significant and can be chosen according to your preference. It is a placeholder that allows you to refer to the loaded module within the callback function.


////////////////////////////////////////////////////

so if there is many modules in recipes, m represnets all modules, and we have to determine which module should be loaded, like this  m.RecipesModule

Yes, that's correct. In the code snippet you provided:

.then(m => m.RecipesModule)
The m parameter represents the loaded module. If the RecipesModule is just one of the modules within the ./recipes directory, then m.RecipesModule would specifically refer to that module.

If there are multiple modules within the ./recipes directory and you want to load a different module dynamically based on certain conditions or routes, you would need to modify the code accordingly.

For example, suppose you have two modules within the ./recipes directory: RecipesModule and AlternateRecipesModule. You can determine which module to load based on a condition or a specific route.

Here's an example of dynamically loading either the RecipesModule or the AlternateRecipesModule based on a condition:

.then(m => {
  if (condition) {
    return m.RecipesModule;
  } else {
    return m.AlternateRecipesModule;
  }
})
In this case, the then() callback function checks a condition (which can be any condition you define) and returns either m.RecipesModule or m.AlternateRecipesModule accordingly.

Remember that the specific module names (RecipesModule and AlternateRecipesModule) and the condition should match your actual module names and the logic you want to implement. You can adapt this example based on your requirements to dynamically load different modules within the ./recipes directory.

/////////////////////////////////////////////////////////

Inside the then() callback function, you can perform actions based on the loaded module. This can include configuring routes, accessing components, services, or other resources within the loaded module, or performing any other necessary operations related to the dynamically loaded module.

It's important to note that the then() callback function is executed only when the Promise is resolved, indicating that the module was successfully loaded. If there are issues with importing the module, such as incorrect paths or module dependencies, an error will be thrown instead of executing the then() callback.

///////////////////////////////////////////////////////

*/