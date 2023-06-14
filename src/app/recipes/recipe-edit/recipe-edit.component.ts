import { Component, OnInit } from "@angular/core";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { RecipeService } from "../recipe.service";
import { Ingredient } from "src/app/shared/ingredient.model";

@Component({
  selector: "app-recipe-edit",
  templateUrl: "./recipe-edit.component.html",
  styleUrls: ["./recipe-edit.component.css"],
})
export class RecipeEditComponent implements OnInit {
  id: number;
  link: string;
  editMode = false;

  recipeForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService
  ) {}

  ngOnInit() {
    this.link = this.route.snapshot.url.toString();
    console.log("the url link keyword: " + this.link);

    if (this.link == "new") {
      console.log("you are creating a new recipe");
    } else {
      console.log("you are editing the recipe");
    }

    this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
      this.editMode = params["id"] != null;
      //when there is an id in the url then we are in the edit mode,so the recipe already exists ergo has an id therefore it is not null therefore it is in the editmode so editmode=true
      this.initForm();
      console.log("id exist or undefined : " + this.id);
      console.log("Edited Mode is: ", this.editMode);
    });

    //notice that here it is printing an object, wich is the FormGroup itself
    //each object has two values
    const controls = this.getControls();
    for (let i = 0; i < controls.length; i++) {
      console.log(controls[i].value);
    }
  }
  //a methode to initialize the form
  private initForm() {
    // when should we call this method here? we should call it whenever our route params changes, that's indicates that we reloaded the paghe

    let recipeName = "";
    let recipeImgPath = "";
    let recipeDescription = "";

    // to understand the idea behind this, if you have an array of ingredients you can push in it an ingredient, but if you have an FormArray of ingredients you can push in it a formControl of an ingredient
    let recipeIngredients = new FormArray([]);
    //the recipe ingredients is initialzed with empty array because we dont have any ingredients by default
    //no if that is our default what do we overwrite it below in the edit mode? first we need to check if the recipe has ingredients, because we can create a recipe without any ingredient

    if (this.editMode) {
      const recipe = this.recipeService.getRecipeById(this.id);
      recipeName = recipe.name;
      recipeImgPath = recipe.imagePath;
      recipeDescription = recipe.description;

      if (recipe.ingredients) {
        //if we have ingredient, each one should be the initialize value here
        for (let i of recipe.ingredients) {
          //recipeIngredients.push(i) i dont push the full ingredient, rather i push two controls, because each ingredient has two controls, the name and the amount, and i use formGroup to group both controls.
          recipeIngredients.push(
            new FormGroup({
              name: new FormControl(i.name, Validators.required),
              amount: new FormControl(i.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/),
              ]),
              //And we do execute this method because this acts like a factory. It gives us back the configured validator then, which will be used by Angler. But to configure it, we need to pass an argument
            })
          );
        }
      }
    }


   //By declaring recipeForm: FormGroup;, you inform TypeScript that the recipeForm variable is of type FormGroup, which allows you to access the properties and methods of the FormGroup class and perform operations related to form handling.
   //Without the declaration, TypeScript would not recognize recipeForm as a valid variable and may throw a compilation error if you try to use it in your component.
   // In the code snippet new FormGroup({...}), the form controls are added to the FormGroup using the constructor of the FormControl class.
   //in case we write this: this.recipeForm = new FormGroup({}) this is an empty Form, with no form controls initially.
    this.recipeForm = new FormGroup({
      //if we are not in edit mode "not editing an existing recipe, therfore the condition will be false, therefore the variables,recipeName,recipeImgPath,recipeDescription will ner empty, therefore we have an empty form, ready for a new recipe to be added "
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeImgPath, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      ingredients: recipeIngredients, //this is the name of the FormArray control
      //to see if this works, we need to synchronize our FormArray with our HTML code
    });
  }

  getControls() {
    return (<FormArray>this.recipeForm.get("ingredients")).controls;
  }

  onSubmit() {
    console.log(this.recipeForm.value);
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeService.addNewRecipe(this.recipeForm.value);
    }

    //this.router.navigate(["/recipes"]); or we write :
    this.onCancelRecipe();
  }

  onAddIngredient() {
    //here we push a FormGroup which has two empty FormConrols into the FormArray "ingredients", after pushing this the getControls() function will automatically get one more FromGroups"this one", and in the html for loop this newly created one will automaticaly get newly generated <div>,
    (<FormArray>this.recipeForm.get("ingredients")).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
      })
    );
  }

  onDeleteingredient(i: number) {
    (<FormArray>this.recipeForm.get("ingredients")).removeAt(i);
  }

  onCancelRecipe() {
    this.router.navigate(["../"],{relativeTo: this.route});
  }
}
