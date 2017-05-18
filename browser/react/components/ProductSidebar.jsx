import React from 'react';

import Adjustment from './Adjustments';


export default function(props){
  let style = function(color){
    return {
      width: '50px',
      height: '50px',
      backgroundColor: color.code
    }
  }
  let QOptions = function(){
    let arr = [];
    for (let i = 1; i <= 25; i++){
      arr.push(
        <option key={`QOptions${i}`} value={i}>{i}</option>
      );
    }
    return arr;
  }
  return (
    <div>
      <div>
        <h2>{props.currentProduct.title}</h2>
        <p>{props.currentProduct.description}</p>
      </div>
      <div>
        <b style={{fontSize: '20px'}}>${props.currentProduct.price}</b>
        <div className="productQuantity">
          <h4>Quantity</h4>
          <select onChange={props.addQuantity}>
            {QOptions()}
          </select>
        </div>
        <div className="admin-products-list">
          {props.colorList && props.colorList.map((color) => {
            return (
              <div className="colorSample" key={color.id} onClick={() => props.colorSelect(color)} style={style(color)}><p>{color.name}</p></div>
            );
          })}
        </div>
        <div className="productSize">
          <h4>Sizes and Adjustments</h4>

          <div>
            <h4>Size</h4>
            <select name="size" onChange={props.addSize} >
              <option value="">Select Size</option>
              <option value="P">P</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
              <option value="1X">{'1X'}</option>
              <option value="2X">{'2X'}</option>
              <option value="3X">{'3X'}</option>
            </select>
          </div>

          <div>
            <h4>Adjustments</h4>
            {
              props.adjustments && Object.keys(props.adjustments).filter(adjustment => {
                if (props.adjustments[adjustment] !== 'default'){
                  return adjustment;
                }
              }).map((adjustment) => {
                return (
                  <div key={adjustment}>
                    <div>
                      <p>{adjustment} : {props.adjustments[adjustment]}</p>
                    </div>
                  </div>
                );
              })
            }
          </div>

          <Adjustment
            adjustments={props.adjustments}
            addAdjust={props.addAdjust}
          />

        </div>
        <button type="button" onClick={props.addToCartOnClick} className="btn btn-primary" style={{borderRadius: '4px'}}>Add to cart</button>
      </div>
    </div>

  )
}
