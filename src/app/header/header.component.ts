import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";
import { AuthService } from "../auth/auth.service";
import { Subscription } from "rxjs";


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy{
 
    isAuthenticated = false;

    private userSub : Subscription;
  
    constructor(private dataStorageService : DataStorageService,
                private authService: AuthService){}


    ngOnInit() {
       this.userSub =  this.authService.user.subscribe(// this subscribe will recieve a user with value or user with null
        (user)=>{
            this.isAuthenticated = !user? false : true;
           //the same as above// this.isAuthernticated = !!user;
           console.log(!user)
           console.log(!!user)
        }
       )// as mentioned in the AuthService, let us rely on the fact that this user id either null if we are not logged in or exists if we are logged in, so if we have a user we are logged in.
       
       

    }

    onSaveData(){
       this.dataStorageService.storeRecipes()
    }

    onFetchData(){
        //the subscribe here has been added in the sake of resolver //in subscribr() you dont have to pass in a function if you dont care about the response anyway
        this.dataStorageService.fetchRecipes().subscribe()
        
    }

    ngOnDestroy() {
       this.userSub.unsubscribe()
    }
}


//you saw previously that there fire base created some cryptic keys for these recipes. It always does that when you post data when you attach one data piece at a time, if you put data it assumes that you know what you're putting there. And therefore, if you wanted IDs here for these recipes you would have to generate an atom on your own.