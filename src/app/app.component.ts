import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isRVisible: boolean = false;
  isSVisible: boolean = false;

  onC(e: boolean) {
    this.isRVisible = e;
    this.isSVisible=false;
  }

  onR(f:boolean){
    this.isSVisible=f
    this.isRVisible=false;
  }

}
