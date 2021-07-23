import { Grid } from "@material-ui/core";

interface Props {
  children?: React.ReactNode[];
}

export const TextArea = (props: Props) => {
  const children = props.children?.map((child, index) => <Grid key={index} item>{child}</Grid>)

  return <Grid
    container
    direction="row"
    justify="flex-start"
    alignItems="center"
    wrap="wrap"
  >
    {children}
  </Grid>;
}