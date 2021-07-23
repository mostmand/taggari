import { Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { green, grey } from "@material-ui/core/colors";
import Color from "color";

const useStyles = makeStyles((theme) => {
    const buttonColor = theme.palette.type === "dark" ? grey[700] : green[600];
    return ({
        root: {
            position: "sticky",
            left: 0,
            bottom: 0,
            width: "100%",
            color: "white",
            textAlign: "center",
            overflow: "hidden",
            marginTop: "0.3rem",
        },
        buttonWrapper: {
            flexGrow: 1
        },
        submitButton: {
            width: "100%",
            backgroundColor: buttonColor,
            color: "white",
            height: "3rem",
            "&:hover": {
                backgroundColor: Color(buttonColor).alpha(0.8).string()
            }
        }
    });
}
);

export const BottomBar = () => {
    const classes = useStyles();

    return <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        className={classes.root}
    >
        <Grid item className={classes.buttonWrapper}>
            <Button className={classes.submitButton}>
                Submit
            </Button>
        </Grid>
    </Grid>
};