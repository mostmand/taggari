import { Card } from "@material-ui/core";
import { Tag } from "./Tag"
import { TagButton } from "./TagButton";

type Props = {
    tags: Tag[];
}
export const TagSelector = (props: Props) => {
    const buttons = props.tags.map(tag => {
        return <TagButton buttonColor={tag.colors.buttonColor} onClick={tag.onClick}>{tag.name}</TagButton>
    });
    return <Card variant='outlined'>
        {buttons}
    </Card>;
}