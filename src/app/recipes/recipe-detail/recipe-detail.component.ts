import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  
constructor(private sRecipe: RecipeService, private shoppinList : ShoppingListService){}

@Input() recipe : Recipe;

  ngOnInit() {
   
    // this.recipe = this.sRecipe.getSelectedRecipe()
    //console.log('from details: '+ this.sRecipe.getSelectedRecipe())
    
  
  }
  onAddToShoppingList(){

    for (let ingredient of this.recipe.ingredients) {

      this.shoppinList.addIngredient(ingredient)
      
    }
  

    //this.shoppinList.addIngredient(this.recipe.ingredients)
   // console.log(this.shoppinList.getIngredients())
  }



}
