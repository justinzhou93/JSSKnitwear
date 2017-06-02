import React from 'react';

export default function(props){
  let style = function(){
    return {
      width: '75%',
      display: 'flex',
      margin: '12.5%'
    }
  }
  return (
    <div className="imageLegend">
      {
        (props.imageList.length) ? props.imageList.map((image, index) => {
          return (
            <div key={`imageLegend${index}`} onClick={() => {props.selectImage(image)}} className="sing-product-img-container">
              <img src={image} style={style()} className="sing-product-img" />
            </div>
          )
        })
        :
        <div>
          <p>Images Loading</p>
        </div>
      }
    </div>
  )
}
