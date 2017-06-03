import React from 'react';
import { Link } from 'react-router';

import { DELETE_WARNING_MODAL, EDIT_PRODUCT_MODAL } from '../modals/modaltypes';

export default class AdminSingleProduct extends React.Component {
    constructor(props) {
        super(props);

        this.showDeleteWarningOnClick = this.showDeleteWarningOnClick.bind(this);
        this.showEditProductOnClick = this.showEditProductOnClick.bind(this);
    }

    showDeleteWarningOnClick() {
        this.props.loadModal(DELETE_WARNING_MODAL, this.props.product);
    }

    showEditProductOnClick() {
        this.props.loadModal(EDIT_PRODUCT_MODAL, this.props.product);
    }

    render() {
        return (
            <div key={this.props.product.id}className="products-items">
                <div className="product-image-box">
                    <img src={this.props.product.images[0].path} className="product-img" />
                </div>
                <div className="product-title">
                    <Link to={`/products/${this.props.product.id}`} style={{fontWeight: 'bold', marginBottom: '0'}}>{this.props.product.title}
                    </Link>
                </div>
                <div className="product-title">
                    <h4 style={{fontWeight: 'bold', marginBottom: '0'}}>Product Description</h4>
                    {this.props.product.description}
                </div>
                <div className="product-title">
                    <h4 style={{fontWeight: 'bold', marginBottom: '0'}}>Price</h4><br />
                        ${this.props.product.price}
                </div>
                <div className="product-title">
                    <h4 style={{fontWeight: 'bold', marginBottom: '0'}}>Collection</h4><br />
                        {this.props.product.collection}
                </div>
                <div className="admin-links">
                    <a onClick={this.showEditProductOnClick} className="admin-remove-link">Edit</a><br />
                    <a onClick={this.showDeleteWarningOnClick} className="admin-remove-link">Remove</a>
                </div>
            </div>
        )
    }
}
