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
    

// here we just chage Subject to be BehaviorSubject, and we initialize it with null
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
    //This will make sure that our entire application treats the user as unauthenticated because that's the logic we used everywhere. And therefore, now we should update our UI and all our inter setters will not work correctly anymore for requests that require authentication. Which is exactly the behavior we want because we can't authenticate ourselves anymore.
    this.router.navigate(['/auth']);

    //but what about a autoLogout? Because our token will expire, it has an expiry time of one hour, once we get it. And therefore, right now, we have a bug in the app, because this token will never expire, or the token will expire, but our application won't reflect that. We'll automatically log the user in forever, because we now have that snapshot here, and we never clear that snapshot.And, sure, we could clear it when we log out, and we should do that, and we will do that, but it will never clear automatically. If the token expired after one hour, nothing changes in our application. And that, of course, is something we have to change.
    localStorage.removeItem('userData');

    //But now, we also need to set a timer when the token is stored, or when we first get a token, so that we know when to invalidate that token at a later point of time.
    //And for this, I'll add yet another method here: autoLogout()

    if(this.tokenExpirationTimer){

       // we should check if we do have an active timer, because maybe we don't. Maybe it expired anyways, then we can't clear it. But if we do have an active one, so if this is true-ish,then we should clear our Timeout here, and pass this tokenExpirationTimer, into clearTimeout.And this will, well, clear the tokenEpirationTimer, 
        clearTimeout(this.tokenExpirationTimer)
    }
    this.tokenExpirationTimer = null;// and thereafter reset tokenExpirationTimerback to null manually.So now, we clear the timer when we log out.

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
    //we are storing the token and the user infos in a user model (new User(email, userId, token, expirationDate)), which happens in memory, so everytime we reload the app the memory gets cleared and we lose all the user infos, so if we waana store user token, we have to store it somewhere else, not in a js variable or class property, we have to store in a persistent storage, that survives page reloads and browser restarts, this storage we can write to and fetch data from.
    //but you can work with cookies or with local storage, which is an API exposed by the browser to store simple key value pairs basically on the file system but controlled by the browser. And we will use local storage here to store that token.
    //To do that, let's go to the handle authentication method in the auth service, which is where we do create our user object and emit it to our application.
    localStorage.setItem('userData', JSON.stringify(createdUser) )//JSON.stringify: It converts a JavaScript object to a string version of it, so to say, so to text.


    //Now, with all of that being stored in there, we can of course also retrieve it from there when our application restarts. For that, we can add a new method, which I will name auto login because it basically is a method that will try to automatically set the user to log in when the application starts and it will do so by looking into the storage and checking whether there is an existing user snapshot stored. So in auto login, the goal now will be to retrieve data from the local storage.

    this.autoLogout(expiresIn*1000)
  }

    autoLogin(){

       // localStorage.getItem('userData') this is a synchronous methode which gives us userData like this
       const userData:{
            email:string,
            id:string,
            _token: string,
            _tokenExpirationDate: string // this here would be of type string not of type Date, we have to covert it manally 
       } = JSON.parse(localStorage.getItem('userData'));

       if(!userData){// I will check whether that exists. If we don't have user data,  so if this is false ish, we can return. because in this case, we can't log the user in. There is no stored user data.  So the user definitely needs to sign in on his own.
        return
       }
      //Otherwise, if we make it past this check, user data is set and there is some snapshot we were able to retrieve from that local storage. Now important, the snapshot we're retrieving here is also a string because we're saving it as a string down there. 
      //And therefore, if we want to work with that as a normal JavaScript object we have to convert it back by calling JSON parse here.

      //important
      //(JSON.parse) this will simply just take the string and JSON format and convert it back into a JavaScript object. Not into our user model though, it will not have this token getter, for example,but into a simple object literal, which has all the keys that we stored in that storage. therefore here we should create a new user we call it : loadedUser and we redefine it to fit our User model.
      //so here we pass data from our user snapshot we are loading ('userData'), for this to work in creatinga new User model , we have to add a type annotation to userData to be more specific about which type of data we will have in that snapshot.
 
      const loadedUser = new User (userData.email, userData.id, userData._token, new Date (userData._tokenExpirationDate))
      //new Date (userData._tokenExpirationDate) because basicall "_tokenExpirationDate" is of date shape , but it is string but JS ic clever enough to convert it to a Date simply

      //now we have if this user have a valid token:
      //we can now use this condition : if (loadedUser.token){} because now after what we wrote above, now loadedUser of of type User, so it has a getter inside of it, the getter is checking whether the token is valid ot not
      //in that token getter, we are compairing the _tokenExpDate that was stored with the current date, so : get token ()  wll return null which is false ish here " if (loadedUser.token){} " if the token is invalid, and true ish if the getter return a value.

      if (loadedUser.token){// only if we make it into this check, we wanna emit this loadedUser, as the currently active user
        this.user.next(loadedUser)

        const expirationDuration = new Date (userData._tokenExpirationDate).getTime()- new Date().getTime()
        this.autoLogout(expirationDuration);
      }
      //what remains here is when to call this methode , we should call this methode each time the app reset, so when the first thing get loaded in the angular app, and that would be the app.component
    }


    autoLogout(expirationDuration: number){
        console.log(expirationDuration)

        //We have autoLogin for automatically retrieving user data and logging the user in. Now we need a method that sets a timer and manages a timer for automatically logging the user out.
        //AutoLogout should get the expirationDuration here ()
        //and then we can use setTimeout in here to set that to that duration. And after that duration here, I want to call this logout.
        this.tokenExpirationTimer = setTimeout (()=>{
            this.logout()
        } , expirationDuration)//So the logout function we have here should be called automatically after our expirationDuration.



        //Now, the important thing is that when we do log out, we clear that timer, because if we log out automatically, then it's no problem. Then the timer expired. But if we log out manually, because this button is pressed, we auto-call logout, and then we still have the timer in the background, which calls logout again at a later point of time. Now, we don't want to do that. If a user logs out on his own, then the current session, so to say, the current lifetime of the token we have ends anyways, and therefore we should alsoclear that token expiration timer when we log out.
        
        //all of this will depend on where we call this automatic logout methode



        //Now, clearing that timer is not too hard. We simply store it in our property, which we can name tokenExpirationTimer, and that this will actually be, I'll type any. And now let's store our timer down there. SetTimeout returns a reference to that timer, so we can simply store that in tokenExpirationTimer. And in the logout function, we now just have to clear that timer.

        //see logout() methode

        // now we just have to make sure we do call autoLogout, because currently we are doing that, and we need to call autoLogout to make sure that this timer actually starts. Now, where do we need to call that? Basically, whenever we admit a new user to our application. So whenever we use our user subject. And that would be the case here, in handleAuthentication, and also in autoLogin.

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
