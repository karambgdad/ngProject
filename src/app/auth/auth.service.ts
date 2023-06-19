import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { User } from "./user.model";
import { Router } from "@angular/router";

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: "root" })
export class AuthService {

   private tokenExpirationTimer : any;
    
  user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient,
              private router: Router) {}

  signUp(iemail: string, ipassword: string) {
    return this.http
      .post<AuthResponseData>(
        " https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCiQfpoAKxE2Pap5s9btVlWLgdPLqJE1io",

        {
          email: iemail,
          password: ipassword,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  login(inemail: string, inpassword: string) {
    return this.http
      .post<AuthResponseData>(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCiQfpoAKxE2Pap5s9btVlWLgdPLqJE1io",
        {
          email: inemail,
          password: inpassword,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  logout(){
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');


    if(this.tokenExpirationTimer){

        clearTimeout(this.tokenExpirationTimer)
    }
    this.tokenExpirationTimer = null;

  }
  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
   
    const createdUser = new User(email, userId, token, expirationDate);
    this.user.next(createdUser);
    localStorage.setItem('userData', JSON.stringify(createdUser) )
    this.autoLogout(expiresIn*1000)
  }

    autoLogin(){

       
       const userData:{
            email:string,
            id:string,
            _token: string,
            _tokenExpirationDate: string 
       } = JSON.parse(localStorage.getItem('userData'));
       
       if(!userData){
        return
       }
       console.log("userData")
       console.log(userData)
 
      const loadedUser = new User (userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate))

      

      if (loadedUser.token){
        this.user.next(loadedUser)

        const expirationDuration = new Date (userData._tokenExpirationDate).getTime()- new Date().getTime()
        this.autoLogout(expirationDuration);
        console.log('expdauration')
        console.log(expirationDuration)
      }
      
    }

/*

In the User model, the property private _tokenExpDate: Date is declared as a private property of type Date. This means that the _tokenExpDate property can only be accessed within the User class itself and not from outside the class.
In the autoLogin() function, when creating an instance of the User class, the correct property name to use is _tokenExpDate because that is the actual private property declared in the class. The value from userData._tokenExpDate should be assigned to _tokenExpDate in the User instance.
By using the correct property name, the User instance is properly initialized with the provided _tokenExpDate, ensuring that the private _tokenExpDate property of the User class holds the correct value.

I apologize for the confusion caused by the incorrect information initially provided. The corrected code accurately utilizes the private property _tokenExpDate within the User class, resulting in the expected behavior.

-------------------------------------------------------------------

so because it is private property i should use a matched name?

Apologies for any confusion caused. No, the reason for using the correct property name (_tokenExpDate) in the autoLogin() function is not directly related to the private access modifier. It is actually about using the correct name that matches the property declared in the User class.
In the User class, you have a private property declared as private _tokenExpDate: Date. This private property is not directly accessible from outside the class. However, within the User class, you can access and use it.
When you create an instance of the User class, you need to provide values for its properties, including the private _tokenExpDate property. Therefore, you should use the correct property name (_tokenExpDate) when passing the value in the constructor, irrespective of whether it is private or not.
To summarize, using the correct property name (_tokenExpDate) in the autoLogin() function is important because it matches the property declared in the User class and ensures that the value is correctly assigned to the private _tokenExpDate property of the User instance. 
//it is always key:value, the key should match so the value get assigned correctly
The private access modifier itself does not mandate using a matched name; it simply restricts direct access to the property from outside the class.


*/



    autoLogout(expirationDuration: number){

        this.tokenExpirationTimer = setTimeout (()=>{
            this.logout()
        } , expirationDuration)

    }


  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = "An unknown error occured!";
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(() => errorMessage);
    }
    switch (errorRes.error.error.message) {
      case "EMAIL_EXISTS":
        errorMessage = "The email already exists!";
        break;
      case "EMAIL_NOT_FOUND":
        errorMessage = "The email does not exists!";
        break;
      case "INVALID_PASSWORD":
        errorMessage = "The password is not correct!";
        break;
    }
    return throwError(() => errorMessage);
  }
}
