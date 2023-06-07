import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy{

  recipes: Recipe [] ;
  subscription: Subscription;

  constructor(private sRecipe: RecipeService,
              private router: Router,
              private route: ActivatedRoute){}
 
  ngOnInit() {
    //here i subscibe to any changes happening in the recipes array, and it changed i will 
    this.subscription = this.sRecipe.subjectRecipe.subscribe((recipes:Recipe[])=>{
      this.recipes=recipes
      //when hit addNewRecipe function in the service the first line will get triggered, so it will puch the new recipe to the recipes array, then the second line will get triggered, so it will emit the new recipes array, here on ngOnInit when loading the recipes, we call the subjectRecipe, which is of type Subject, which get triggered now, because we have changes, so it will recive the new recipes array, "(without return in the add function )"
      //this means when we click addNewRecipe, we dont just show the newly added recipe, rather we show all the recipes, including the newly added one
    })

  
  this.recipes = this.sRecipe.getRecipes()//if we commented this, we wont be able to see the recipe at reloading, we can't rely only on the Subject, because it only get triggered whenever changes happenes, which means it will only set this: "this.recipes=recipes" if changes happens
  

  
  }

  onNewRecipe(){
      this.router.navigate(['new'], {relativeTo: this.route})
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
 

}
