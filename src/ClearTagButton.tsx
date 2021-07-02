import ClearIcon from '@material-ui/icons/Clear';

interface Props {
    visible?: boolean;
    onClick?: () => void;
}

export const ClearTagButton = (props: Props) => {
    if (!props.visible) {
        return <></>;
    }

    return <ClearIcon color="primary"
        onClick={props.onClick}>
    </ClearIcon>
}