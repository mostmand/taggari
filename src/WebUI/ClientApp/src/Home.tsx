import React, {useState} from 'react';
import './App.css';
import {TagBox} from './TagBox';
import {createMuiTheme, useMediaQuery, Box} from '@material-ui/core';
import {TopBar} from './TopBar';
import {makeStyles, Theme} from '@material-ui/core/styles';
import {grey, teal} from '@material-ui/core/colors';

const useGlobalStyles = (theme: Theme) => makeStyles({
    "@global": {
        body: {
            backgroundColor: theme.palette.type === "dark" ? grey[800] : teal[100]
        }
    }
})();

const Home = () => {
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
        <Box>
            <TopBar isDarkMode={isDarkMode} toggleDarkMode={() => setIsDarkMode((isDarkMode) => !isDarkMode)}/>
            <TagBox/>
        </Box>
    );
};

export default Home;
