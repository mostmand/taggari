export class Word {
    token: string;
    selected: boolean;
    tag?: string;
    
    constructor(token: string, selected?: boolean, tag?: string) {
        if (selected === true && tag !== undefined) {
            throw new Error(`Selected word cannot have any tag`);
        }
        this.token = token;
        this.selected = selected ?? false;
        this.tag = tag;
    }

    withSelected(selected: boolean): Word {
        return new Word(this.token, selected, this.tag);
    }

    withTag(tag: string) {
        return new Word(this.token, this.selected, tag);
    }
}