import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { ClassNameMap } from '@material-ui/styles';
import { MouseEventHandler, useState } from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Color from 'color';

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
        marginLeft: '0.1rem',
        marginRight: '0.1rem',
        '& -webkit-user-select': 'none', /* Safari */
        '& -ms-user-select': 'none', /* IE 10 and IE 11 */
        userSelect: 'none',
        fontSize: 'x-large'
    },
    selected: {
        marginLeft: '0.1rem',
        marginRight: '0.1rem',
        color: (props: Props) => theme.palette.type === 'dark' ? props.highlight?.textColorDark : props.highlight?.textColorLight,
        backgroundColor: (props: Props) => theme.palette.type === 'dark' ? props.highlight?.backgroundColorDark : props.highlight?.backgroundColorLight,
        "&:hover": {
            color: (props: Props) => theme.palette.type === 'dark' ? props.highlight!.textColorDark : props.highlight!.textColorLight,
            backgroundColor: (props: Props) => Color(theme.palette.type === 'dark' ? props.highlight!.backgroundColorDark : props.highlight!.backgroundColorLight).alpha(0.7).string()
        }
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

    const [anchorEl, setAnchorEl] = useState<Element | null>(null);

    const handleClick: MouseEventHandler<HTMLSpanElement> = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const clearTag = () => {
        handleClose();
        props.onClearClicked?.();
    };

    const classes = useStyles(props);
    const style = getStyle(props.selected, classes);

    return <span>
        <Button className={style} aria-controls="simple-menu" aria-haspopup="true" onClick={!props.clearable ? props.onClick : handleClick}>
            {props.children}
        </Button>
        <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
        >
            <MenuItem onClick={clearTag}>Clear</MenuItem>
        </Menu>
    </span >
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
