import {
    SET_TITLE,
} from './action-types';

export const setTitle = (title: string) => ({type: SET_TITLE, payload: title});

declare module 'store' {
    interface Actions {
        SetSTitle: ReturnType<typeof setTitle>;
    }
}
