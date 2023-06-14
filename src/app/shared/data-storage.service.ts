import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import { map, tap } from "rxjs/operators";

//important notes you find on the recipes resolver service


@Injectable({'providedIn': 'root'})// since we would inject the angular HTTP service
export class DataStorageService  {
 
    constructor(private http: HttpClient,
                private recipeService: RecipeService){}// this is this typeScript shortcut where by adding an accessor like private in front of the argument, TypeScript automatically creates a property of the same name  and stores whatever we accept as an argument here in that property. And for Angular's dependency injection to work, we now have to set the type here off that injected argument to HTTP client.

  

    storeRecipes(){
        const recipes = this.recipeService.getRecipes();

       // this.http.post, we use this approach in case we want to store just on recipe in the database, but i want here to store all recipes, overwritting all of the previously existing recipes, for that we use put method

       this.http.put<Recipe[]>('https://recipe-book-d60a6-default-rtdb.firebaseio.com/recipes.json',recipes)
       .subscribe((response)=>{
            console.log(response)
       })
       //if we wanna subscribe in the component we should "return" the above line, where we are calling the function storeRecipes

       //because the component in this scenario will not be interested in whether that request is done or not. If that's different in your application obviously you can use the "return" pattern,

    }


    /////very important logic//////
    //when saving a recipe, we can do it without adding any ingredient, and that is okay, but now we have in the database a recipe without any ingredient in it, and that maybe generate a bug, because we should have always a place "even an empty array" for the ingredients in our recipe, otherwise we have undefined variable "ingredient" which means errors
    
    //therefore to fix any poosible errors that can occur when interacting with ingredients inside a recipe, we can add a pipe method inside the fetchRecipe function, and add the map operator, which allows us to transform data, map is an observable operator which allow us to transform the data in an observable chain, so right before subscribe().

    //
    fetchRecipes(){
        //in our app we can delete the recipe, we have this option if we click on each recipe, therefore we need a way so we can reload our recipes from the server, that means when we delete a recipe it is only deleted from our webpage but not from the server.

     //the return has been inserted here for the sake of the resolver
       return this.http.get<Recipe[]>('https://recipe-book-d60a6-default-rtdb.firebaseio.com/recipes.json')
        .pipe(map((recipes)=>{//here we get recipes, but recipes might not have an ingredient property, so we return recipes but call map on these recipes, here map is a completely different method, it is a normal javascript array method that is called on an array to transform the element in the array, map here will iterate for each element, and apply a logic we write inside of it.
            return recipes.map(recipe =>{//this map takes a call back function which is executed for each element of the array, therefore for every recipe. and we return the transformed recipe
                return {...recipe, ingredients: recipe.ingredients? recipe.ingredients : []}
            //and here the idea is to return the original recipe, but if the recipe doesnt have an ingredient array, we set ingredients to an empty array, and for this i will return a new object, where i use the spread operator to copy all the properties of recipe "to copy all the existing data" And then ingredients will be set equal to. And now I'll add a (ternary) expression, where I simply check whether recipe ingredients is true ish, which it is if it is an array with zero or more elements. And if that is the case, then I will set ingredients equal to recipe ingredients, which means I will not change it. But otherwise I'll set it to an empty array. So if this here is kind of false, which is the case if ingredients is undefined, if it's not set, then I will set it to an empty array instead.
            })

        }),
        //we set the tap inside the pipe function "it is an RxJs operator like map, not like observable and subscribe", because:The tap operator is typically used for debugging, logging, or performing auxiliary operations during the Observable pipeline.

        tap((recipes)=>{
            this.recipeService.setRecipes(recipes)
        })//we can execute some code here, without altering the data that is funneled through that observable, so with tapping, we are getting an array of recipes, and i will simply, set the recipes to the recipeService, instead of doing so in the subscribe function???why? because we don't want to subscribe to the get observable here, but we still want to set the recipes that we get from the the http get method to the recipeService.setRecipes()
        
        )
        
       
    // .subscribe((recipes)=>{
            //here we need a methode in the RecipeService, allowing us to overwrite our stored recipes in that service, this newly created methode will be called here, as we will pass to it the result of the get methode so the newly created methode will overwrite the recipes in the RecipeService, therefore we can newly reload the recipes in the webpage
    //       this.recipeService.setRecipes(recipes)
    //   })

    }


}






// return {...recipe, ingredients: recipe.ingredients? recipe.ingredients : []}

