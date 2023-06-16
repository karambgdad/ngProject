import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import {  catchError } from "rxjs/operators";

export interface AuthResponseData{
    kind: string,
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered?:boolean
}

@Injectable({providedIn: 'root'})
export class AuthService {
    constructor(private http: HttpClient){}

   signUp(iemail: string , ipassword: string){
    //let us return this prepared observable, so that we can subscribe in the auth component, which is where we are intereted in the response, because in case we got an error from signing up we wanna display something to the user, and whilst we are waiting for the response we might wanna show loading indicator.
    

   return  this.http.post <AuthResponseData>(' https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCiQfpoAKxE2Pap5s9btVlWLgdPLqJE1io',

     {
        email:   iemail, //email: has to be this exact name because it is a property required by firebase, you can see details about this in this link "https://firebase.google.com/docs/reference/rest/auth#section-create-email-password", under "Request Body Payload"
        password: ipassword,//password: has to be this exact name because it is a property required by firebase
        returnSecureToken: true
    })
    //errorMessage conversion logic should happen in the service, it is a better place for that

    //throwError function will create a new observable that will wrap an error, because RxJS always need to return an observable with the http request "because http requests always returns Observable"
    //so catchError function will catch the possible error, and throwError will return a new observable wrapping that error, so it still ends up in the error handling section of our subscribe function in the component file.
    
    .pipe(
        catchError((errorRes)=>{
        let errorMessage = 'An unknown error occured!';
        if(!errorRes.error || !errorRes.error.error){
            return throwError(()=>errorMessage);
        }
        switch(errorRes.error.error.message){
            case 'EMAIL_EXISTS':
                errorMessage = 'The email already exists!';
                break;
        }
        return throwError(()=>errorMessage);
    }))
   } 

    /*
    .pipe(
        catchError((errorRes)=>{
        let errorMessage = 'An unknown error occured!';
        if(!errorRes.error || !errorRes.error.error){
            throw new Error(errorMessage)
        }
        switch(errorRes.error.error.message){
            case 'EMAIL_EXISTS':
                errorMessage = 'the email already exists';
                break;
        }
           throw new Error(errorMessage)
    }))
    */

   //We also can define the format of the data we'll get back because we will get back these six fields here "see the link" , and therefore I will create a new interface actually here in the auth service because I only need it in here and we don't even need to export it. Therefore it'll just be an interface which I'll name AuthResponseData.

login(inemail:string , inpassword:string){
   
   return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCiQfpoAKxE2Pap5s9btVlWLgdPLqJE1io',{
        email: inemail,
        password: inpassword,
        returnSecureToken: true
    }).pipe(catchError(this.handleError))//look at the original definition of catchError()and how it takes a callback function
}



private handleError (errorRes: HttpErrorResponse){

    let errorMessage = 'An unknown error occured!';
        if(!errorRes.error || !errorRes.error.error){
            return throwError(()=>errorMessage);
        }
        switch(errorRes.error.error.message){
            case 'EMAIL_EXISTS':
                errorMessage = 'The email already exists!';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'The email does not exists!';
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'The password is not correct!';
                break;
        }
        return throwError(()=>errorMessage);
}
}




