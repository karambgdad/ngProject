//A route guard allows us to run logic right before a route is loaded.

import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, map, take, tap } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({providedIn: 'root'})//since this class is a service

export class AuthGuard implements CanActivate{

   
    constructor(private authService: AuthService,
                private router: Router){}

canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree>{

    //In guards, interceptors and resolvers Angular subscribes automatically under the hood if we return an Observable.
    return this.authService.user.pipe ( take (1),map((user)=>{

        const isAuth = !!user 
        if (isAuth){
            return true;
        }else{
            return this.router.createUrlTree (['/auth'])
        }
    }))
}

    
}