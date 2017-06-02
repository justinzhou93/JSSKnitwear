import React from 'react';
import { connect } from 'react-redux';

import { hideModal } from '../action-creators/modals';

import ImageLegend from '../components/ImageLegend';
import Modal from './Modal';

class AddReviewModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          selectedImg: this.props.currentImage
        }

        this.onClose = this.onClose.bind(this);
        this.selectImage = this.selectImage.bind(this);
    }

    onClose() {
        this.props.hideModal();
    }

    selectImage (image) {
      this.setState({selectedImg: image})
    }

    render() {
        return (
            <Modal onClose={this.onClose}>
                <div className="modal-lg ImgMag">
                    <div className="modal-content">
                        <ImageLegend
                          imageList={this.props.currentProduct.images}
                          selectImage={this.selectImage}
                        />
                      <div className="ImgMagDisplay">
                          {
                            (this.props.currentProduct) ?
                              <img src={this.state.selectedImg} className="sing-product-img" />
                            :
                              <p>Image Loading</p>
                          }
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }
}

const mapStateToProps = state => {
    return {
        currentProduct: state.modal.payload.currentProduct,
        currentImage: state.modal.payload.image
    }
};

const mapDispatchToProps = dispatch => {
    return {
        hideModal: () => dispatch(hideModal())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddReviewModal);
