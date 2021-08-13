import { red } from '@material-ui/core/colors';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

interface Props {
    visible?: boolean;
    onClick?: () => void;
}

export const ClearTagButton = (props: Props) => {
    if (!props.visible) {
        return <></>;
    }

    return <HighlightOffIcon style={{color: red[900]}}
        onClick={props.onClick}>
    </HighlightOffIcon>
}