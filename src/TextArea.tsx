// import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Paper, Grid } from "@material-ui/core";

interface Props {
  children?: React.ReactNode[];
}

export const TextArea = (props: Props) => {
  // const useStyles = makeStyles((theme: Theme) => createStyles({
  //   textArea: {
  //     // backgroundColor: "black"
  //   }
  // }));
  // const classes = useStyles(props);

  const children = props.children?.map(child => <Grid item>{child}</Grid>)

  return <Paper>
    <Grid
      container
      direction="row"
      justify="flex-start"
      alignItems="center"
      wrap="wrap"
      spacing={2}
    >
      {children}
    </Grid>
  </Paper>
}