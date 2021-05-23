import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {DataSet, DomPuzzle} from 'components/DomPuzzle';
import {
    Button,
    LinearProgress,
    Slider,
    withStyles,
} from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux';
import {scan} from 'actions/explore';
import {exploreSelector} from 'selectors/explore';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {Dialog} from 'components/Dialog';
import {pageSelector} from 'selectors/page';

type SnapshotsSize = {
    maxY: number;
    maxX: number;
    framesCount: number;
}

const CustomSlider = withStyles({
    root: {
        height: 8,
    },
    thumb: {
        height: 24,
        width: 24,
        marginTop: -8,
        marginLeft: -12,
    },
    track: {
        height: 8,
        borderRadius: 4,
    },
    rail: {
        height: 8,
        borderRadius: 4,
    },
})(Slider);

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        puzzle: {
            margin: theme.spacing(2),
        },
        aboutButton: {
            marginRight: theme.spacing(2),
        },
    }),
);

const dialog = {
    title: 'About',
    text: `Here each element is rotated one by one.
        It allows you explore how does puzzle api work by going forward and backward in the history. Use slider below the Puzzle map to go through the history.
        
        Note that on levels 2-6 scanning may take too much time.
        Push "Scan!" to start.`,
};

export const Explore = () => {
    const styles = useStyles();
    const {level} = useSelector(pageSelector);
    const dispatch = useDispatch();
    const {snapshots, scanning} = useSelector(exploreSelector);
    const [size, setSize] = useState<SnapshotsSize>({maxY: 0, maxX: 0, framesCount: 0});
    const [dataset, setDataset] = useState<DataSet | null>(null);
    const [aboutDialogState, setAboutDialogState] = useState(false);

    const [handleDialogOpen, handleDialogClose] = useMemo(() => [
        () => setAboutDialogState(true),
        () => setAboutDialogState(false),
    ], [setAboutDialogState]);

    const handleScanClick = useCallback(() => {
        dispatch(scan());
    }, []);

    const handleDataSetChange = useCallback((_: React.ChangeEvent<{}>, value: number | number[]) => {
        if (Array.isArray(value)) {
            return;
        }

        const {maxX, framesCount} = size;
        const frame = value % framesCount;
        const y = Math.floor((value - frame) / framesCount / maxX);
        const x = Math.floor((value - y * maxX * framesCount) / framesCount);

        setDataset({
            elements: snapshots[y][x][frame],
            focusOn: [y, x],
        });
    }, [size, snapshots]);

    useEffect(() => {
        setDataset(null);
    }, [level]);

    useEffect(() => {
        const maxY = snapshots.length;
        const maxX = maxY && snapshots[0].length;
        const framesCount = maxX && snapshots[0][0].length;

        if (!framesCount) {
            return;
        }

        if (framesCount) {
            setDataset({elements: snapshots[0][0][0], focusOn: [0, 0]});
            setSize({maxY, maxX, framesCount});
        }
    }, [snapshots]);

    if (scanning) {
        return (
            <>
                Scanning in progress...
                <LinearProgress />
            </>
        );
    }

    return (
        <div>
            <>
                <Button onClick={handleDialogOpen} className={styles.aboutButton}>About</Button>
                <Button onClick={handleScanClick} variant={'contained'} color={'primary'}>Scan!</Button>
            </>

            {
                dataset && <>
                    <DomPuzzle dataSet={dataset} className={styles.puzzle} />
                    <CustomSlider onChange={handleDataSetChange} max={size.maxY * size.maxX * size.framesCount - 1} />
                </>
            }
            <Dialog open={aboutDialogState} onClose={handleDialogClose} {...dialog} />
        </div>
    );
};
