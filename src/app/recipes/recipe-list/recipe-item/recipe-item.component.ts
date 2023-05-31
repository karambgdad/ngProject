import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit{
 
@Input() index: number
recipe: Recipe;
constructor(private recipeService: RecipeService,
            private route: ActivatedRoute,
            ){}

ngOnInit() {
    this.recipe=this.recipeService.getRecipeById(this.index)
  }

 


}
