import {
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";

import { Ingredient } from "src/app/shared/ingredient.model";
import { ShoppingListService } from "../shopping-list.service";

@Component({
  selector: "app-shopping-edit",
  templateUrl: "./shopping-edit.component.html",
  styleUrls: ["./shopping-edit.component.css"],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild("f") shoppingListForm: NgForm;

  singleIngredient: Ingredient;

  sub: Subscription;

  editMode = false; //an important information when it comes to what we should do once the form is submitted. Should we create a new item or edit an existing one? So I want to store the mode we're in here in a property.

  editedItemIndex: number;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit() {
    this.sub = this.shoppingListService.singleIngredient.subscribe(
      (i: number) => {
        this.editMode = true;
        this.editedItemIndex = i;
        this.singleIngredient = this.shoppingListService.getIngredientById(i);
        this.shoppingListForm.setValue({
          name: this.singleIngredient.name,
          amount: this.singleIngredient.amount,
        });
        console.log(this.singleIngredient);
      }
    );
  }


  
  onAddItem() {

    const newIngredient = new Ingredient(
      this.shoppingListForm.value.name,
      this.shoppingListForm.value.amount
    );
    
    if (this.editMode == true){
      this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
      this.shoppingListForm.reset();

    }else{
      this.shoppingListService.addIngredient(newIngredient);
      console.log(this.shoppingListForm);
      this.shoppingListForm.reset();
      
    }
    this.editMode = false
  }


  onClear(){
    this.shoppingListForm.reset();
    this.editMode=false
  }

  onDelete(){
    this.onClear();
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
   
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
