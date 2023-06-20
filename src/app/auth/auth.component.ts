import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthResponseData, AuthService } from "./auth.service";
import { Observable } from "rxjs";
import { Router } from "@angular/router";


@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  authForm: FormGroup;

  constructor(private authService: AuthService,
              private router: Router) {}

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
    if (this.isLoginMode) {
         
       authObs=  this.authService.login(email,password)
    } else {

       authObs= this.authService.signUp(email, password)
    }

    authObs.subscribe({
        next : (data) => {
            console.log(data);
            this.isLoading = false;
            this.router.navigate(['/recipes']);
            

        },
        error: (errMsg) => {
            console.log(errMsg);
            this.error= errMsg
            this.isLoading=false
           
          }
    })


    this.authForm.reset();
    
  }

  onHandleError(){
    this.error = null;

   // And by doing that, the condition for displaying the error will be removed because we're using error here in *ngIf in the alert component
   // <app-alert [message]="error" *ngIf="error" (close)="onHandleError()"></app-alert>
   //And if that is nullthen this whole alert will not be shown anymore (ngIf will not render the alert component in the DOM) and therefore this will then close the alert.
  }
}
