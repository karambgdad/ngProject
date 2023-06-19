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
       this.userSub =  this.authService.user.subscribe(
        (user)=>{
            this.isAuthenticated = !user? false : true;
           
           console.log(!user)
           console.log(!!user)
        }
       )
       
       

    }

    onSaveData(){
       this.dataStorageService.storeRecipes()
    }

    onFetchData(){
       
        this.dataStorageService.fetchRecipes().subscribe()
        
    }
    onLogout(){
        this.authService.logout();
        // it would be nice we if we redirected user and now here I'll not do it in the component but in my service (AuthService) because whilst I only have one place for logging in in my application, which is the auth component, there are multiple possible sources which could lead to a log out. It's not just the header component. We will also add logic to automatically log us out once the token expired soon. And therefore, I wanna redirect here in the logout method in my service (AuthService), in this method here logOut(){} and not in a component.
    }

    ngOnDestroy() {
       this.userSub.unsubscribe()
    }
}