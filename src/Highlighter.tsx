import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { ClassNameMap } from '@material-ui/styles';
import { useState } from 'react';

export enum HighlightMode {
    Selected,
    Normal
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    selected: {
        color: 'teal',
        backgroundColor: 'yellow'
    },
    normal: {
        color: theme.palette.text.primary,
        "&:hover": {
            backgroundColor: 'blue'
        }
    }
}));

type Props = {
    children?: React.ReactNode;
}

export const Highlighter = (props: Props) => {
    const classes = useStyles();
    const [selected, setSelected] = useState(false);
    const mode = selected ? HighlightMode.Selected : HighlightMode.Normal;
    const style = getStyle(mode, classes);

    const toggleSelected = () => {
        setSelected(lastSelected => {
            return !lastSelected;
        });
    };


    return <span className={style} onClick={toggleSelected}>
        {props.children}
    </span>
}

const getStyle = (mode: HighlightMode, classes: ClassNameMap<'normal' | 'selected'>) => {
    switch (mode) {
        case HighlightMode.Selected: 
            return classes.selected;
        case HighlightMode.Normal:
            return classes.normal;
    }
}