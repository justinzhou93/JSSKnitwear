import React from 'react';
import { connect } from 'react-redux';

import { addCartItem } from '../action-creators/users';

import { loadModal } from '../action-creators/modals';

import { ADD_REVIEW_MODAL } from '../modals/modaltypes';
import SingleProduct from '../components/SingleProduct';

export class SingleProductContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          selectedColor: {},
          quantity: 1,
          size: 'M',
          adjustments: {
            shoulder: '',
            waist: '',
            bust: '',
            hip: '',
            sleeve: '',
            armCircum: '',
            jacketLength: ''
          }
        }

        this.colorSelect = this.colorSelect.bind(this);
        this.addQuantity = this.addQuantity.bind(this);
        this.addToCartOnClick = this.addToCartOnClick.bind(this);
        this.handleAddReviewOnClick = this.handleAddReviewOnClick.bind(this);
    }

    addToCartOnClick(evt) {
        evt.preventDefault();
        console.log(this.state);
        this.props.addingToCart(this.props.currentUser.id, this.props.currentProduct.id, {quantity: this.state.quantity, price: this.props.currentProduct.price, color: this.state.selectedColor})
    }

    handleAddReviewOnClick(evt) {
        evt.preventDefault();
        this.props.loadModal(ADD_REVIEW_MODAL, {currentProduct: this.props.currentProduct, currentUser: this.props.currentUser})
    }

    addQuantity(event){
        event.preventDefault();
        console.log(event.target.value);
        this.setState({selectedColor: this.state.selectedColor, quantity: event.target.value})
    }

    colorSelect(color){
        this.setState({selectedColor: color, quantity: this.state.quantity});
    }

    render() {
        return (
            <SingleProduct
                currentProduct={this.props.currentProduct}
                addToCartOnClick={this.addToCartOnClick}
                handleAddReviewOnClick={this.handleAddReviewOnClick}
                colorList={this.props.colorList}
                colorSelect={this.colorSelect}
                addQuantity={this.addQuantity}
            />
        )
    }
}

const mapStateToProps = state => ({
    currentProduct: state.products.currentProduct,
    currentUser: state.auth.currentUser,
    colorList: state.colors.colorList
});

const mapDispatchToProps = dispatch => {
    return {
        loadModal: (modelType, payload) => dispatch(loadModal(modelType, payload)),
        addingToCart: (userId, productId, productInfo) => dispatch(addCartItem(userId, productId, productInfo))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleProductContainer);