// The code snippet you provided appears to be a JavaScript object manipulation using the spread operator. It creates a new object by spreading the properties of the recipe object and overrides the ingredients property with a new value.

// Here's a breakdown of the code:

// return {
//   ...recipe,                        // Spread the properties of the `recipe` object
//   ingredients: recipe.ingredients ? recipe.ingredients : [] // Override `ingredients` property
// };
// The spread operator (...recipe) copies all properties from the recipe object into the new object being returned. This ensures that any existing properties in the recipe object are preserved in the new object.

// The ingredients property is then overridden with a new value using a conditional (ternary) operator. It checks if recipe.ingredients exists (is truthy) and, if so, assigns its value to the ingredients property. If recipe.ingredients is falsy (such as undefined or null), it assigns an empty array ([]) to the ingredients property.

// In summary, the code is creating a new object based on the recipe object but with a guarantee that the ingredients property will always exist and be an array, even if it was not defined in the original recipe object or was falsy.



//////dependency injection///////

// constructor(private http: HttpClient) when writing this, do we initialize the value of http variable?

// In the statement constructor(private http: HttpClient), the http parameter is not directly initialized with a value. Instead, it is a shorthand notation in TypeScript for automatically creating and initializing a class property with the same name and type.
// Here's what happens when you use this shorthand notation:
// The http parameter is declared in the constructor of a class, specifying the type HttpClient.
// When an instance of the class is created, Angular's dependency injection system provides an instance of HttpClient and automatically assigns it to the http parameter.
// TypeScript generates code behind the scenes that creates a private property named http of type HttpClient within the class and assigns the injected value to it.
// So, you don't need to explicitly initialize the http variable or create a separate class property for it. Angular takes care of injecting the HttpClient instance and assigning it to the http property for you.

// Here's an example to demonstrate this:

// import { HttpClient } from '@angular/common/http';
// class DataService {
//   constructor(private http: HttpClient) {
//     // The `http` parameter is automatically assigned to the private property `http` of type `HttpClient`.
//     // You can now use `this.http` to access the properties and functions of the `HttpClient` class.
//   }
//   fetchData() {
//     // Example usage of the `http` property to make an HTTP request
//     this.http.get('https://api.example.com/data').subscribe(response => {
//       console.log(response);
//       // Process the received data
//     });
//   }
// }
// In the above example, the DataService class has a constructor with a parameter http of type HttpClient. When an instance of DataService is created, Angular's dependency injection system automatically injects an instance of HttpClient and assigns it to the http property. This allows you to use this.http to access the properties and functions of the HttpClient class within the DataService.
// By using this shorthand notation in the constructor, you eliminate the need to manually create a separate class property and assign the injected value to it. The initialization is handled by Angular's dependency injection mechanism.
// I hope this clarifies how the private http: HttpClient notation works in terms of initializing the http variable. If you have any further questions, please let me know!






// what do you mean by : create a separate class property and assign the injected value to it

// When I mention "create a separate class property and assign the injected value to it," I'm referring to an alternative approach where you would manually define a class property and initialize it with the injected value. Let me illustrate the difference using an example:

// Without shorthand notation:

// import { HttpClient } from '@angular/common/http';
// class DataService {
//   private http: HttpClient;

//   constructor(http: HttpClient) {
//     this.http = http;
//   }

//   fetchData() {
//     this.http.get('https://api.example.com/data').subscribe(response => {
//       console.log(response);
//     });
//   }
// }
// In this example, we explicitly declare a private property http of type HttpClient within the DataService class. In the constructor, the http parameter is passed, and we manually assign its value to the http property using this.http = http.
// This approach creates an extra step of explicitly defining a class property and assigning the injected value to it.

// On the other hand, when using the shorthand notation:

// import { HttpClient } from '@angular/common/http';
// class DataService {
//   constructor(private http: HttpClient) {}

//   fetchData() {
//     this.http.get('https://api.example.com/data').subscribe(response => {
//       console.log(response);
//     });
//   }
// }
// In this example, we directly declare the http parameter as a private property within the constructor parameter list. This shorthand notation automatically creates a private property http of type HttpClient within the DataService class and assigns the injected value to it, eliminating the need for the additional step of manual assignment.
// Both approaches achieve the same result: accessing the injected HttpClient instance within the DataService class. However, the shorthand notation provides a more concise and convenient way of declaring and initializing the property directly within the constructor parameter list.
// I hope this clarifies the distinction between using shorthand notation and manually creating a separate class property. Let me know if you have any further questions!