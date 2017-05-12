import React from 'react';

export default function (props) {
  console.log(props);
    let style = function(color){
      return {
        width: '100px',
        height: '100px',
        backgroundColor: color.code
      }
    }
    return (
        <div className="flex-container">
            <div className="admin-products-header">
                <h2 className="my-account-text">Current Colors List</h2>
                <a onClick={props.showAddColorModal} className="admin-add-color">Add Color</a>
            </div>
            <div className="admin-products-list">
                {props.colorList && props.colorList.map((color) => {
                    return (
                      <div key={color.id}>
                        <h4>{color.name}</h4>
                        <h4>{color.code}</h4>
                        <div className="colorSample" style={style(color)}></div>
                      </div>
                    );
                })}
            </div>
        </div>
    );
}
