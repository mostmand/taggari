import React, {useState} from 'react';
import './App.css';
import {createMuiTheme, ThemeProvider, useMediaQuery, Box} from '@material-ui/core';
import {makeStyles, Theme} from '@material-ui/core/styles';
import {grey, teal} from '@material-ui/core/colors';
import {Route} from "react-router-dom";
import Home from "./Home";
import {TopBar} from "./TopBar";

const useGlobalStyles = (theme: Theme) => makeStyles({
    "@global": {
        body: {
            backgroundColor: theme.palette.type === "dark" ? grey[800] : teal[100]
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
                <TopBar isDarkMode={isDarkMode} toggleDarkMode={() => setIsDarkMode((isDarkMode) => !isDarkMode)}/>
                <Route exact path='/' component={Home}/>
            </Box>
        </ThemeProvider>
    );
};

export default App;
