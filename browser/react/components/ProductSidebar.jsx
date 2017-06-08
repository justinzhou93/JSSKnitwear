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
  let selectedStyle = function(color){
    return {
      width: '50px',
      height: '50px',
      backgroundColor: color.code,
      border: `3px solid #BBB`
    }
  }
  let subtractStyle = function(){
    if (props.quantity <= 1){
      return {
        backgroundColor: '#e9e9e9'
      }
    }
  }
  return (
    <div className="ProductSidebar">
      <div className="ProductDescription">
        <h2>{props.currentProduct.title}</h2>
        <p>{props.currentProduct.description}</p>
      </div>
      <div className="ProductSelection">
        <div className="productQuantity">
          <button style={subtractStyle()} onClick={props.subtractQuantity}><p>—</p></button>
          <h5>Quantity</h5>
          <h5> — </h5>
          <h5>{props.quantity}</h5>
          <button onClick={props.addQuantity}><p>+</p></button>
        </div>
        <table type="button" className="addCartButton">
          <tr>
            <td>${(props.extra) ? props.currentProduct.price * 1.5 : props.currentProduct.price}</td>
            <td><div /></td>
            <td onClick={props.addToCartOnClick}>Add to Cart</td>
          </tr>
        </table>
        <div className="colorPalette">
          <div>
            <h4>Color</h4>
            <h4>{(props.selectedColor.name) ? props.selectedColor.name.toUpperCase() : ''}</h4>
          </div>
          {props.colorList && props.colorList.map((color) => {
            if (color === props.selectedColor){
              return (
                <div className="colorSample" key={color.id} onClick={() => props.colorSelect(color)} style={selectedStyle(color)} />
              )
            } else {
              return (
                <div className="colorSample" key={color.id} onClick={() => props.colorSelect(color)} style={style(color)} />
              );
            }
          })}
        </div>
        <div className="productSize">
          <h4>Sizes and Adjustments</h4>

          <div>
            <h5>Size</h5>
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
            <h5>Adjustments</h5>
            {
              props.adjustments && Object.keys(props.adjustments).filter(adjustment => {
                if (props.adjustments[adjustment] !== 'default'){
                  return adjustment;
                }
              }).map((adjustment) => {
                return (
                  <div key={adjustment}>
                    <div>
                      <div onClick={() => {props.removeAdjust(adjustment)}}>✖</div>
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
      </div>
    </div>

  )
}
