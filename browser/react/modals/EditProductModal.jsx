import React from 'react';
import { connect } from 'react-redux';

import { hideModal } from '../action-creators/modals';
import { editProduct, deleteImage } from '../action-creators/products';

import Modal from './Modal';

class EditProductModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          collection: this.props.currentProduct.collection,
          images: this.props.currentProduct.images,
          newImages: [],
          currentImage: ''
        };

        this.onClose = this.onClose.bind(this);
        this.editProductSubmit = this.editProductSubmit.bind(this);
        this.setCollection = this.setCollection.bind(this);
        this.encodeImageFileAsURL = this.encodeImageFileAsURL.bind(this);
        this.removeImage = this.removeImage.bind(this);
        this.setCurrentImage = this.setCurrentImage.bind(this);
    }

    onClose() {
        this.props.hideModal();
    }

    removeImage(index) {
      this.props.deletingImage(this.props.currentProduct.id, this.state.images[index].id)
      this.setState({
        images: this.state.images.slice(0, index).concat(this.state.images.slice(index + 1, this.state.images.length))
      })
    }

    setCollection(evt){
      evt.preventDefault();
      this.setState({
        collection: evt.target.value
      })
    }

    setCurrentImage(evt){
      evt.preventDefault();
      this.setState({currentImage: evt.target.value});
    }

    encodeImageFileAsURL(evt){
      evt.preventDefault();
      let StateImages = this.state.images;
      let newStateImages = this.state.newImages;
      StateImages.push({path: this.state.currentImage.replace('www.dropbox.com', 'dl.dropboxusercontent.com')});
      newStateImages.push(this.state.currentImage.replace('www.dropbox.com', 'dl.dropboxusercontent.com'));
      this.setState({images: StateImages, newImages: newStateImages});
    }

    editProductSubmit(evt) {
        evt.preventDefault();
        const updatedInfo = {
          title: evt.target.title.value,
          description: evt.target.description.value,
          price: evt.target.price.value,
          tags: evt.target.tag.value,
          collection: this.state.collection,
          images: this.state.newImages
        }
        this.props.editingProduct(this.props.currentProduct.id, updatedInfo);
        this.props.hideModal();
    }

    render() {
       const product = this.props.currentProduct;
       return (
          <Modal onClose={this.onClose}>
            <div className="modal-lg">
              <div className="modal-content">

                <div className="modal-header">
                  <h4 className="modal-title" style={{fontWeight: 'bold'}}>UPDATE CURRENT PRODUCT</h4>
                </div>

                <div className="modal-body">
                  <form onSubmit={this.editProductSubmit} role="form">
                    <div className="form-group">
                      <div className="input-group">
                        <input type="text" name="title" className="form-control" id="uLogin" placeholder="Enter product title..." defaultValue={product.title} />
                        <label htmlFor="uLogin" className="input-group-addon glyphicon glyphicon-info-sign" />
                      </div>
                    </div>

                    <div className="form-group">
                      <div className="input-group">
                        <textarea type="text" name="description" className="form-control" id="desc" rows="7" placeholder="Enter product description..." defaultValue={product.description} />
                        <label htmlFor="desc" className="input-group-addon glyphicon glyphicon-info-sign" />
                      </div>
                    </div>

                    <div className="form-group">
                      <div className="input-group">
                        <input type="text" name="price" className="form-control" id="price" placeholder="Enter product price..." defaultValue={product.price} onClick={() => {console.log(this.state);}} />
                        <label htmlFor="price" className="input-group-addon glyphicon glyphicon-usd" />
                      </div>
                    </div>

                    <div className="form-group">
                      <div className="input-group">
                        <input type="text" name="tag" className="form-control" id="tag" placeholder="Enter tags separated by commas..." />
                        <label htmlFor="tag" className="input-group-addon glyphicon glyphicon-usd" />
                      </div>
                    </div>

                    <div className="form-group">
                      <div className="input-group">
                        <select onChange={this.setCollection} defaultValue={this.state.collection}>
                          <option value="Day">Day</option>
                          <option value="Evening">Evening</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-group">
                      <div className="input-group">
                        <input type="text" name="image" className="form-control" placeholder="Enter Image URLs" onChange={this.setCurrentImage} />
                        <button onClick={this.encodeImageFileAsURL}>Add Image</button>
                      </div>
                      {
                        this.state.images.map((image, index) => {
                          return (
                            <img src={image.path} key={`addedImage${index}`} onClick={() => {this.removeImage(index)}} />
                          )
                        })
                      }
                    </div>

                    <div className="modal-footer">
                      <button type="submit" className="btn btn-default">Update Product</button>
                    </div>

                  </form>
                </div>
              </div>
            </div>
          </Modal>
        );
    }
}

const mapStateToProps = state => {
    return {
        currentProduct: state.modal.payload
    }
};

const mapDispatchToProps = dispatch => {
    return {
        hideModal: () => dispatch(hideModal()),
        editingProduct: (productId, productInfo) => (dispatch(editProduct(productId, productInfo))),
        deletingImage: (productId, imageId) => (dispatch(deleteImage(productId, imageId)))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProductModal);
