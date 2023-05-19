import { Component, ElementRef, EventEmitter, Output, ViewChild } from "@angular/core";


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {
    collapsed = true;
    @Output() rClickedValue = new EventEmitter<boolean>();
    @Output() sClickedValue = new EventEmitter<boolean>();


    onRecipeClick() {   
        this.rClickedValue.emit(true);
    }

    onShopListClick() {
        this.sClickedValue.emit(true);
}
}