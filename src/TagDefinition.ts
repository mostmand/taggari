import { TagColors } from "./TagColors";

export class TagDefinition {
    name: string;
    tag: string;
    colors: TagColors;

    constructor(name: string, tag: string, colors: TagColors){
        this.name = name;
        this.tag = tag;
        this.colors = colors;
    }
}