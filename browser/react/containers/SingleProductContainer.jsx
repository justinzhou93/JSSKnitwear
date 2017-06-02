import React from 'react';
import { connect } from 'react-redux';

import { addCartItem } from '../action-creators/users';

import { loadModal } from '../action-creators/modals';

import { ADD_REVIEW_MODAL, SHOW_IMAGES_MODAL } from '../modals/modaltypes';
import SingleProduct from '../components/SingleProduct';

export class SingleProductContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          selectedColor: {},
          quantity: 1,
          size: '',
          adjustments: {
            shoulder: 'default',
            waist: 'default',
            bust: 'default',
            hip: 'default',
            sleeve: 'default',
            armCircum: 'default',
            jacketLength: 'default'
          }
        }

        this.colorSelect = this.colorSelect.bind(this);
        this.addQuantity = this.addQuantity.bind(this);
        this.subtractQuantity = this.subtractQuantity.bind(this);
        this.addToCartOnClick = this.addToCartOnClick.bind(this);
        this.handleAddReviewOnClick = this.handleAddReviewOnClick.bind(this);
        this.addAdjust = this.addAdjust.bind(this);
        this.removeAdjust = this.removeAdjust.bind(this);
        this.addSize = this.addSize.bind(this);
        this.handleMagnifyImages = this.handleMagnifyImages.bind(this);
    }

    addToCartOnClick(evt) {
        evt.preventDefault();
        this.props.addingToCart(this.props.currentUser.id, this.props.currentProduct.id, {quantity: this.state.quantity, price: this.props.currentProduct.price, color: this.state.selectedColor, size: this.state.size, adjustments: this.state.adjustments})
    }

    handleAddReviewOnClick(evt) {
        evt.preventDefault();
        this.props.loadModal(ADD_REVIEW_MODAL, {currentProduct: this.props.currentProduct, currentUser: this.props.currentUser});
    }

    handleMagnifyImages(img){
        this.props.loadModal(SHOW_IMAGES_MODAL, {currentProduct: this.props.currentProduct, image: img});
    }

    addQuantity(event){
        event.preventDefault();
        var newquantity = this.state.quantity + 1;
        this.setState({quantity: newquantity});
    }

    subtractQuantity(event){
        event.preventDefault();
        var newquantity = this.state.quantity - 1;
        if (this.state.quantity > 1){
          this.setState({quantity: newquantity});
        }
    }

    colorSelect(color){
        this.setState({selectedColor: color});
    }

    addSize(evt){
        evt.preventDefault();
        this.setState({size: evt.target.value});
    }

    addAdjust(adj, size){
        let newState = {};
        newState[adj] = size;
        if (Object.keys(this.state.adjustments).includes(adj)){
          this.setState({
            adjustments: Object.assign({}, this.state.adjustments, newState)
          })
        }
    }

    removeAdjust(adj){
        let newState = {};
        newState[adj] = 'default';
        this.setState({
          adjustments: Object.assign({}, this.state.adjustments, newState)
        })
    }

    render() {
        return (
            <SingleProduct
                currentProduct={this.props.currentProduct}
                addToCartOnClick={this.addToCartOnClick}
                handleAddReviewOnClick={this.handleAddReviewOnClick}
                colorList={this.props.colorList}
                colorSelect={this.colorSelect}
                selectedColor={this.state.selectedColor}
                addQuantity={this.addQuantity}
                subtractQuantity={this.subtractQuantity}
                quantity={this.state.quantity}
                addAdjust={this.addAdjust}
                removeAdjust={this.removeAdjust}
                adjustments={this.state.adjustments}
                addSize={this.addSize}
                handleMagnifyImages={this.handleMagnifyImages}
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
