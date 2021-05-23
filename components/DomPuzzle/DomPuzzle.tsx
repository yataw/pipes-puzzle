import React, {CSSProperties, FC} from 'react';
import styles from './DomPuzzle.module.scss';
import {inRange, isEqual} from 'lodash';

export type DataSet = {
    elements: string[][];
    focusOn?: [number, number];
    highlightFocusArea?: boolean;
    palette?: {
        focus: string;
        focusBorder: string;
        focusAreaBorder: string;
    };
};

type Props = {
    dataSet: DataSet | NonEmptyArray<DataSet>;
};

const defaultProps: Omit<Required<DataSet>, 'elements' | 'focusOn'> = {
    highlightFocusArea: true,
    palette: {
        focus: 'rgb(76, 175, 80)',
        focusBorder: 'rgb(120,182,123)',
        focusAreaBorder: 'rgb(141,194,236)',
    },
};

/**
 * returns object with keys `y x`, if elements[y][x] is adjacent to focus element
 */
const getArea = ({focus, maxY, maxX}: {focus: [number, number], maxY: number, maxX: number}) => {
    const area: Record<string, boolean> = {};
    const [y, x] = focus;

    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            const [y2, x2] = [y + i, x + j];
            if (inRange(y2, maxY) && inRange(x2, maxX)) {
                area[`${y2} ${x2}`] = true;
            }
        }
    }

    return area;
};

const getElementStyle = (
    {pos: [y, x], focusOn, highlightFocusArea, area, palette}: {
        pos: [number, number];
        focusOn?: [number, number];
        highlightFocusArea: boolean;
        area: ReturnType<typeof getArea>;
        palette: DataSet['palette']
    }): CSSProperties => {
    const style: CSSProperties = {};

    if (isEqual([y, x], focusOn)) {
        style.color = palette?.focus;
        style.borderColor = palette?.focusBorder;
    } else if (highlightFocusArea && area[`${y} ${x}`]) {
        style.borderColor = palette?.focusAreaBorder;
    }

    return style;
};

export const DomPuzzle: FC<Props> = ({dataSet}) => {
    const dataSets = Array.isArray(dataSet) ? dataSet : [dataSet];

    return (
        <div className={styles.root}>
            <div className={styles.puzzle}>
                {
                    dataSets.map((set, setN) => {
                        const {elements, focusOn, highlightFocusArea, palette} = {...defaultProps, ...set};
                        const area = focusOn ? getArea({
                            focus: focusOn,
                            maxY: elements.length,
                            maxX: elements[0].length,
                        }) : {};

                        return (
                            <div className={styles.cont} key={setN}>
                                {
                                    elements.map((row, y) => (
                                        <div className={styles.contRow} key={y}>
                                            {
                                                row.map((elem, x) => {
                                                    const style = getElementStyle({
                                                        pos: [y, x],
                                                        focusOn,
                                                        highlightFocusArea,
                                                        area,
                                                        palette,
                                                    });
                                                    return (
                                                        <div className={styles.contElem} style={style} key={x}>
                                                            {elem}
                                                        </div>);
                                                })
                                            }
                                        </div>
                                    ))
                                }
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
};