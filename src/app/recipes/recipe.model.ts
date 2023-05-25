import { Ingredient } from "../shared/ingredient.model";

export class Recipe {
    public name: string;
    public description: string;
    public imagePath: string;
    public ingredients: Ingredient[]; //more than one ingredient object

    // Here we have object ingredient inside object recipe?
    // Yes, you are correct. In the code snippet you provided, the Recipe class contains an array of Ingredient objects. This means that each Recipe object can have multiple Ingredient objects associated with it.
    // By including the ingredients property within the Recipe class, you can define the ingredients required for a particular recipe. Each Ingredient object within the array represents a specific ingredient with its own properties, such as name and amount.
    // Having this structure allows you to define and manage the ingredients for each recipe in a structured way. It provides a convenient way to associate ingredients with a recipe and access them when needed.
    
    constructor(na: string, desc: string, impath: string, ingre: Ingredient[]) {

        this.name = na
        this.description = desc;
        this.imagePath = impath;
        this.ingredients=ingre;

    }

}

// This way to create an instance of class Recipe we have to use : new Recipe(), new Ingredient()
// new Recipe() and new Ingredient() are constructor invocations.
// When you define a class, such as Recipe or Ingredient, you can create instances of that class using the new keyword followed by the class name and any required arguments in parentheses. This process is called instantiation, and it creates a new object based on the class definition.
// For example, new Recipe('Tomato Soup', 'A super tasty Tomato Soup - just awesome', 'https://cdn.loveandlemons.com/wp-content/uploads/2020/03/pantry-recipes-2-580x697.jpg', [new Ingredient('Tomato', 10), new Ingredient('Onion', 3)]) creates a new instance of the Recipe class with the provided arguments for the constructor. Similarly, new Ingredient('Tomato', 10) creates a new instance of the Ingredient class with the specified arguments.
// The constructor of a class is a special method that is called when an object is created from that class. It is used to initialize the object's properties and perform any necessary setup.


// so new Recipe() is creating an instance of class Recipe using the constuctor?
// Yes, exactly. new Recipe() is creating a new instance of the Recipe class by invoking its constructor. The constructor is a special method in a class that is called when a new instance of the class is created using the new keyword.
// In the provided code, the Recipe class has a constructor that takes several parameters: name, description, imagePath, and ingredients. When new Recipe() is called, it creates a new Recipe object with the specified values for those parameters.
// By using the new keyword and the class constructor, you can create multiple instances of the Recipe class, each representing a different recipe with its own unique properties and ingredients.