import {SCAN_REQUEST, SCAN_WAIT, SCAN_SUCCESS} from './action-types';
import {PuzzleField} from 'api/puzzle/types';
import {Thunk} from 'store/index';
import {scanMap} from 'api/puzzle/utils';

export const scanRequest = () => ({type: SCAN_REQUEST});
export const scanWait = () => ({type: SCAN_WAIT});
export const scanSuccess = (payload: PuzzleField[][][]) => ({type: SCAN_SUCCESS, payload});

export const scan = (): Thunk<void> => async (dispatch, _, {puzzleApi}) => {
    dispatch(scanRequest());
    dispatch(scanWait());

    const snapshots = await scanMap(puzzleApi)();

    dispatch(scanSuccess(snapshots));
}

declare module 'store' {
    interface Actions {
        ScanRequest: ReturnType<typeof scanRequest>;
        ScanWait: ReturnType<typeof scanWait>;
        ScanSuccess: ReturnType<typeof scanSuccess>;
    }
}