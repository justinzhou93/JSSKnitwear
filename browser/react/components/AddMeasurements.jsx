import React from 'react';
import {connect} from 'react-redux';
import Adjustment from './Adjustments';

export class AddMeasurements extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          size: '',
          adjustments: {
            shoulder: 'default',
            waist: 'default',
            bust: 'default',
            hip: 'default',
            sleeve: 'default',
            armCircum: 'default',
            jacketLength: 'default'
          }
        }
        this.handleAddSize = this.handleAddSize.bind(this);
        this.addSize = this.addSize.bind(this);
        this.addAdjust = this.addAdjust.bind(this);
        this.removeAdjust = this.removeAdjust.bind(this);
    }

    handleAddSize(evt) {
        evt.preventDefault();
        const measurements = {
          main: this.state.size,
          shoulder: (this.state.adjustments.shoulder === 'default') ? null : this.state.adjustments.shoulder,
          waist: (this.state.adjustments.waist === 'default') ? null : this.state.adjustments.waist,
          bust: (this.state.adjustments.bust === 'default') ? null : this.state.adjustments.bust,
          hip: (this.state.adjustments.hip === 'default') ? null : this.state.adjustments.hip,
          sleeve: (this.state.adjustments.sleeve === 'default') ? null : this.state.adjustments.sleeve,
          armCircum: (this.state.adjustments.armCircum === 'default') ? null : this.state.adjustments.armCircum,
          jacketLength: (this.state.adjustments.jacketLength === 'default') ? null : this.state.adjustments.jacketLength
        }

        this.props.addingNewMeasurements(this.props.currentUser.id, measurements);
        this.props.handleSizesClick(evt);
        this.props.handleSizeFormClick(evt);
    }

    addSize(evt) {
        evt.preventDefault();
        this.setState({size: evt.target.value});
    }

    addAdjust(adj, size){
        let newState = {};
        newState[adj] = size;
        this.setState({
          adjustments: Object.assign({}, this.state.adjustments, newState)
        });
    }

    removeAdjust(adj){
        let newState = {};
        newState[adj] = 'default'
        this.setState({
          adjustments: Object.assign({}, this.state.adjustments, newState)
        });
    }

    render() {
        return (
          <div>
            <fieldset>
              <legend className="measurements-header">Add New Measurements</legend>
              <div>
                <h4>Size</h4>
                <select name="size" onChange={this.addSize} >
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
                  this.state.adjustments && Object.keys(this.state.adjustments).filter(adjustment => {
                    if (this.state.adjustments[adjustment] !== 'default'){
                      return adjustment;
                    }
                  }).map((adjustment) => {
                    return (
                      <div key={adjustment}>
                        <div>
                          <p>{adjustment} : {this.state.adjustments[adjustment]}</p>
                          <img
                            onClick={() => {this.removeAdjust(adjustment)}}
                            src="https://image.flaticon.com/icons/png/512/0/39.png"
                            style={{height: '20px', width: '20px'}}
                            />
                        </div>
                      </div>
                    );
                  })
                }
                <Adjustment
                  adjustments={this.state.adjustments}
                  addAdjust={this.addAdjust}
                />
              </div>
            </fieldset>
            <button onClick={this.handleAddSize}>Add New Measurement</button>
          </div>
        );
    }
}

/** -------- ADD MEASUREMENTS CONTAINER ---------------- */

const mapStateToProps = (state, ownProps) => {
    return {
        currentUser: ownProps.currentUser
    }
}

export default connect(mapStateToProps, null)(AddMeasurements);
