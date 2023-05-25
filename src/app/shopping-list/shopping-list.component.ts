import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],

})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[];
  constructor(private shoppingListService: ShoppingListService){}

  ngOnInit() {
      // * this should be written first, because we are pushing the ingredient we got from shopping-edit into the ingredient array in the service, then we are getting that array from the service.
    
    this.ingredients=this.shoppingListService.getIngredients();
    this.shoppingListService.ingredientChanged
      .subscribe(
        ( ingredients:Ingredient[])=>{this.ingredients=ingredients}
      )
    console.log( this.ingredients)




        //this is another way to show newly added ingredients using event emmiter in the shoppin list service, then emitting the value from shopping edit component and subscribing to it here then pushing it to the ingredient array in the shopping list service.
    // * this.shoppingListService.addedIngredient.subscribe((ingredient:Ingredient) =>(this.ingredients.push(ingredient)) )


         //this way i am trying to emit the arrray of ingredients from the recipe-detail component to the EventEmitter in the shopping list service which is pf type Ingredient[], and then listen to it here, i mean subscribe to it and then push it as a spread operator to the original array in the shoppin list service, it is not working 
    //this.shoppingListService.ingredientChanged.subscribe((ingredients: Ingredient[])=>(this.ingredients.push(...ingredients)))

    // his.shoppingListService.ingredientChanged.subscribe((ingredients: Ingredient[])=>(this.ingredients.push(ingredients[])))
    // The error in your code is caused by incorrect syntax when pushing elements to the ingredients array. The correct syntax should be this.ingredients.push(...ingredients) instead of this.ingredients.push(ingredients[]).
    // Here's the corrected code:
    // this.shoppingListService.ingredientChanged.subscribe((ingredients: Ingredient[]) => {
    //   this.ingredients.push(...ingredients); });
    // The spread operator (...) is used to spread the elements of the ingredients array into individual elements when pushing them to the this.ingredients array. This ensures that each ingredient is added separately to the array.
   
    
  }

  
}
