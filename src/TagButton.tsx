import { Button, createStyles, makeStyles, Theme } from "@material-ui/core";

type Props = {
    buttonColor: string;
    children?: React.ReactNode;
    onClick?: () => void;
}
export const TagButton = (props: Props) => {
    const useStyles = makeStyles((theme: Theme) => createStyles({
        button: {
            backgroundColor: props.buttonColor
        } 
    }));

    const styles = useStyles(props);
    return <Button variant='contained' className={styles.button} onClick={props.onClick}>{props.children}</Button>
}