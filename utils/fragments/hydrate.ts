import {PuzzleFieldRaw} from 'api/puzzle/types';
import {fragmentInfo} from 'utils/fragments/fragmentInfo';
import {cloneDeep} from 'lodash';

export const hydrate = (field: PuzzleFieldRaw): PuzzleField => {
    return field.map(row => row.map(el => {
        const view = fragmentInfo[el as Fragment]?.view;

        if (!view) {
            throw new Error('Error in puzzle map hydration. Unexpected fragment');
        }

        return cloneDeep(view);
    }));
};
