import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  constructor(private sRecipe: RecipeService,
    private shoppinList: ShoppingListService,
    private route: ActivatedRoute,
    private router: Router) { }

  //@Input() recipe : Recipe;

  id: number;
  recipe: Recipe;
  
  ngOnInit() {


    this.route.params.subscribe((params: Params) => {
      this.id = +params['id']
      this.recipe = this.sRecipe.getRecipeById(this.id)
    })


  }
  onAddToShoppingList() {

    for (let ingredient of this.recipe.ingredients) {

      this.shoppinList.addIngredient(ingredient)

    }



  }


  onDeleteRecipe(){
    this.sRecipe.deleteRecipe(this.id);
    this.router.navigate(['/recipes'])
  }


}
