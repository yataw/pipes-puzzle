import React, {FC} from 'react';
import {
    Button,
    Dialog as MaterialDialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Typography,
} from '@material-ui/core';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';

type Props = {
    open: boolean;
    onClose: () => void;
    title: string;
    text: string;
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            margin: 0,
            padding: theme.spacing(2),
        },
        closeButton: {
            position: 'absolute',
            right: theme.spacing(1),
            top: theme.spacing(1),
            color: theme.palette.grey[500],
        },
        text: {
            whiteSpace: 'pre-line',
        }
    }),
);

export const Dialog: FC<Props> = ({open, onClose, title, text}) => {
    const styles = useStyles();

    return (
        <MaterialDialog onClose={onClose} open={open}>
            <DialogTitle className={styles.root}>{title}</DialogTitle>
            <IconButton aria-label="close" className={styles.closeButton} onClick={onClose}>
                <CloseIcon />
            </IconButton>
            <DialogContent>
                <Typography variant={'subtitle1'} className={styles.text}>{text}</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </MaterialDialog>
    );
};
