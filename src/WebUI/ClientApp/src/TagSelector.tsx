import { Grid } from "@material-ui/core";
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
        return <Grid item>
            <TagButton
                key={index}
                buttonColor={tag.buttonColor}
                onClick={tag.onClick}>
                {tag.name}
            </TagButton>
        </Grid>
    });
    return <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={1}>
        {buttons}
    </Grid>;
}