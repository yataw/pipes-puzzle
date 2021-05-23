import {Reducer} from 'store';
import {SCAN_REQUEST, SCAN_WAIT, SCAN_SUCCESS} from 'actions/action-types';
import {PuzzleFieldRaw} from 'api/puzzle/types';

type ExploreState = {
    scanning: boolean;
    snapshots: PuzzleFieldRaw[][][];
};

const initialState: ExploreState = {
    scanning: false,
    snapshots: [],
};

export const explore: Reducer<ExploreState> = (state = initialState, action) => {
    switch (action.type) {
        case SCAN_REQUEST:
            return state;
        case SCAN_WAIT:
            return {...state, scanning: true}
        case SCAN_SUCCESS:
            return {...state, scanning: false, snapshots: action.payload};
        default:
            return state;
    }
};
