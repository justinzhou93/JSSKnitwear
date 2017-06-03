import React from 'react';

import ImageLegend from '../components/ImageLegend';
import ImageDisplay from '../components/ImageDisplay';

export default class ProductImagesContainer extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      selectedImg: this.props.images[0]
    }
    this.selectImage = this.selectImage.bind(this);
  }

  selectImage (image) {
    this.setState({selectedImg: image})
  }

  render () {
    return (
      <div className="ProductImagesContainer">
        <ImageLegend
          imageList={this.props.images}
          selectImage={this.selectImage}
          />
        <ImageDisplay
          image={this.state.selectedImg}
          inModal={this.props.inModal}
          handleMagnifyImages={this.props.handleMagnifyImages}
          />
      </div>
    )
  }
}
