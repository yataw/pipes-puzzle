import {Reducer} from 'store';
import {SET_LEVEL, SET_TITLE} from 'actions/action-types';

type PageState = {
    title: string;
    level: Level;
};

const initialState: PageState = {
    title: '@yataw | Pipes puzzle',
    level: 1,
};

export const page: Reducer<PageState> = (state = initialState, action) => {
    switch (action.type) {
        case SET_TITLE:
            return {...state, title: action.payload};
        case SET_LEVEL:
            return {...state, level: action.payload};
        default:
            return state;
    }
};
