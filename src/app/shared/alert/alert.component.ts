import { Component, EventEmitter, Input, Output } from "@angular/core";





@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.css']
})
export class AlertComponent {

   @Input() message:string;
   @Output() close = new EventEmitter <void>()//i won't emit any data, i just wanna emit the "hey this was closed event"

   onClose(){
    this.close.emit();
   }
}