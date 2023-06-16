//And the idea here is that this model stores all the core data that makes up a user and even helps us with validating whether that token is still valid

export class User{

    constructor(
        public email:string, 
        public id:string, 
        private _token:string,
        private _tokenExpDate : Date
        ){ }
      //we can use a constructor so that we can create a user with the "new" keyword. And there again, I'll use the TypeScript shortcut of automatically storing arguments of the constructor in properties of the class by adding an accessor in front of the argument name "like private or public", which will then also be used as the property name.


      //Now why underscore and why private? Private because the token should not be retrievable like this. Instead, when the user, or you as a developer, want to get access to the token, you should actually be required to do that in a way that will automatically check the validity. And this can be achieved by adding a getter here

      

      //Now what is a getter? A gather here looks like a function. We add parentheses and then a function body, but you actually access it like a property. So you will be able to do something like 
      //user.token
      //This is how you will be able to access this because it's a getter, it's a special type of property, you could say. It's a property where you can write code that runs when you try to access this property.So it's a property plus, plus, you could say.
      //A getter also means that the user can't override this. So setting user token to something new,this will throw an error because it's only a getter, not a setter.
      //You set a _token when you create a new user object and we will always create a new user object when a user logs in.
      //So, therefore, we have that getter named token, and the idea here is that we, of course, return this._token here.
      
   


    
    get token() {
        
        //But before we do that " return this._token", we can add certain checks, or to be precise, I want to add one check. I wanna check if this._tokenExpDate does not exist. So if "!" this does not exist or if the current date which we get with new Date(), that's a JavaScript feature, that's the current timestamp, not just the date but also the current time, if the current is greater than this._tokenExpDate, so if it does exist but it is smaller than the current timestamp, then we know that the token expired, Because if the token expiration date is smaller than the current date, then it's in the past, and that means even if we have a token, it's not valid anymore. And therefore, in that case, I will return null even though we might have a token.

        if( !this._tokenExpDate || new Date() > this._tokenExpDate){
            return null;
        }
        return this._token
      }

      //With that created in the auth service, I wanna store the authenticated user and I will actually store it as a subject.

}








/*

why we define this object like this:
export class User{

    constructor(
        public email:string, 
        public id:string, 
        private _token:string,
        private _tokenExpDate : Date
        ){ }
ChatGPT
The code you provided is an example of a TypeScript class definition for a User object. Let's break it down:

The export keyword indicates that this class can be imported and used in other modules or files.
class User { ... } defines the User class.
Within the constructor:

public email: string declares a public property email of type string, which can be accessed outside the class.
public id: string declares a public property id of type string.
private _token: string declares a private property _token of type string, which can only be accessed within the class.
private _tokenExpDate: Date declares a private property _tokenExpDate of type Date.
The constructor itself is responsible for initializing the object when it is created. It takes in the required parameters (email, id, _token, and _tokenExpDate) and assigns them to the corresponding properties of the class.

Using the public and private keywords in the constructor parameters is a shorthand notation in TypeScript. It automatically creates and assigns the values to the properties based on the parameters. So, instead of manually defining the properties and assigning values inside the constructor body, you can use this shorthand notation to achieve the same result.

By convention, prefixing private properties with an underscore (_) is a common practice to indicate that they are intended for internal use within the class and should not be accessed directly from outside the class.

This class definition allows you to create instances of the User class with an email, ID, token, and token expiration date. The properties can be accessed or modified using dot notation, such as user.email or user._token.





User
you mean instead of typing this in the body of the constructor:
this.email = email
and therefore we need to define an email property of the class as well
ChatGPT
Yes, exactly. By using the shorthand notation in the constructor parameter, TypeScript automatically generates and assigns the values to the corresponding properties of the class.

In this case, the constructor parameter public email: string not only declares the email parameter but also automatically creates and assigns the value to the email property of the class. This eliminates the need to manually define the property and assign the value within the constructor body.

So, with the constructor parameter public email: string, you don't need to explicitly write this.email = email inside the constructor. TypeScript handles this assignment for you behind the scenes.





User
so this way of defining object, when we creat a new instant of User, it requies us to assign values in the constructor, when assigned these values become properties of the object
ChatGPT
Yes, that's correct. When you create a new instance of the User class using the new keyword, you need to provide values for the constructor parameters.

For example:

typescript
Copy code
const user = new User('example@example.com', '12345', 'token123', new Date());
In the above code, we create a new instance of the User class by calling the User constructor. We pass in the values for the email, id, _token, and _tokenExpDate parameters. These values are then assigned to the corresponding properties of the user object.

Once the object is created, you can access and use its properties like user.email, user.id, user._token, and user._tokenExpDate throughout your code.

By defining the constructor with parameters and using the shorthand notation, you ensure that the necessary values are provided when creating a new instance of the User class, making it easier to work with the object.


*/