import styles from './ChooseLevel.module.scss';
import React, {FC, useCallback, useState} from 'react';
import {Fade, IconButton, TextField} from '@material-ui/core';
import Image from 'next/image';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {useDispatch, useSelector} from 'react-redux';
import {pageSelector} from 'selectors/page';
import {inRange} from 'lodash';
import {MAX_LEVEL, MIN_LEVEL} from 'globals/globals';
import {useSnackbar} from 'notistack';
import {setLevel} from 'actions/page';

type Props = {};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        btn: {
            marginLeft: theme.spacing(1),
        },
    }),
);

const isValidLevel = (level: any): level is Level => {
    return inRange(level, MIN_LEVEL, MAX_LEVEL + 1);
};

export const ChooseLevel: FC<Props> = () => {
    const {level} = useSelector(pageSelector);
    const dispatch = useDispatch();
    const classes = useStyles();
    const [currentLevel, setCurrentLevel] = useState<Level>(level);
    const {enqueueSnackbar} = useSnackbar();
    const handleLevelChange = useCallback(({target}: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(target.value);

        if (isValidLevel(value)) {
            setCurrentLevel(value);
        } else {
            enqueueSnackbar(`Choose the correct level from ${MIN_LEVEL} to ${MAX_LEVEL}`, {variant: 'warning'});
        }
    }, [setCurrentLevel]);

    const handleButtonClick = useCallback(() => {
        dispatch(setLevel(currentLevel));
        enqueueSnackbar(`Current level is ${currentLevel}`, {variant: 'info', preventDuplicate: true});
    }, [dispatch, currentLevel]);

    return (
        <div className={styles.level}>
            <TextField size={'small'} label="Level" variant="outlined" type={'number'} className={styles.levelInput}
                       value={currentLevel} onChange={handleLevelChange} />

            <Fade in={currentLevel !== level}>
                <IconButton classes={{root: classes.btn}} onClick={handleButtonClick}>
                    <Image src={'/images/sync.svg'} width={20} height={20} />
                </IconButton>
            </Fade>

        </div>
    );
};
