export class Recipe {
    public name: string;
    public description: string;
    public imagePath: string;
    
    constructor(na: string, desc: string, impath: string) {

        this.name = na
        this.description = desc;
        this.imagePath = impath;
    }

}