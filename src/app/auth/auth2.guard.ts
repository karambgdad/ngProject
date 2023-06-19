//A route guard allows us to run logic right before a route is loaded.

import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, map, take, tap } from "rxjs";
import { AuthService } from "./auth.service";


export const authGuardFn: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> =>{

    const router = inject(Router);
    const authService = inject(AuthService);

    return authService.user.pipe ( take (1),map((user)=>{

        const isAuth = !!user 
        if (isAuth){
            return true;
        }else{
            return router.createUrlTree (['/auth'])
        }
    }))
}