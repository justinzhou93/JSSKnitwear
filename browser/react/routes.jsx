import React from 'react';
import {Router, Route, IndexRedirect, browserHistory} from 'react-router';
import { connect } from 'react-redux';

/* -----------------   IMPORTED COMPONENTS   ------------------ */

import App from './components/App';
import AllOrdersContainer from './containers/AllOrdersContainer';
import AllProductsContainer from './containers/AllProductsContainer';
// import OrderConfirmationContainer from './containers/OrderConfirmationContainer';
import SingleProductContainer from './containers/SingleProductContainer';
import UserProfileContainer from './containers/UserProfileContainer';
import HomeComponent from './components/HomeComponent';
import Login from './components/Login';
import Signup from './components/Signup';
import AdminColorsContainer from './containers/AdminColorsContainer';

import AddAddressContainer from './containers/AddAddressContainer';
import OrderConfirmation from './components/OrderConfirmation';
import CartCheckOutContainer from './containers/CartCheckOutContainer';

import {loadAllProducts, loadSingleProduct} from './action-creators/products';
import {loadSingleOrder, loadAllOrders} from './action-creators/orders';
import {loadAllColors} from './action-creators/colors'
import { loadLoggedInUser } from './action-creators/auth';

/* -----------------     COMPONENT ROUTES     ------------------ */

export function Root ({fetchProducts, fetchSingleProduct, fetchAllOrders, fetchCurrentUser, fetchAllColors}) {
  //on enter hook for products container, fetch all colors, so that when selecting single product, all colors are already there
  //but don't want this on enter hook on single product so we don't have to load every single time.
  return (
    <Router history={browserHistory} >
      <Route path="/" component={App} onEnter={fetchProducts}>
        <IndexRedirect to="home" />
        <Route path="home" component={HomeComponent} />
        <Route path="products" component={AllProductsContainer} />
        <Route path="products/:productId" component={SingleProductContainer} onEnter={fetchSingleProduct} />
        <Route path="colors" component={AdminColorsContainer} onEnter={fetchAllColors} />

        <Route path="orders" component={AllOrdersContainer} onEnter={fetchAllOrders} />

        <Route path="user" component={UserProfileContainer} onEnter={fetchCurrentUser} />
        <Route path="address/add" component={AddAddressContainer} />
        <Route path="checkout" component={CartCheckOutContainer} />
        <Route path="orderconfirmation" component={OrderConfirmation} />
        <Route path="adminlogin" component={Login} />
        <Route path="adminsignup" component={Signup} />
      </Route>
    </Router>
  );
}

/* -----------------    CONTAINER/ONENTER HOOKS    ------------------ */

const mapDispatchToProps = dispatch => ({
  fetchCurrentUser: () => dispatch(loadLoggedInUser()),
  fetchProducts: () => dispatch(loadAllProducts()),
  fetchSingleProduct: nextRouterState => {
    dispatch(loadSingleProduct(nextRouterState.params.productId));
    dispatch(loadAllColors());
  },
  fetchSingleOrder: nextRouterState => dispatch(loadSingleOrder(nextRouterState.params.orderid)),
  fetchAllOrders: () => dispatch(loadAllOrders()),
  fetchAllColors: () => dispatch(loadAllColors())
});

export default connect(null, mapDispatchToProps)(Root);
