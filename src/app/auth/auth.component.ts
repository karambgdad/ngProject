import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthResponseData, AuthService } from "./auth.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  authForm: FormGroup;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit() {
    if (!this.authForm.valid) {
      return;
    }
    const email = this.authForm.get("email").value;
    const password = this.authForm.get("password").value;

    let authObs : Observable<AuthResponseData>

    this.isLoading = true;
    //right before the request get sent, we change isLoading to true, because now we are sending a request so we are currenly loading, and i set this back to false as soon as i am done.
    if (this.isLoginMode) {
         
       authObs=  this.authService.login(email,password)
    } else {

       authObs= this.authService.signUp(email, password)

      //////////////very IMPORTANT///////////////////////////////////////////
      //this.authService.signUp(email, password).subscribe({// we subscribe to the success result of the http post observalbe with next: , and we subscribe to the error result of the http post observable with error:
      //  next : (data) => {
      //   console.log(data);
      //    this.isLoading = false// we are not loading any more, we got a response, even with errors
      //  }, 
      //   error: (errMsg) => {//errMsg represents the error datd that we get from the http post observable
      //    console.log(errMsg);
      //    this.error= errMsg
      //    this.isLoading=false
      //   }
      // });
      ///////////////////////////////////////////////////////////////////////
    }



    // this is a trick to just reduce code, since we have the same logic for subscribing in both functions of the service (signUp(), login()) we can define an observable which is a generic type so we can define which data it will yield eventually, then after both IFs we subscribe to this observable, knowing that on of the IFs will be true therefore get executed , therefore one of these expression will get assigned
        //this.authService.login(email,password)
        //this.authService.signUp(email, password)
    //so one will replace the variable/Observable : authObs, then after the IFs, it is the turn for: 
    //authObs.subscribe({ }) to get executed replacing authObs with one of the two expression, so we get the same old logic that we know of Observable and subscribe(), that is why we put authObs.subscribe({ }) after the IFs
    authObs.subscribe({
        next : (data) => {
            console.log(data);
            this.isLoading = false
        },
        error: (errMsg) => {
            console.log(errMsg);
            this.error= errMsg
            this.isLoading=false
           
          }
    })


    this.authForm.reset();
    
  }
}

//The if condition checks if the authForm is not valid using the valid property of the form. If the form is not valid, it means that one or more form controls have failed their validation rules. In this case, the return statement is encountered, and the method execution is immediately stopped, preventing the code below from executing.
//By returning early in this case, you can avoid executing any further logic or making any unnecessary API calls if the form data is invalid. It helps to ensure that the subsequent code is only executed when the form is in a valid state.
