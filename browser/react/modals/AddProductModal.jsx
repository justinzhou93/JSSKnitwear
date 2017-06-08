import React from 'react';
import { connect } from 'react-redux';

import { hideModal } from '../action-creators/modals';
import { addProduct } from '../action-creators/products';

import Modal from './Modal';

class AddProductModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          collection: 'Day',
          images: []
        };

        this.onClose = this.onClose.bind(this);
        this.addProductSubmit = this.addProductSubmit.bind(this);
        this.setCollection = this.setCollection.bind(this);
        this.encodeImageFileAsURL = this.encodeImageFileAsURL.bind(this);
        this.removeImage = this.removeImage.bind(this);
    }

    onClose() {
        this.props.hideModal();
    }

    addProductSubmit(evt) {
        evt.preventDefault();
        const productInfo = {
            title: evt.target.title.value,
            description: evt.target.description.value,
            price: evt.target.price.value,
            tags: evt.target.tag.value,
            collection: this.state.collection,
            images: this.state.images
        }
        this.props.addingProduct(productInfo);
        this.props.hideModal();
    }

    removeImage(index) {
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

    encodeImageFileAsURL(evt){
      var file = evt.target.files[0];
      var reader = new FileReader();
      reader.onloadend = function() {
        let newStateImages = this.state.images;
        let url = reader.result;
        newStateImages.push(url);
        this.setState({images: newStateImages})
      }.bind(this)
      reader.readAsDataURL(file);
    }

    render() {
      return (
        <Modal onClose={this.onClose}>
          <div className="modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title" style={{fontWeight: 'bold'}}>ADD NEW PRODUCT</h4>
              </div>

              <div className="modal-body">
                <form onSubmit={this.addProductSubmit} role="form">
                  <div className="form-group">
                    <div className="input-group">
                      <input type="text" name="title" className="form-control" id="title" placeholder="Enter product title..." />
                      <label htmlFor="title" className="input-group-addon glyphicon glyphicon-info-sign" />
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="input-group">
                      <textarea type="text" name="description" className="form-control" id="desc" rows="7" placeholder="Enter product description..." />
                      <label htmlFor="desc" className="input-group-addon glyphicon glyphicon-info-sign" />
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="input-group">
                      <input type="text" name="price" className="form-control" id="price" placeholder="Enter product price..." />
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
                      <select onChange={this.setCollection}>
                        <option value="Day">Day</option>
                        <option value="Evening">Evening</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="input-group">
                      <input type="file" name="image" className="form-control" onChange={this.encodeImageFileAsURL} />
                      <label htmlFor="img" className="input-group-addon glyphicon glyphicon-globe" />
                    </div>
                    {
                      this.state.images.map((image, index) => {
                        return (
                            <img src={image} key={`addedImage${index}`} onClick={() => {this.removeImage(index)}} />
                        )
                      })
                    }
                  </div>

                  <div className="modal-footer">
                    <button type="submit" className="btn btn-default">Add Product</button>
                  </div>

                </form>
              </div>
            </div>
          </div>
        </Modal>
      );
    }
}

const mapDispatchToProps = dispatch => {
  return {
    hideModal: () => dispatch(hideModal()),
    addingProduct: (productInfo) => (dispatch(addProduct(productInfo)))
  }
};

export default connect(null, mapDispatchToProps)(AddProductModal);
