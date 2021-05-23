import {inRange} from 'lodash';
import {MAX_LEVEL, MIN_LEVEL} from 'globals/globals';

export const isValidLevel = (level: any): level is Level => {
    return inRange(level, MIN_LEVEL, MAX_LEVEL + 1);
};
