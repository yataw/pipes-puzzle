import {SET_TITLE, SET_LEVEL} from './action-types';

export const setTitle = (title: string) => ({type: SET_TITLE, payload: title});
export const setLevel = (level: Level) => ({type: SET_LEVEL, payload: level});

declare module 'store' {
    interface Actions {
        SetSTitle: ReturnType<typeof setTitle>;
        SetLevel: ReturnType<typeof setLevel>;
    }
}
