import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { ClassNameMap } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import { useState } from 'react';
import { ClearTagButton } from './ClearTagButton';

export interface HighlightColors {
    backgroundColorDark: string;
    textColorDark: string;
    backgroundColorLight: string;
    textColorLight: string;
}

interface Props {
    children?: React.ReactNode;
    selected: boolean;
    highlight?: HighlightColors;
    clearable?: boolean;
    onClearClicked?: () => void;
    onClick?: () => void;
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    text: {
        marginLeft: '0.3rem',
        marginRight: '0.3rem',
        '& -webkit-user-select': 'none', /* Safari */
        '& -ms-user-select': 'none', /* IE 10 and IE 11 */
        userSelect: 'none',
        fontSize: 'x-large'
    },
    selected: {
        color: (props: Props) => theme.palette.type === 'dark' ? props.highlight?.textColorDark : props.highlight?.textColorLight,
        backgroundColor: (props: Props) => theme.palette.type === 'dark' ? props.highlight?.backgroundColorDark : props.highlight?.backgroundColorLight,
    },
    normal: {
        color: theme.palette.text.primary,
        "&:hover": {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.action.selected
        }
    }
}));

export const Highlighter = (props: Props) => {
    if (props.selected === true && props.highlight === null) {
        throw new Error('Selected is true but no highlight is defined');
    }

    const [clearButtonVisibility, setClearButtonVisibility] = useState(false);
    const classes = useStyles(props);
    const style = getStyle(props.selected, classes);

    return <span>
        <span
            onClick={props.onClick}
            onMouseEnter={!props.clearable ? undefined : () => setClearButtonVisibility(true)}
            onMouseLeave={!props.clearable ? undefined : () => setClearButtonVisibility(false)}>

            <Grid container
                direction='column'
                alignItems='center'
                justify='center'
            >
                <ClearTagButton visible={clearButtonVisibility} onClick={() => {
                    setClearButtonVisibility(false);
                    props.onClearClicked?.();
                }} />
                <Grid item className={style}>
                    {props.children}
                </Grid>
            </Grid>
        </span>
    </span>
}

Highlighter.defaultProps = {
    highlight: {
        backgroundColorDark: 'teal',
        backgroundColorLight: 'teal',
        textColorDark: 'white',
        textColorLight: 'white'
    }
};

const getStyle = (selected: boolean, classes: ClassNameMap<'normal' | 'selected' | 'text'>): string => {
    return `${selected ? classes.selected : classes.normal} ${classes.text}`;
}
