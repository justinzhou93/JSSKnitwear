import React from 'react';

export default class AllProducts extends React.Component {
  constructor(props){
    super(props)

    this.setDay = this.setDay.bind(this);
    this.setEvening = this.setEvening.bind(this);
  }

  setDay(evt){
    evt.preventDefault();
    this.props.settingCollection('Day');
  }

  setEvening(evt){
    evt.preventDefault();
    this.props.settingCollection('Evening');
  }

  render(){
    if (this.props.collection === ''){
      return (
        <div className="collections">
          <div id="dayCollection" value="Day" onClick={this.setDay}>
            <h2>Day</h2>
            {this.props.productList && this.props.productList.filter(product => {if (product.collection === 'Day') return product}).slice(-1)
              .map(product => {
                return (<img key={product.id} src={product.images[0].path} />)
              })
            }
          </div>
          <div id="lightenFilter" />
          <div id="eveningCollection" value="Evening" onClick={this.setEvening}>
            <h2>Evening</h2>
            {this.props.productList && this.props.productList.filter(product => {if (product.collection === 'Evening') return product}).slice(-1)
              .map(product => {
                return (<img key={product.id} src={product.images[0].path} />)
              })
            }
          </div>
          <div id="darkenFilter" />
        </div>
      )
    }
    else if (!this.props.productList.length){
      return (
        <h3 style={{textAlign: 'center'}}>None found!</h3>
      );
    }
    return (
        <div className="flex-container">
            <div className="products-header">
                <h2><strong>{`${this.props.collection} Collection`}</strong></h2>
            </div>
            <div className="products-container">
                {this.props.productList.length && this.props.productList.filter((product) => {
                  if (product.collection === this.props.collection){
                    return product;
                  }
                }).map((product) => {
                    return (
                      <div key={product.id} className="products-items">
                        <a href={`/products/${product.id}`}>
                          <div className="product-image-box">
                              <img src={product.images[0].path} className="product-img" alt="image" />
                          </div>
                          <div className="product-title">
                              <h4>{product.title}</h4>
                          </div>
                          {//NOTE: Price and Add to Cart here

                            /*<div className="product-price">
                              <p>${product.price}</p>
                          </div>
                          <div className="product-price">
                              <button className="btn btn-primary" style={{borderRadius: '4px', padding: '2px 3px 2px 3px', fontSize: '15px'}} onClick={() => {this.props.addingToCart(this.props.currentUser.id, product.id, {quantity: 1, price: product.price})}}>Add to cart</button>
                          </div>*/}
                        </a>
                      </div>
                    )
                })}
            </div>
        </div>
    );
  }
}
