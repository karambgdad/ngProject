import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [RecipeService]
})
export class RecipesComponent implements OnInit {

  selectedRecipe:Recipe;

  constructor(private recipeService: RecipeService){}

ngOnInit() {

  //this.recipeService.selectedRecipe.subscribe((newRecipe:Recipe)=> (this.selectedRecipe=newRecipe))
  //we dont need this subscribe because we are slecting a recipe depending on RouterLink directive, therefore we remove the eventemiiter or the subject from the service file
  
  
  //console.log('from recipe component: ' + this.sRecipe.getSelectedRecipe())
  
  }

}
