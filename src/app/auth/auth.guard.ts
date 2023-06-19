//A route guard allows us to run logic right before a route is loaded.

import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, map, take, tap } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({providedIn: 'root'})//since this class is a service

export class AuthGuard implements CanActivate{

    //Now what can we return here? We wanna return the status as we can derive it from our auth service.
    //And then in there (in the canActivate method) we can find out whether the user is authenticated or not by looking at that user behaviorSubject. So here we can access this authService user, and now don't subscribe here, but return it instead because this already is an observable. It's a subject and therefore also an observable,
    constructor(private authService: AuthService,
                private router: Router){}

//canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> | Observable<boolean>{

        //however not an observable that returns a Boolean. Instead it is an observable that in the end returns a user object, but this can be fixed easily. We just add pipe and use the map operator, which is imported from RXJS operators, to transform the observable value here. So we get our user, and we wanna return true or false, so we can simply return exclamation mark exclamation mark user, which is that trick which converts a true-ish value like a, object, so anything that is not null or undefined, to true, so to a real Boolean, or that converts a false-ish value like null or undefined to a true Boolean, so to false in this case.

// return this.authService.user.pipe (map((user)=>{
//  return !! user;
//}), tap((isAuth)=>{//tap gives us access to the map result which is true or false, is the user authenticated or not, and in tap we could check if the user is not authenticated we can reroute the user to /auth 

//if(!isAuth){
//this.router.navigate(['/auth'])
//}
        
//})) // we use the tap opertator to redirect the user to a desired webpage whenever he try access a page while not authenticated
    

//}//but in some edge cases this could lead to race conditions with multiple redirects that kind of interfere with each other.



    //instead i can use a different approach

canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree>{

    return this.authService.user.pipe ( take (1),map((user)=>{

        //here i would return true if i want to grant access, but do not return false otherwise, rather i would return a URL tree, and now such URL tree can be created with the router

        const isAuth = !!user // here i store the result of the condition statement in a const
        if (isAuth){
            return true;
        }else{
            return this.router.createUrlTree (['/auth'])//I'm getting an error here because the types I added here don't include the URL tree. We just need to update this to meet the specification of the interface. And yes, a URL tree is allowed there "above"
        }
    }))
}//Now with that, we're almost done with the guard, but there's one thing I wanna edit in this authGuard. Right now we're subscribing to our user service here, we're mapping that value into true or false, and we are returning a URL tree if it is false, and there we redirect. The one issue we have here is that we essentially set up an ongoing subscription here, though. This user subject of course can emit data more than once, and I don't want that here. This can lead to strange side effects if our guard keeps on listening to that subject.

//Instead, we wanna look into that user value for one time only and then not care about it anymore unless we run the guard again. And therefore here, just as in our places too, we should use take(1) to make sure that we always just take the latest user value, and then unsubscribe for this guard execution,that which we really don't need.

    
}