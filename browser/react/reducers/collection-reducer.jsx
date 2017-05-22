/** Constant */
import { SET_COLLECTION, REMOVE_COLLECTION } from '../action-creators/products';

/** Initial State */
const initialProductState = {
    collection: ''
};

/** Products reducer */
export default function (state = initialProductState, action) {
    const newState = Object.assign({}, state);

    switch (action.type) {

        case SET_COLLECTION:
            newState.collection = action.collection;
            break;

        case REMOVE_COLLECTION:
            newState.collection = '';
            break;

        default:
            return state;
    }

    return newState;
}
