/** Constant */
import { SET_COLOR_LIST, SET_SINGLE_COLOR } from '../action-creators/colors';

/** Initial State */
const initialColorState = {
    colorList: [],
    currentColor: null
};

/** Colors reducer */
export default function (state = initialColorState, action) {
    const newState = Object.assign({}, state);

    switch (action.type) {

        case SET_COLOR_LIST:
            newState.colorList = action.colorList;
            break;

        case SET_SINGLE_COLOR:
            newState.currentColor = action.currentColor;
            break;

        default:
            return state;
    }

    return newState;
}
