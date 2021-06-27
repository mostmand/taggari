import { lime, orange } from "@material-ui/core/colors";
import { TagDefinition } from "./TagDefinition";

export const Tags: TagDefinition[] = [
    new TagDefinition('Location', 'LOC', {
        backgroundColorDark: orange[500],
        backgroundColorLight: orange[500],
        textColorDark: 'white',
        textColorLight: 'white',
        buttonColor: orange[500]
    }),
    new TagDefinition('Person', 'PER', {
        backgroundColorDark: lime[500],
        backgroundColorLight: lime[500],
        textColorDark: 'black',
        textColorLight: 'black',
        buttonColor: lime[500]
    })
]