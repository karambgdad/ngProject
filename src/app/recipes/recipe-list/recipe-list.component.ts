import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit{

  @Output() recipeWasSelected = new EventEmitter<Recipe>()

  recipes: Recipe [] =[

    new Recipe ('A test Recipe' , 'this is simply a test' , 'https://cdn.loveandlemons.com/wp-content/uploads/2020/03/pantry-recipes-2-580x697.jpg'),

    new Recipe ('Another test Recipe' , 'this is simply another test' , 'https://picturetherecipe.com/wp-content/uploads/2018/06/Chicken-Cutlets-by-PictureTheRecipe-Featured-395x500.jpg')
  ];

  constructor(){}
 
  ngOnInit() {
  
  }
  onRecipeSelected(recipe:Recipe){
      this.recipeWasSelected.emit(recipe)
      console.log(recipe)
  }

}
