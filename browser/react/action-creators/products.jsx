import axios from 'axios';
import {browserHistory} from 'react-router';
import {loadLoggedInUser} from './auth';

/** Constants */
export const SET_PRODUCT_LIST = 'SET_PRODUCT_LIST';
export const SET_SINGLE_PRODUCT = 'SET_SINGLE_PRODUCT';
export const REMOVE_SINGLE_PRODUCT = 'REMOVE_SINGLE_PRODUCT';
export const SET_COLLECTION = 'SET_COLLECTION';
export const REMOVE_COLLECTION = 'REMOVE_COLLECTION';

/** Action-creators */
const settingProductList = (products) => {
    return {
        type: SET_PRODUCT_LIST,
        productList: products
    }
}

const setSingleProduct = (product) => {
    return {
        type: SET_SINGLE_PRODUCT,
        currentProduct: product
    }
}

const settingCollection = (collection) => {
  return {
      type: SET_COLLECTION,
      collection: collection
  }
}

const removingCollection = () => {
  return {
    type: REMOVE_COLLECTION,
    collection: ''
  }
}

/** Thunk actions */

// collections
export const setCollection = (collection) => {
    return dispatch => dispatch(settingCollection(collection));
};

export const removeCollection = () => {
    return dispatch => dispatch(removingCollection());
};

// load all products
export const loadAllProducts = () => {
    return dispatch => {
        axios.get('/api/products')
            .then(res => res.data)
            .then(products => {
              return products.map(product => {
                var convertedImages = product.images.map(image => {
                  var binary = '';
                  var bytes = new Uint8Array( image.path.data );
                  for (var i = 0; i < bytes.byteLength; i++) {
                      binary += String.fromCharCode( bytes[ i ] );
                  }
                  return {
                    id: image.id,
                    path: 'data:image/jpeg;base64,' + window.btoa( binary )
                  }
                })
                product.images = convertedImages;
                return product;
              })
            })
            .then(products => dispatch(settingProductList(products)))
            // .then(() => dispatch(loadLoggedInUser()));
    };
};

// loads single product
export const loadSingleProduct = (productId) => {
    return dispatch => {
        axios.get(`/api/products/${productId}`)
            .then(res => res.data)
            .then(product => {
              var convertedImages = product.images.map(image => {
                var binary = '';
                var bytes = new Uint8Array( image.path.data );
                for (var i = 0; i < bytes.byteLength; i++) {
                    binary += String.fromCharCode( bytes[ i ] );
                }
                return 'data:image/jpeg;base64,' + window.btoa( binary );
              })
              product.images = convertedImages;
              return product;
            })
            .then(product => dispatch(setSingleProduct(product)));
    };
};

// add review to product review
export const addProductReview = (productId, reviewData) => {
    return dispatch => {
        axios.post(`/api/products/${productId}/reviews`, reviewData)
            .then(() => {
                dispatch(loadSingleProduct(productId));
                dispatch(loadLoggedInUser());
            })
    };
};

/** ADMIN thunks */
export const addProduct = (productInfo) => {
    return dispatch => {
        axios.post('/api/products', productInfo)
            .then(() => {
                dispatch(loadAllProducts());
                browserHistory.push('/products');
            })
    };
};

export const editProduct = (productId, productInfo) => {
    return dispatch => {
        axios.put(`/api/products/${productId}`, productInfo)
            .then(() => {
                dispatch(loadAllProducts());
                browserHistory.push('/products');
            })
    };
};

export const deleteProduct = (productId) => {
    return dispatch => {
        axios.delete(`/api/products/${productId}`)
            .then(() => {
                dispatch(loadAllProducts());
                browserHistory.push('/products');
            })
    };
};

export const deleteImage = (productId, imageId) => {
    return () => {
        axios.delete(`/api/products/${productId}/images/${imageId}`)
    }
}
