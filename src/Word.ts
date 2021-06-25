const OUTSIDE_TAG = 'O';

export class Word {
    constructor(token: string, selected?: boolean, tag?: string) {
        if (selected && tag !== null && tag !== OUTSIDE_TAG) {
            throw new Error(`Unselected tag cannot have any tag other than ${OUTSIDE_TAG}`);
        }
        this.token = token;
        this.selected = selected ?? false;
        this.tag = tag ?? OUTSIDE_TAG;
    }

    token: string;
    selected: boolean;
    tag: string;

    withSelected(selected: boolean): Word {
        return new Word(this.token, selected, this.tag);
    }

    withTag(tag: string) {
        return new Word(this.token, this.selected, this.tag);
    }
}