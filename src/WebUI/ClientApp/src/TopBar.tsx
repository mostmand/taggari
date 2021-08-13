import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { grey, teal } from "@material-ui/core/colors";
import makeStyles from "@material-ui/core/styles/makeStyles";
import React from "react";
import { DarkModeToggle } from "./DarkModeToggle";

const useStyles = makeStyles(theme => ({
  appBar: {
    backgroundColor: theme.palette.type === "dark" ? grey[800] : teal[600]
  },
  title: {
    flexGrow: 1
  }
}));

type Props = {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const TopBar = (props: Props) => {
  const classes = useStyles();

  return <React.Fragment>
    <AppBar 
    className={classes.appBar}
    position="static"
    >
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Taggari
        </Typography>
        <DarkModeToggle isDarkMode={props.isDarkMode} toggleDarkMode={props.toggleDarkMode} />
      </Toolbar>
    </AppBar>
  </React.Fragment>;
};