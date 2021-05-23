import {createStore, compose, combineReducers, applyMiddleware} from 'redux';
import {MakeStore, createWrapper, Context, HYDRATE} from 'next-redux-wrapper';
import {reducers} from 'reducers';
import thunk, {ThunkAction} from 'redux-thunk';
import {AppContextType} from 'components/AppContext';

declare module 'store' {
    interface Actions {}
}

// TODO : @yataw : 5/15/21 : remove to global types file
declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: Function;
    }
}

export type Action = ValueOf<Actions>;
export type Reducer<S = State, A = Action> = (state: S | undefined, action: A) => S;
export type State = ReturnType<typeof reducer>;
export type Thunk<R, S = State> = ThunkAction<R, S, AppContextType, Action>;

export const reducer = combineReducers(reducers);

type HydrateActionType = {
    type: typeof HYDRATE;
    payload: any;
};
const rootReducer = (state: State | undefined, action: Action | HydrateActionType): State => {
    switch (action.type) {
        case HYDRATE:
            // TODO : @yataw : 5/15/21 : overwrite client state is overwritten here
            //  persist storage would be broken here
            return {...state, ...action.payload};
        default:
            return reducer(state, action);
    }
};

const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && process.env.NODE_ENV !== 'production'
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        : compose;

export const getStoreWrapper = (ctx: AppContextType) => {
    const makeStore: MakeStore<State> = (_: Context) => createStore(rootReducer, composeEnhancers(applyMiddleware(thunk.withExtraArgument(ctx))));

    return createWrapper<State>(makeStore);
}