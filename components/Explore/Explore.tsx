import React, {useCallback, useEffect, useState} from 'react';
import {DataSet, DomPuzzle} from 'components/DomPuzzle';
import {Button, LinearProgress, Slider} from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux';
import {scan} from 'actions/explore';
import {exploreSelector} from 'selectors/explore';

type SnapshotsSize = {
    maxY: number;
    maxX: number;
    framesCount: number;
}

export const Explore = () => {
    const dispatch = useDispatch();
    const {snapshots, scanning} = useSelector(exploreSelector);
    const [size, setSize] = useState<SnapshotsSize>({maxY: 0, maxX: 0, framesCount: 0});
    const [dataset, setDataset] = useState<DataSet | null>(null);

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
            <Button onClick={handleScanClick} variant={'outlined'}>Scan</Button>
            {
                dataset && <>
                    <DomPuzzle dataSet={dataset} />
                    <Slider onChange={handleDataSetChange} max={size.maxY * size.maxX * size.framesCount - 1}/>
                </>}

        </div>
    );
};
