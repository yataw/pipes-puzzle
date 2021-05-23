import {Reducer} from 'store';
import {
    SET_LEVEL_REQUEST,
    SET_LEVEL_SUCCESS,
    SET_LEVEL_WAIT,
    SET_TITLE
} from 'actions/action-types';

type PageState = {
    title: string;
    level: Level;
    levelSwitching: boolean;
};

const initialState: PageState = {
    title: '@yataw | Pipes puzzle',
    level: 1,
    levelSwitching: false,
};

export const page: Reducer<PageState> = (state = initialState, action) => {
    switch (action.type) {
        case SET_TITLE:
            return {...state, title: action.payload};
        case SET_LEVEL_REQUEST:
            return state;
        case SET_LEVEL_WAIT:
            return {...state, levelSwitching: true};
        case SET_LEVEL_SUCCESS:
            return {...state, levelSwitching: false, level: action.payload};
        default:
            return state;
    }
};
