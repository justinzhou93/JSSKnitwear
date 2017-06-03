import React from 'react';

export default function(props){
  return (
    <div className="imageDisplay">
      {
        (props.image) ?
          <img src={props.image} onClick={() => {props.handleMagnifyImages(props.image)}} className="sing-product-img" />
        :
          <p>Image Loading</p>
      }
    </div>
  )
}
