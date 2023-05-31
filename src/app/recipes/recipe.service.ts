import { EventEmitter } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";

export class RecipeService{
  
  //another way of initialize the ingredients array for a recipe
  // const tomatoSoupIngredients: Ingredient[] = [
  //   new Ingredient('Tomato', 10),
  //   new Ingredient('Onion', 3)
  // ];
  //const tomatoSoupRecipe = new Recipe('Tomato Soup',
  //                                    'A super tasty Tomato Soup - just awesome',
  //                                    'https://cdn.loveandlemons.com/wp-content/uploads/2020/03/pantry-recipes-2-580x697.jpg',
  //                                     tomatoSoupIngredients);
  

  private  recipes: Recipe [] =[

        new Recipe ('Tomato Soup' ,
                    'A super tasty Tomato Soup - just awesome' ,
                    'https://cdn.loveandlemons.com/wp-content/uploads/2020/03/pantry-recipes-2-580x697.jpg',
                    [
                      new Ingredient ('Tomato',10),
                      new Ingredient('Onion', 3)
                    ]
                    ),
    
        new Recipe ('Falafel' ,
                    'A delicious Vegan Food' ,
                    'https://picturetherecipe.com/wp-content/uploads/2018/06/Chicken-Cutlets-by-PictureTheRecipe-Featured-395x500.jpg',
                    [
                      new Ingredient ('Chickpea',300),
                      new Ingredient('Garlic', 2)
                    ]),
                     
      ];
    
   private sselectedRecipe : Recipe;

   selectedRecipe = new EventEmitter <Recipe>();

      getRecipes(){
        return this.recipes.slice();
      }

      // getRecipe(r:Recipe): Recipe{
      //   return this.recipes.find((recipe:Recipe)=>{recipe===r})
      // (let recipe:Recipe) { if recipe ===r
      //   return recipe} is this equal to the callback function
      //this is a callback function in JavaScript/TypeScript. It's an arrow function that takes a recipe parameter and compares it to the provided r parameter using the strict equality operator (===).
      //In the context of the find() method, this callback function is executed for each element in the array. It checks if the recipe is equal to r, and if a match is found, the callback function returns true, which causes the find() method to return that matching 
      // }
      // The find() method expects a callback function as its argument. This callback function is executed for each element in the array until a matching element is found or until all elements have been iterated.
      // The arrow function (recipe: Recipe) => recipe === r takes a single parameter recipe and compares it to the provided r using the strict equality operator (===). If the comparison returns true, it means we have found a matching element, and the callback function returns true, which stops the iteration and returns that matching element.

      setSelectedRecipe(recipe:Recipe){
         this.sselectedRecipe= recipe
      }

      getSelectedRecipe():Recipe{
        return this.sselectedRecipe
      }

      getRecipeById (id:number){
        return this.recipes[id];
      }
     
}





// A callback function is a function that is passed as an argument to another function and is invoked (called) within that function. The function receiving the callback can then execute or "call back" the provided function at a specific time or in response to a certain event.meaning they can be
// In JavaScript, functions are treated as first-class citizens,  assigned to variables, passed as arguments to other functions, and returned as values from functions. This allows for the use of callback functions as a way to customize or extend the behavior of a higher-order function.
// The higher-order function, which receives the callback function as an argument, can then decide when and how to invoke the callback based on certain conditions or events. This allows for dynamic and flexible programming patterns.
// Callback functions are commonly used in asynchronous operations, event handling, and functional programming paradigms. They provide a way to execute code asynchronously or handle the result of an asynchronous operation once it completes.
// Here's a simple example to illustrate the concept of a callback function:

// function processData(data, callback) {
//   // Perform some data processing
//   const processedData = data.toUpperCase();
//   // Invoke the callback function with the processed data
//   callback(processedData);
// }
// function displayData(data) {
//   console.log(data);
// }
// const input = 'Hello, World!';
// processData(input, displayData);
// In this example, the processData function accepts an input data and a callback function. It performs some data processing (in this case, converting the data to uppercase) and then invokes the callback function, passing the processed data as an argument.
// The displayData function is defined separately and passed as the callback to processData. When processData completes its processing, it calls the displayData function with the processed data, which then logs it to the console.
// This demonstrates how a callback function can be used to customize the behavior or handle the result of a higher-order function.