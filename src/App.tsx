import React, { useState } from 'react';
import './App.css';
import { TagBox } from './TagBox';
import { createMuiTheme, ThemeProvider, useMediaQuery, Box } from '@material-ui/core';
import { TopBar } from './TopBar';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';

const useGlobalStyles = (theme: Theme) => makeStyles({
  "@global": {
    body: {
      backgroundColor: theme.palette.type === "dark" ? grey[800] : "#FFFFFF"
    }
  }
})();

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(useMediaQuery('(prefers-color-scheme: dark)'));

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: isDarkMode ? 'dark' : 'light',
        },
      }),
    [isDarkMode],
  );

  useGlobalStyles(theme);

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <TopBar isDarkMode={isDarkMode} toggleDarkMode={() => setIsDarkMode((isDarkMode) => !isDarkMode)} />
        <TagBox />
      </Box>
    </ThemeProvider>
  );
};

export default App;
