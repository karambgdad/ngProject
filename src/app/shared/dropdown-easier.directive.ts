import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdownEasier]'
})
export class DropdownEasierDirective {

  @HostBinding ('class.open') issOpen=false;

  @HostListener ('click') onClick(){
    this.issOpen = !this.issOpen
  }
  constructor() { }

}
