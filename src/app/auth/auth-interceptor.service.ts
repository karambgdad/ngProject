import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, exhaustMap, take } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable() //since i plan on injecting something here, dont add the object with providedIn "the root", because we will provided differently as we learned
export class AuthIntceptorService implements HttpInterceptor{

    constructor(private authService : AuthService){}

    intercept(req: HttpRequest<any>, next: HttpHandler) {//needs to get two arguments
       

    //this.authService.user.subscribe(user =>{})
    // return next.handle(req)// therefore the intercept mthode will return an observable
        //however i dont want to return the request like this, but i want to edit it before i return it, i wanna add the token
        //therefore with each http request that get out there is an interceptor that intercept and manupulate the request in such we send the user token with each http request, to access the user we need to inject AuthService in the constructor, after that we can reach out to the user which is a subject or BehaviorSubject, and subscribe to it.


        //with this :  this.authService.user.subscribe(user =>{})
        // and this:  return next.handle(req)
        //we have the user as an observable, and "return next.handle(req)" is aose an observable (the same problem in data-storage service), so we cant return an observable inside another observable like this, so we need to return next with an httprequest which contains the user token, so we have the req as observable and user as observable, therefore we use pipe, take,exhaustMap.

        return this.authService.user.pipe(
            take(1),
            exhaustMap(user =>{

                if (!user){
                    return next.handle(req);
                }
                const modifiedReq = req.clone({params : new HttpParams().set('auth', user.token)}) //** 
                //here we can edit the req " the request" based on the user here now, and we return this overall chain, which is as before, will have this handle OBSERVABLE being returned, because we swap the user observabe with this handle observable using the ExhaustMap operator, so all we have to do in the ** now that we have to clone our request and update it,
                //this is created by calling req.clone, and to clone we can pass an object where we can update the params by setting them to a new set of HttpParams,(now we should handle the modified request not req) 

            //return next.handle(req)

              return next.handle(modifiedReq)//and with that, this interceptor should add token to all outgoing requests, we just must make sure that we provide the intercpetor in the right way
            })
        )


    }

}

//with this code only we will have an error even when we signIn, because with signIn or with any auth Httprequest "including the signIn and signUp requests" we are invoking this interceptor, because with this :  this.authService.user.pipe
//we are here getting null as a user, as we defined the initial value for the user sithnull in the AuthService
//and this clone({params : new HttpParams().set('auth', user.token)}) 
//will fail because we are trying to access token on a null user ==> error, the solution is to add a checked (if), this means, we only try to add token if we have a user


//The advantage of the inter setter now of course is that this also automatically works for storing recipes because this uses the same interceptor automatically. So if I delete a recipe and I click save data, you see this also succeeds. Otherwise we would have an error down there and we can also prove it by fetching data again. This doesn't change so we are not fetching a third recipe because we overwrote them on the server with our safe action. So that's the interceptor in action.