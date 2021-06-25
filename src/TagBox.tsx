import { Card } from "@material-ui/core"
import { Highlighter, HighlightMode } from "./Highlighter"

export const TagBox = () => {
    return <Card variant='outlined'>
        <Highlighter>selected</Highlighter> <Highlighter>normal</Highlighter> <Highlighter>hovered</Highlighter>
    </Card>
}