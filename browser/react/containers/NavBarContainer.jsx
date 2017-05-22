import React from 'react';

import { connect } from 'react-redux';
import NavBar from '../components/NavBar';

/** Thunk actions */
import { logout } from '../action-creators/auth';
import { loadModal } from '../action-creators/modals';
import {removeCollection} from '../action-creators/products';

/** Modal Type Constant */
import { LOGIN_MODAL, SIGNUP_MODAL, CART_MODAL } from '../modals/modaltypes';

export class NavBarContainer extends React.Component {
    constructor(props) {
        super(props);

        this.showLoginMenu = this.showLoginMenu.bind(this);
        this.showSignupMenu = this.showSignupMenu.bind(this);
        this.showCart = this.showCart.bind(this);
    }

    showLoginMenu() {
        this.props.loadModal(LOGIN_MODAL);
    }

    showSignupMenu() {
        this.props.loadModal(SIGNUP_MODAL);
    }

    showCart() {
        this.props.loadModal(CART_MODAL);
    }

    render() {
        return (
            <NavBar
                showCart={this.showCart}
                showLoginMenu={this.showLoginMenu}
                showSignupMenu={this.showSignupMenu}
                loggingOut={this.props.loggingOut}
                currentUser={this.props.currentUser}
                removingCollection={this.props.removingCollection}
            />
        );
    }
}

const mapStateToProps = state => {
    return {
        currentUser: state.auth.currentUser,
        collection: state.collection.collection
    }
};

const mapDispatchToProps = dispatch => {
    return {
        loadModal: (modelType, payload) => dispatch(loadModal(modelType, payload)),
        loggingOut: () => dispatch(logout()),
        removingCollection: () => dispatch(removeCollection())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBarContainer);
