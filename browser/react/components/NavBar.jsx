import React from 'react';
import { Link } from 'react-router';

import { CART_MODAL } from '../modals/modaltypes';


export default class NavBar extends React.Component {
    constructor(props) {
        super(props);
        // this.renderLoginSignup = this.renderLoginSignup.bind(this);
        // this.renderLogout = this.renderLogout.bind(this);
        this.resetCollection = this.resetCollection.bind(this);
    }

    resetCollection(evt){
      evt.preventDefault();
      this.props.removingCollection();
      localStorage.setItem('collection', '');
    }

    render() {
        return (
            <div className="banner">
                <div className="logo">
                    <h1 onClick={this.resetCollection}><Link to="/" >JSS Knitwear</Link></h1>
                </div>
                <div className="menu">
                    <ul className="megamenu skyblue">
                        <li onClick={this.resetCollection}><Link to={'/products'} className="color2">Products</Link></li>
                        {/*this.props.currentUser ? this.renderLogout() : this.renderLoginSignup()*/}
                        <li onClick={this.props.showAbout}><Link>About</Link></li>
                        <li onClick={this.props.showContact}><Link>Contact</Link></li>
                    </ul>
                </div>
                {/*<ul className="megamenu skyblue cart-link">
                    <li><a onClick={this.props.showCart} className="color2">Cart</a></li>
                </ul>*/}

            </div>
        );
    }


    // NOTE: NOT USED BECAUSE NOT CORRECT VERSION — login with buy
    // renderLogout() {
    //     return (
    //         <div className="megamenu skyblue">
    //             <li><Link to={'/orders'} className="color4">Orders</Link></li>
    //             <li><Link to={'/user'} className="color4">My Account</Link></li>
    //             <li><a className="color4" onClick={this.props.loggingOut}>Logout</a></li>
    //         </div>
    //     );
    // }

    // NOTE: NOT USED BECAUSE NOT CORRECT VERSION — login with buy
    // renderLoginSignup() {
    //     return (
    //         <div className="megamenu skyblue">
    //             <li><a onClick={this.props.showSignupMenu} className="color4">Sign Up</a></li>
    //             <li><a onClick={this.props.showLoginMenu} className="color4">Login</a></li>
    //         </div>
    //     );
    // }
}
