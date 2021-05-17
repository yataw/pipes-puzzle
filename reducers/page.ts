import {Reducer} from 'store';
import {SET_TITLE} from 'actions/action-types';

type PageState = {
    title: string;
};

const initialState = {
    title: '@yataw | Pipes puzzle',
};

export const page: Reducer<PageState> = (state = initialState, action) => {
    switch (action.type) {
        case SET_TITLE:
            return {...state, title: action.payload};
        default:
            return state;
    }
};