/*
so we can say that catchError  catches the error and store it in a variable of type HttpErrorResponse, let us call  it :err, now when catchError invoke this.handleError, it will behind the scene invoke (this.handleError(err))

That's correct! When an error occurs in the observable stream, the catchError operator catches the error and passes it as an argument to the error handling function, in this case, this.handleError.

So, if we consider the following line of code: .pipe(catchError(this.handleError))

The catchError operator catches the error emitted by the observable.
It then invokes the this.handleError function, passing the error object (err) as an argument.
The this.handleError function receives the error object (err) as its parameter and executes its logic.
Therefore, when the this.handleError function is invoked by the catchError operator, it receives the error object (err) as an argument and can perform error handling operations based on the provided error information.

This mechanism allows you to centralize error handling logic in the this.handleError method, making it reusable across different parts of your codebase.

////////////////////////////////////////////////

and in typeScript we can write catchError(this.handleError) without directly invoking handleError() like this


Yes, that's correct. In TypeScript, you can pass a function reference to another function without explicitly invoking it by omitting the parentheses ().

When you write catchError(this.handleError), you are passing the reference to the handleError method as the error handling function to the catchError operator. The catchError operator will internally invoke the provided function and pass the error object as an argument when an error occurs in the observable stream.

By omitting the parentheses (), you are not directly invoking the handleError method at the point of passing it to catchError. Instead, you are providing a reference to the method, allowing catchError to invoke it as needed.

This behavior is a language feature of TypeScript and allows you to pass function references around, making your code more modular and reusable.

/////////////////////////////////////////////

When you write catchError(this.handleError) without the parentheses (), you are not directly invoking the handleError method at that specific line of code. Instead, you are passing a reference to the handleError method as the error handling function to the catchError operator.

By omitting the parentheses (), you are treating handleError as a value (function reference) rather than executing it immediately. This allows the catchError operator to internally invoke the handleError function when an error occurs in the observable stream.

In other words, you are providing a callback function (handleError) to the catchError operator, which will be invoked later when an error is caught. The operator is responsible for executing the function at the appropriate time and passing the necessary arguments (such as the error object).

So, in summary, omitting the parentheses () when passing this.handleError to catchError ensures that the method is not executed immediately but is used as a reference for error handling within the catchError operator.

///////////////////////////////////////////////////

so it is just like we are passing a call back function
ChatGPT
Yes, exactly! When you pass this.handleError to catchError, you are essentially providing a callback function that will be invoked by the catchError operator when an error occurs.

The catchError operator expects a function that takes the error object as an argument and returns an observable or throws an error. By passing this.handleError as the error handling function, you are specifying the logic to be executed when an error is caught.

This pattern of passing a callback function to handle specific events or actions is commonly used in programming. In this case, it allows you to define your error handling logic separately in the handleError method and reuse it across multiple error scenarios.

So, you can think of this.handleError as a callback function that is called back by the catchError operator to handle errors in the observable stream.

I hope this clarifies the concept. Let me know if you have any more questions!
//////////////////////////////////////////////////////

what is call back functions?
ChatGPT
A callback function is a function that is passed as an argument to another function and is intended to be called or executed at a certain point within that function. The primary purpose of a callback function is to provide a way to handle or respond to an event or asynchronous operation.

In JavaScript, callback functions are commonly used in scenarios where we want to perform some action after a certain event or operation has occurred. For example, when making an asynchronous API call, we often provide a callback function that will be executed when the response is received.

Here's a simple example of a callback function:
function fetchData(callback) {
  // Simulating an asynchronous operation
  setTimeout(function() {
    const data = 'Some data';
    // Invoke the callback function and pass the data
    callback(data);
  }, 2000);
}

function processData(data) {
  console.log('Processing data:', data);
}

// Pass the processData function as a callback to fetchData
fetchData(processData);
In the example above, the fetchData function simulates an asynchronous operation by using setTimeout. It takes a callback function as an argument and invokes it after a delay. The processData function is passed as the callback to fetchData and is executed when the delay is complete.

Callback functions allow us to define custom behavior or logic that will be executed at the appropriate time within the calling function. They enable us to handle events, respond to asynchronous operations, and provide a mechanism for passing data or results between functions.

It's important to note that callback functions are just one approach to handling asynchronous operations and events in JavaScript. Other patterns like Promises, async/await, and observables are also commonly used for managing asynchronous code.
/////////////////////////////////////////////////////////////////
Here's more simple example of a callback function in JavaScript:

function greet(name, callback) {
  console.log("Hello, " + name + "!");
  callback();
}

function sayGoodbye() {
  console.log("Goodbye!");
}

// Passing sayGoodbye function as a callback to greet
greet("Alice", sayGoodbye);
In this example, we have a greet function that takes a name parameter and a callback parameter. It logs a greeting message with the provided name and then invokes the callback function.

We also have a sayGoodbye function defined separately, which logs a farewell message.

When we call greet("Alice", sayGoodbye), we pass the sayGoodbye function as a callback to greet. As a result, the greet function will log the greeting message and then invoke the sayGoodbye function, which logs the farewell message.

The output will be:

Hello, Alice!
Goodbye!

In this example, the sayGoodbye function acts as a callback that is executed at a specific point within the greet function. It allows us to define custom behavior (in this case, logging a farewell message) and pass it to another function to be executed when needed.

I hope this example helps illustrate the concept of callback functions. Let me know if you have any further questions!






so sayGoodbye got executed after the greeting message, even that we have: greet(name, callback)

Yes, that's correct. In the greet function, the callback parameter represents a function that can be passed as an argument and invoked at a specific point within greet. The order of execution is determined by when and where the callback function is invoked within greet.

In the example, the callback function is invoked immediately after the greeting message is logged, as specified by the code callback();. This ensures that the callback function is executed after the greeting.

By passing the sayGoodbye function as the callback argument when calling greet("Alice", sayGoodbye), we are instructing greet to invoke sayGoodbye at the designated point in the function's execution.

So, the sequence of execution is as follows:

The greet function is called with the argument "Alice" and the sayGoodbye function as the callback.
The greeting message "Hello, Alice!" is logged.
The callback() statement in greet invokes the sayGoodbye function, which logs the farewell message "Goodbye!".
This demonstrates how the callback function is executed after the greeting message due to the way it is invoked within the greet function.

I hope this clarifies the execution order of the callback function in relation to the main function. Let me know if you have any more questions!






so we trigger the sayGoodbye  function by ()

Yes, that's correct. In JavaScript, functions are invoked by using parentheses () after the function name. When we write callback(), it triggers the execution of the function referenced by the callback variable.

In the example, callback() is the statement that invokes the callback function passed as an argument. This is how we trigger the execution of the sayGoodbye function in the given scenario.

The parentheses () are used to call (or invoke) a function and pass any required arguments. If the function doesn't require any arguments, the parentheses can be left empty, as in callback().

So, in the context of the example, the line callback() is responsible for triggering the execution of the sayGoodbye function.

I hope this clarifies the usage of parentheses in invoking functions. Let me know if you have further questions!






how this applies on this example:
catchError(this.handleError)

In the example catchError(this.handleError), the this.handleError is a reference to the handleError function. It is not directly invoking the function, but rather passing it as a callback function to the catchError operator.

The catchError operator in RxJS expects a callback function that handles the error. It will invoke this callback function whenever an error occurs in the observable stream. By passing this.handleError as the callback to catchError, you are telling RxJS to use that function to handle any errors that occur.

The catchError operator will internally invoke the handleError function and pass the error as an argument. It is responsible for triggering the execution of the handleError function when an error occurs in the observable stream.

So, in this context, catchError(this.handleError) is effectively using this.handleError as a callback function to handle errors within the observable stream.

I hope this clarifies how the concept of callback functions applies in the context of the catchError operator. Let me know if you have any more questions!






internally , means behind the scenes?

Yes, by saying "internally," I mean that the catchError operator, implemented in the RxJS library, is responsible for invoking the handleError function when an error occurs in the observable stream. It's part of the internal mechanism of the catchError operator.

From your code snippet catchError(this.handleError), Angular's HTTP client library will internally handle the error cases and trigger the execution of the handleError function that you passed as the callback to catchError. The error object will be passed as an argument to the handleError function, allowing you to handle the error appropriately.

So, when I mentioned "internally," I was referring to the inner workings of the catchError operator and how it handles the invocation of the callback function you provide.

I hope this clarifies the meaning of "internally" in this context. If you have any further questions, feel free to ask!
*/