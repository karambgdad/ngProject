import { Directive, ViewContainerRef } from "@angular/core";

@Directive({//this directive needs one thing and it is a selector

    selector: '[appPlaceHolder]' //The selector here, should be an attribute selector so that we can add this directive as an attribute to any element.
})
export class PlaceHolderDirective {
    //and now this directive needs to do one important thing. It needs to inject the view container ref.
    
    constructor(public viewContainerRef: ViewContainerRef){}//this automatically gives you access to the reference, to a pointer at the place where this directive is then used. So this will allow you to get information about the place where you use that directive. And as I said, that will not just be coordinates.
    
    // viewContainerRef has useful methods, for example for creating a component in that place where it sits.

    //So you essentially get access to the place where the directive is added to and you not just get access in the sense of: Where is this? But also in the sense of please add something there.

    //Now we need to turn this into a public property using that times code shortcut where this argument is automatically stored in a property of the same name, and this property is publicly accessible so that we can access that viewContainerRef from outside. Now, why do we need that? Because now, we will be able to add the directive to someplace in our DOM, in our templates, and then get access to it with at view child and then get access to that public viewContainerRef to work with that viewContainerRef of that directive.

    //before we do that, we have to declare that directive in the app module



    

}



/*
shortcut through TS, so viewContainerRef is a property of the class "PlaceHolderDirective"

export class PlaceHolderDirective {
public viewContainerRef : ViewContainerRef;

    constructor(viewContainerRef: ViewContainerRef){
        this.viewContainerRef = viewContainerRef
    }
}

*/