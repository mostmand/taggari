import { Card } from "@material-ui/core";
import { TagButton } from "./TagButton";

export interface Tag {
    name: string;
    buttonColor: string;
    onClick?: () => void;
}

type Props = {
    tags: Tag[];
}

export const TagSelector = (props: Props) => {
    const buttons = props.tags.map((tag, index) => {
        return <TagButton key={index} buttonColor={tag.buttonColor} onClick={tag.onClick}>{tag.name}</TagButton>
    });
    return <Card variant='outlined'>
        {buttons}
    </Card>;
}