import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthResponseData, AuthService } from "./auth.service";
import { Observable, Subscription } from "rxjs";
import { Router } from "@angular/router";
import { AlertComponent } from "../shared/alert/alert.component";
import { PlaceHolderDirective } from "../shared/placeholder/placeholder.directive";


@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

//to @ViewChild you pass a selector.
//Now you could pass in the name of a local reference as a string "@ViewChild ("localRef")" , but that's not the goal here.
//Instead you can also( pass in) a type and it will look for the existence of that type in the template. So if you (pass in) the placeholder directive as a type, it will automatically find the first place where we use that directive in the template of this component. So here I'll add placeholder directive, And I'll add it as a type like this.
  @ViewChild (PlaceHolderDirective)  alertHost : PlaceHolderDirective;
   // @ViewChild ('try')  try : ElementRef;

  //And as I mentioned @ViewChild will then find the first occurrence of that directive in the dom.
  //Then we can store this in a property of that component like alert host would be a fitting name because it will be the place where we host our alert and this will be of type placeholder directive of course. So we get access to that directive we use in the template and we store that in alertHost.

  // so alertHosr is a property of type PlaceHolderDirective of AuthComponent.

  //Now that alert host can be used in show error alert. We have our factory down there.


  private closeSub : Subscription;

  authForm: FormGroup;

  constructor(private authService: AuthService,
              private router: Router,
              private componentFactoryResolver: ComponentFactoryResolver) {}

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
            this.error= errMsg// now we can get rid of this error property, we don't use it anymore, its only use was for the DOM
            this.showErrorAlert (errMsg);
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

  private showErrorAlert(msg:string){
    //now we wanna creat the component dynamically
    //this method should be called whenever we have an error =====> we call it above
    //in here the goal is to dynamically create our alert component


    //Now for this you manually need to instantiate a component. Now, a simple approach you could take, would be that you import your alert component here.
    //And now of course, you could think that you simply create alert component and save it an alertCmp constant maybe by calling new alert component. It is a class after all.

//const alertCmp = new AlertComponent();
    //Now this is valid TypeScript code but it is not valid Angular code. This will not throw an error if you compile it but it also won't work in any way. You can't work with that alert component then in the way Angular needs to work with it because Angular does a lot more than just create an object when it instantiates a component. It needs to wire it up.

    //Instead, you need to let Angular create this component. And for that, Angular gives you a tool, the component factory. To get access to that tool, you need to inject something, and you don't inject the component factory itself. Instead, you inject a component factory resolver, and then you use this resolver to get access to the component factory.
    //Now to that factory you have to pass the type of your component, which in our case here would be the alert component.

    //Now you don't instantiate this, you don't have new in front of this or anything like that. You just pass on the type. So the angler knows where to look for that component which it then should create for you.

//this.componentFactoryResolver.resolveComponentFactory(AlertComponent)

    //This method here will return a component factory. Or to be precise, and alert component factory. Not the component itself, just the factory. So this now is essentially an object that knows how to create alert components which is a great first step at least.

   const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
   
   //Now with this factory we can use that factory to create a concrete component, but for this we also need a place where we can attach it in our dom and we don't have that place yet. 

   //Angular needs a view container ref, which you might remember from the directive's deep dive section. A view container ref is essentially an object managed internally by Angular which gives Angular a reference, a pointer to a place in the dom you could say, with which it can interact. And this object has more than just like the coordinates where it sits, it has methods like hey please create a component here.

   //Now to get access to such a view container reference, we can create a helper directive.

   const hostViewContainerRef = this.alertHost.viewContainerRef
   //here we can get access to viewContainerRef, because our host has the viewContainerRef property because it is just the directive we're selecting in our template.
   //And our placeholder directive of course exposes view container ref as a public property here.
   //So therefore since we expose it there "PlaceHolderDirective" we can get access to it here in the auth component.And I'm storing it in a new constant.


   //Now the next thing is that we clear anything that might have been rendered there before by simply calling clear on this view container reference.
   hostViewContainerRef.clear();
   //As I mentioned, the view container reference is not just like a pair of coordinates. Instead it is an object that allows you to interact with that place in the dom and clear, simply clears all angular components that have been rendered in that place before. And I want to clear everything before I render something new.


      //Now we can use our component factory to create a new alert component in that hostViewContainerRef.
//hostViewContainerRef.createComponent(alertCmpFactory);
      // this now does not need the type of the component but it needs such a factory "alertCmpFactory".


   //to understand how angular create components, see lesson 317: Understanding entryComponent




   //we see no message here. And of course, we can't dismiss it by clicking, because in our Alert Component here, we do have @Input and @Output, but we're not using property or event biding on our component at the moment, because we created it here in code.We can't use the square brackets or the parenthesis syntax here.
   //so until here we get a component rendered when we enter wrong credentials, but with no message or functional button.


   //So how can we now pass data into that component or listen to an event or remove that?
   //Well, we simply have to store the component that is created here in some constant or variable with which we can work thereafter.
   //So here, I will store my component, however it's just a reference, a pointer at that component
   const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);
   //Now we can interact with that component.

   componentRef.instance.message = msg;
   //and this has a instance property which gives us access to the concrete instance of this component that was created here.

   this.closeSub  = componentRef.instance.close.subscribe( ()=>{
     this.closeSub.unsubscribe();
     hostViewContainerRef.clear();
   })
   //we simply manually have to listen to our (close) event here.

   //And remember that close in the end here is just an EventEmitter. Now, you learned that you should use EventEmitter basically only here, when it's decorated with @Output. And whenever you manually subscribe to something, you would want to use a subject. Here is basically the only exception to that rule. Since this is a component where we have @Output because we could use this component by selector as well, we have an EventEmitter and yet here, I manually want to subscribe and here, this is okay.

   //So here we subscribe to this and whenever this fires will run this function which I pass to subscribe "componentRef.instance.close.subscribe( ()=>{})", and in there we essentially wanna clear that component reference,Therefore, let's first of all store the subscription because we should manage this manually here. Private closeSub, which is of type subscription because the EventEmitter from Angular is based on the subject actually and therefore it has the same type of subscription. So here, I'll store this "this.closeSub  = ".

   //And now when we do close it, so when we make it into this function here 
   //"this.closeSub  = componentRef.instance.close.subscribe( ()=>{})"
   // we can call this.closeSub, unsubscribe because I wanna clear the subscription because I know that this component will be removed. And of course to remove the component, we use our hostViewContainerRef, and there we can call clear again, to clear all content that was rendered there.

   //One tiny piece of extra cleanup I wanna do, is I also wanna clear that subscription here if we get rid of the AuthComponent because if that AuthComponent is removed, we also don't wanna have the old subscriptions sit around anymore. So, I will implement OnDestroy here into the AuthComponent.
  }

  ngOnDestroy(): void {
   // And there, I wanna check if we have an active close subscription "closeSub", and if we do have one, because we only have one if we showed that error alert, therefore we need to check for the existence of this first. If we do have one, then I wanna unsubscribe.
    if(this.closeSub){
      this.closeSub.unsubscribe;
    }
  }
  //And now this ensures that when we do see that error here and we somehow would get rid of that AuthComponent, we have no real way, but still, then we would not have that ongoing subscription anymore.
}
