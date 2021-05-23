import styles from './GUI.module.scss';
import {useSelector} from 'react-redux';
import {pageSelector} from 'selectors/page';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useAppContext} from 'hooks/useAppContext';
import {hydrate} from 'utils/fragments/hydrate';
import {Button} from '@material-ui/core';
import {useSnackbar} from 'notistack';

const getBaseSize = (totalFragments: number): number => {
    return [200, 300, 400, 500, 600, 700, 800, 900, 1000].filter(base => {
        const fragments = Math.ceil(base / totalFragments);

        return fragments * totalFragments === base;
    })[0];
};

type FieldInfo = {
    maxX: number,
    maxY: number,
    field: {
        width: number;
        height: number;
    },
    fragment: {
        width: number;
        height: number;
    },
};

const defaultInfo: FieldInfo = {
    maxX: 0,
    maxY: 0,
    field: {
        width: 0,
        height: 0,
    },
    fragment: {
        width: 0,
        height: 0,
    },
};

export const GUI = () => {
    const {puzzleApi} = useAppContext();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const {level} = useSelector(pageSelector);
    const [field, setField] = useState<{field: PuzzleField, info: FieldInfo}>({field: [], info: defaultInfo});
    const [preparing, setPreparing] = useState(false);
    const {enqueueSnackbar} = useSnackbar();

    const renderFragment = useCallback((x: number, y: number) => {
        const {info: {fragment: {width, height}}} = field;
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');

        if (!canvas || !ctx) {
            return;
        }

        ctx.fillRect(x * width, y * height, width, height);
    }, [field]);

    const renderPuzzle = useCallback(() => {
        const {info: {maxY, maxX}} = field;

        for (let i = 0; i < maxY; i++) {
            for (let j = 0; j < maxX; j++) {
                for (let y = 0; y < 3; y++) {
                    for (let x = 0; x < 3; x++) {
                        if (field.field[i][j][y][x]) {
                            renderFragment(j * 3 + x, i * 3 + y);
                        }
                    }
                }
            }
        }
    }, [field, renderFragment])

    const updateField = useCallback(() => {
        (async () => {
            const map = await puzzleApi.mapParsed();
            const field = hydrate(map);

            const canvas = canvasRef.current;
            const ctx = canvas?.getContext('2d');

            if (!canvas || !ctx) {
                return;
            }

            const [maxY, maxX] = [field.length, field[0]?.length];
            const [fieldHeight, fieldWidth] = [getBaseSize(maxY) * 3, getBaseSize(maxX) * 3];
            const [width, height] = [fieldHeight / maxY / 3, fieldWidth / maxX / 3];


            ctx.clearRect(0, 0, canvas.width, canvas.height);

            canvas.height = fieldHeight;
            canvas.width = fieldWidth;

            setField({
                field,
                info: {
                    maxY,
                    maxX,
                    field: {
                        width: fieldWidth,
                        height: fieldHeight,
                    },
                    fragment: {
                        width,
                        height,
                    },
                }
            });

            setPreparing(false);
        })();
        setPreparing(true);
    }, [puzzleApi, setPreparing]);

    const handleClick = useCallback(async ({nativeEvent: {offsetX, offsetY}}: React.MouseEvent<HTMLCanvasElement>) => {
        const {info: {fragment: {width, height}}} = field;
        const [x, y] = [Math.ceil(offsetX / width / 3) - 1, Math.ceil(offsetY / height / 3) - 1];

        if (preparing) {
            return;
        }

        await puzzleApi.rotate([x, y]);
        updateField();

    }, [puzzleApi, field, preparing]);

    useEffect(() => {
        updateField();
    }, [level, updateField]);

    useEffect(() => {
        renderPuzzle();
    }, [field, renderPuzzle]);

    const handleCheckClick = useCallback(() => {
        puzzleApi.verify().then(msg => {
            enqueueSnackbar(msg);
        });
    }, [puzzleApi]);

    return (
        <div>
            <canvas ref={canvasRef} className={styles.canvas} onClick={handleClick} />
            <div>
                <Button onClick={handleCheckClick} color="primary" variant={'contained'}>Check</Button>
            </div>
        </div>
    );
};
