import { Grid } from "@material-ui/core";
import { Theme } from "@material-ui/core/styles";
import { createStyles } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";

interface Props {
  children?: React.ReactNode[];
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
      backgroundColor: theme.palette.type === "dark" ? "inherit" : "whitesmoke"
  }
}));

export const TextArea = (props: Props) => {
  const classes = useStyles();

  const children = props.children?.map((child, index) => <Grid key={index} item>{child}</Grid>)

  return <Grid
    container
    direction="row"
    justify="flex-start"
    alignItems="center"
    wrap="wrap"
    className={classes.root}
  >
    {children}
  </Grid>;
}