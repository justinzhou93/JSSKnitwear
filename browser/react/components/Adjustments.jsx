import React from 'react';

export default class Adjustment extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      adjustment: '',
      size: ''
    }

    this.adjSelect = this.adjSelect.bind(this);
    this.sizeSelect = this.sizeSelect.bind(this);
    this.sendSelections = this.sendSelections.bind(this);
  }

  adjSelect(evt) {
    evt.preventDefault();
    this.setState({adjustment: evt.target.value});
  }

  sizeSelect(evt) {
    evt.preventDefault();
    this.setState({size: evt.target.value});
  }

  sendSelections(evt){
    evt.preventDefault();
    this.props.addAdjust(this.state.adjustment, this.state.size);
  }

  render(){
    return (
      <div>
          <select name="size" form="adjustForm" onChange={this.adjSelect} >
            {
              this.props.adjustments && ['Select adjustment'].concat(Object.keys(this.props.adjustments).filter(adjustment => {
                if (this.props.adjustments[adjustment] === 'default'){
                  return adjustment;
                }
              })).map((adjustment) => {
                return (
                  <option key={adjustment} value={adjustment}>{adjustment}</option>
                );
              })
            }
          </select>

          <select name="size" form="adjustForm" onChange={this.sizeSelect} >
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

          <button type="submit" className="btn btn-default" onClick={this.sendSelections} style={{borderRadius: '4px'}}>Add Adjustment</button>

      </div>
    )
  }
}
