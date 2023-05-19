import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent {

  @ViewChild('nameInput') nameIn: ElementRef;
  @ViewChild('amountInput') amountIn: ElementRef; 

  @Output() ingAdded = new EventEmitter<Ingredient>();
  



  onAddItem() {
    const newIngredient = new Ingredient (this.nameIn.nativeElement.value ,this.amountIn.nativeElement.value )
    //since our eventemitter is of Ingredient type we must emit an ingredient type, therefore we should define as above a new variable of a type Ingredient and then give it the values of the imported two variable from elementRef: see above
    this.ingAdded.emit(newIngredient)
  }
}
