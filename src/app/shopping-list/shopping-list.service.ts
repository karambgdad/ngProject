
import { Ingredient } from "../shared/ingredient.model"
import { Subject } from "rxjs";

export class ShoppingListService{
    
    private ingredients: Ingredient[] = [
        new Ingredient('Apple', 5),
        new Ingredient('Banana', 6)
      ]

    singleIngredient = new Subject<number>;

   

      //addedIngredient = new EventEmitter <Ingredient>()// this is used for the other way of pushing data into services

      ingredientChanged = new Subject<Ingredient[]>;
       




            //this function should be added in the shopping-edit component
      addIngredient(e: Ingredient) {
        this.ingredients.push(e)
            //the reason why this does not work because we are pushing to the original arrary while in getIngredient() we are getting a copy of the original array, either we change the function getIngredient() to return the exact same array: return this.ingredients; or we create an event that will emit data whenever changes happens to the original array so: And now here, whenever we change this array"Ingredient[]", we simply call this ingredientsChanged and emit a new event. And we of course, pass a value here, our original ingredients array,though to be precise, again, only a copy of it.
        this.ingredientChanged.next (this.ingredients.slice())  

            // So now we always have the right ingredients array in the service and we inform our interested components about that change in the event we're emitting here. So now in the shopping list component, besides getting the ingredients at that point of time we load the app, I also want to reach out to my shopping list service and simply subscribe to that ingredientsChanged event. So now whenever ingredients change, I know that I will get them.
      
    }

      getIngredients(){
        return this.ingredients.slice();
      }

      getIngredientById(i : number){
        return this,this.ingredients[i]
      }


      updateIngredient(i:number, newValue: Ingredient){
          this.ingredients[i] = newValue;
          this.ingredientChanged.next (this.ingredients.slice()) 
      }

      deleteIngredient(i : number){
          this.ingredients.splice(i, 1)
          this.ingredientChanged.next (this.ingredients.slice()) 
      }
    }
