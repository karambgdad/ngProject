import { Directive, ElementRef, HostListener, OnInit, Renderer2, } from "@angular/core";


@Directive({
    selector: '[appDropdown]'

})
export class DropdownDirective implements OnInit {
    private isClicked = false;

    constructor(private addClass: ElementRef, private renderer: Renderer2) { }
   
    ngOnInit() {
    }

    @HostListener ('click') onClick (){
        //The @HostListener decorator is used to listen to the 'click' event on the host element to which the directive is applied.
        //"@HostListener ('click') onClick ()" when the click happens the onClick will get excuted
        if (!this.isClicked) {
           // so with the first click if (!this.isClicked) means if (!false) means if(true)
           // The if (!this.isClicked) condition evaluates to if (true) when this.isClicked is initially false. This means that the code inside the if block will be executed on the first click event.
            this.renderer.addClass(this.addClass.nativeElement, "open")
          //  we can replace it with this:  this.addClass.nativeElement.classList.add('open')
            this.isClicked=true
        }
        else  {
            this.renderer.removeClass(this.addClass.nativeElement, "open");
            this.isClicked=false;
        }
    }

}