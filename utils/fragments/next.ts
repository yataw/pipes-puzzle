import {fragmentInfo} from 'utils/fragments/fragmentInfo';

export const next = (fragment: Fragment): Fragment => {
    return fragmentInfo[fragment].nextKey;
};
