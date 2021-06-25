import { TagColors } from "./TagColors";

export class Tag {
    name: string;
    tag: string;
    colors: TagColors;
    onClick?: () => void;

    constructor(name: string, tag: string, colors: TagColors){
        this.name = name;
        this.tag = tag;
        this.colors = colors;
    }
}