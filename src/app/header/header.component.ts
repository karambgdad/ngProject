import { Component, ElementRef, EventEmitter, Output, ViewChild } from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {
  
    constructor(private dataStorageService : DataStorageService){}

    onSaveData(){
       this.dataStorageService.storeRecipes()
    }

    onFetchData(){
        //the subscribe here has been added in the sake of resolver //in subscribr() you dont have to pass in a function if you dont care about the response anyway
        this.dataStorageService.fetchRecipes().subscribe()
        
    }
}


//you saw previously that there fire base created some cryptic keys for these recipes. It always does that when you post data when you attach one data piece at a time, if you put data it assumes that you know what you're putting there. And therefore, if you wanted IDs here for these recipes you would have to generate an atom on your own.