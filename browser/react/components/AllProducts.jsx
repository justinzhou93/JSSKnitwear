import React from 'react';
import { Link } from 'react-router';

export default function (props) {
    if (!props.productList.length){
      return (
        <h3 style={{textAlign: 'center'}}>None found!</h3>
      );
    }
    return (
        <div className="flex-container">
            <div className="products-header">
                <h2><strong>All Products</strong></h2>
            </div>
            <div className="products-container">
                {props.productList.length && props.productList.map((product) => {
                    return (
                        <div key={product.id} className="products-items">
                            <div className="product-image-box">
                                <img src={product.imgUrl} className="product-img" alt="image" />
                            </div>
                            <div className="product-title">
                                <Link to={`/products/${product.id}`}>{product.title}</Link>
                            </div>
                            {//NOTE: Price and Add to Cart here

                              /*<div className="product-price">
                                <p>${product.price}</p>
                            </div>
                            <div className="product-price">
                                <button className="btn btn-primary" style={{borderRadius: '4px', padding: '2px 3px 2px 3px', fontSize: '15px'}} onClick={() => {props.addingToCart(props.currentUser.id, product.id, {quantity: 1, price: product.price})}}>Add to cart</button>
                            </div>*/}
                        </div>
                    )
                })}
            </div>
        </div>
    );
}
