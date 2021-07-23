import { IconButton } from "@material-ui/core";
import Brightness3Icon from "@material-ui/icons/Brightness3";
import Brightness7Icon from "@material-ui/icons/Brightness7";

type Props = {
    isDarkMode: boolean;
    toggleDarkMode: () => void;
}

export const DarkModeToggle = (props: Props) => {
    const icon = props.isDarkMode ? <Brightness7Icon /> : <Brightness3Icon />;
    return <IconButton
        edge="end"
        color="inherit"
        aria-label="mode"
        onClick={props.toggleDarkMode}
    >
        {icon}
    </IconButton>;
};