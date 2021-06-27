import React from 'react';
import './App.css';
import { TagBox } from './TagBox';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';


function App() {
  // const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const prefersDarkMode = true;

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );
  
  return (
    <ThemeProvider theme={theme}>
      <div>
          <TagBox />
      </div>
    </ThemeProvider>
  );
}

export default App;
