import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
 id: number;
 link:string;
 editMode = false;

  constructor(private route: ActivatedRoute){}

  ngOnInit() {
   
    this.link = this.route.snapshot.url.toString()
    console.log('the url link keyword: '+this.link)

    if (this.link == 'new'){
      console.log ( 'you are creating a new recipe')
    }else {
      console.log('you are editing the recipe')
    }

   this.route.params.subscribe((params:Params)=>{
      this.id = +params['id']
      this.editMode = params['id'] != null;
      //when there is an id in the url then we are in the edit mode,so the recipe already exists ergo has an id therefore it is not null therefore it is in the editmode so editmode=true

      console.log('id exist or undefined : '+ this.id)  
      console.log(this.editMode)
   })

  
  }

  

}
