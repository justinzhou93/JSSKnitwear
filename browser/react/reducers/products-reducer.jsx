/** Constant */
import { SET_PRODUCT_LIST, SET_SINGLE_PRODUCT, REMOVE_SINGLE_PRODUCT } from '../action-creators/products';

/** Initial State */
const initialProductState = {
    productList: [],
    currentProduct: null,
    // collection: ''
};

/** Products reducer */
export default function (state = initialProductState, action) {
    const newState = Object.assign({}, state);

    switch (action.type) {

        case SET_PRODUCT_LIST:
            newState.productList = action.productList;
            break;

        case SET_SINGLE_PRODUCT:
            newState.currentProduct = action.currentProduct;
            break;

        case REMOVE_SINGLE_PRODUCT:
            newState.currentProduct = {};
            break;

        // case SET_COLLECTION:
        //     newState.collection = action.collection;
        //     break;
        //
        // case REMOVE_COLLECTION:
        //     newState.collection = '';
        //     break;

        default:
            return state;
    }

    return newState;
}
