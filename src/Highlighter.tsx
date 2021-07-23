import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { ClassNameMap } from '@material-ui/styles';
import { MouseEventHandler } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Color from 'color';
import { ClickAwayListener, MenuList, Paper, Popper, Zoom } from '@material-ui/core';
import React from 'react';
import { grey } from '@material-ui/core/colors';

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
    },
    clearMenu: {
        backgroundColor: theme.palette.type === "dark" ? grey[600] : "white"
    }
}));

export const Highlighter = (props: Props) => {
    if (props.selected === true && props.highlight === null) {
        throw new Error('Selected is true but no highlight is defined');
    }

    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef<HTMLButtonElement>(null);

    const handleClick: MouseEventHandler<HTMLSpanElement> = (event) => {
        setOpen((isOpen) => !isOpen);
    };

    const handleClose = (event: React.MouseEvent<EventTarget>) => {
        if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
            return;
        }

        setOpen(false);
    };

    const clearTag = () => {
        setOpen(false);
        props.onClearClicked?.();
    };

    const classes = useStyles(props);
    const style = getStyle(props.selected, classes);

    return <span>
        <Button className={style} ref={anchorRef}
            aria-controls={open ? 'clear-menu' : undefined}
            aria-haspopup="true"
            onClick={!props.clearable ? props.onClick : handleClick}>
            {props.children}
        </Button>

        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition>
            {({ TransitionProps, placement }) => (
                <Zoom
                    {...TransitionProps}
                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                >
                    <Paper className={classes.clearMenu}>
                        <ClickAwayListener onClickAway={handleClose}>
                            <MenuList autoFocusItem={open} id="clear-menu">
                                <MenuItem onClick={clearTag}>Clear</MenuItem>
                            </MenuList>
                        </ClickAwayListener>
                    </Paper>
                </Zoom>
            )}
        </Popper>
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
