import React from 'react';
import { Link } from 'react-router';

const renderLineItems = function (order) {
  return (
    <div>
      {
        order.lineitems.map((item) => {
          return (
            <div key={item.id}className="cart-items-box">
                <div className="cart-product-img-box">
                    <img src={item.product.imgUrl} className="admin-product-img" />
                </div>
                <div className="admin-product-title" style={{width: '20%'}}>
                    <h4 style={{fontWeight: 'bold', marginBottom: '0'}}>{item.product.title}</h4>
                </div>
                <div className="cart-product-price">
                    <h4 style={{fontWeight: 'bold', marginBottom: '0'}}>Price</h4><br />
                        ${item.price}
                </div>
                <div>
                  <h4>{item.color.name}</h4>
                  <h4>{item.size.main}</h4>
                  <table>
                    <tr>
                      <th>Adjustments</th>
                      <th>Size</th>
                    </tr>
                    {Object.keys(item.size).map(adjKey => {
                      if (adjKey !== 'main'){
                        return (
                          <tr>
                            <th>{adjKey}</th>
                            <th>{item.size[adjKey]}</th>
                          </tr>
                        );
                      }
                    })}
                  </table>
                </div>
            </div>
          );
        })
      }
    </div>
  )
}

export default function (props) {
  return (
    <div className="user-profile-items" style={{flexDirection: 'column', alignItems: 'center'}}>
      <div className="order-items">
        <div className="profile-header">
            <h3 className="profile-item-header" style={{width: '33%'}}>Order #{props.order.id}</h3>
            <text style={{width: '33%', marginBottom: '10px'}}>Order status: Processing</text>
            <a onClick={props.handleViewItemsClick} className="header-link-text" style={{width: '33%'}}>View ordered items</a>
        </div>
          {props.viewItemsOpen ? renderLineItems(props.order) : null}
      </div>
      <div className="cart-total-box">
          <div className="cart-total">
              <b>Total amount paid: </b>
          </div>
          <text className="cart-total">${props.order.lineitems.reduce((accum, lineitem) => accum + +lineitem.price, 0)}</text>
      </div>
    </div>
  )
}
