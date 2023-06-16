import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject, throwError } from "rxjs";
import {  catchError, tap } from "rxjs/operators";
import { User } from "./user.model";

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

user = new Subject<User>();// we creat a user property of type subject and since the subject is a generic type, we can define the type of the subject which is here of type "User", and idea is that we emit a new user, whenever we have one "we log in" or also when we log out " when we clear the user" : when the user become invalid or the token expired, so below with the sign up methode, we know that when we succeed, if we dont have an error, we get <AuthResponseData> which contains that token we need for the user, which contains the email and the expiry date, and therefore below in the signup methode i wanna add a new RxJS operator, after the pipe, tap is an operator that allow us to perform some action without changing the response, so it steps into the observable chain but it doesn't stop it, block it, or change it, it just run some code with the data you get back from the observable, so the response in this case. so the idea is when we get the response, means we successfully signed up,===> i want to creat a new user, and assign all the data that i got from the response, which is of type <AuthResponseData>, assign it to the user we created after the response, then we can next that user: emit it through the subject we defined above, outside the signup function. so we emit the user as our currently logged in user.

//the user subject will inform all places in our application that my user changes, And right now, even though we haven't implemented all the logic for that yet let's assume that it always changes when the authentication status changes. So even if the token expires the user subject will emit a new value which is then null because then the user is invalid. We haven't added that logic yet, but we will add it, so if there is no resData, ==> this function wont have these values:  this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)


//So let's assume that the subject here is our source of truth and therefore the header component, since it's always there in our application, can subscribe to that subject to update correctly based on the user's status.


    constructor(private http: HttpClient){}

   signUp(iemail: string , ipassword: string){

   return  this.http.post <AuthResponseData>(' https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCiQfpoAKxE2Pap5s9btVlWLgdPLqJE1io',

     {
        email:   iemail, 
        password: ipassword,
        returnSecureToken: true
    })
    .pipe(catchError(this.handleError), tap(resData =>{
          // here we are forced to add the 4 arguments that we added in the constructor of the User model
          //last argument is the date object, that is not a part of our response, that is something we have to generate, based on the expiresIn time we get from Firebase, expiresIn is a string but it holds numbers, it is 3600 seconds, in within the token expires, therefore we add + to convert it to number.
    //const  expirationDate = new Date(new Date().getTime() + +resData.expiresIn*1000)
    //const createdUser = new User(resData.email, resData.localId, resData.idToken, expirationDate);
    //this.user.next(createdUser)// we emit the user as our currently logged in user
          //we need the exact logic for logging user in, the method below
          //therefore we can use the same way we structered the handleError method

          this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
    }))
   } 


login(inemail:string , inpassword:string){
   
   return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCiQfpoAKxE2Pap5s9btVlWLgdPLqJE1io',{
        email: inemail,
        password: inpassword,
        returnSecureToken: true
    }).pipe(catchError(this.handleError), tap((resData)=>{

         this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)

    }))
}

private handleAuthentication(email:string, userId:string, token: string, expiresIn:number){
    const  expirationDate = new Date(new Date().getTime() + expiresIn*1000)
    const createdUser = new User(email, userId, token, expirationDate);
    this.user.next(createdUser)
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