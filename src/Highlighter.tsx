import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { ClassNameMap } from '@material-ui/styles';

const useStyles = makeStyles((theme: Theme) => createStyles({
    text: {
        marginLeft: '0.3rem',
        marginRight: '0.3rem'
    },
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
    selected: boolean;
    onClick: () => void;
}

export const Highlighter = (props: Props) => {
    const classes = useStyles();
    const style = getStyle(props.selected, classes);

    return <span className={style} onClick={props.onClick}>
        {props.children}
    </span>
}

const getStyle = (selected: boolean, classes: ClassNameMap<'normal' | 'selected' | 'text'>): string => {
    return `${selected ? classes.selected : classes.normal} ${classes.text}`;
}