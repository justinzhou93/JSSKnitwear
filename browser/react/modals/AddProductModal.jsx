import React from 'react';
import { connect } from 'react-redux';

import { hideModal } from '../action-creators/modals';
import { addProduct } from '../action-creators/products';

import Modal from './Modal';

class AddProductModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {collection: 'Day'};

        this.onClose = this.onClose.bind(this);
        this.addProductSubmit = this.addProductSubmit.bind(this);
        this.setCollection = this.setCollection.bind(this);
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
            collection: this.state.collection,
            imgUrl: evt.target.imgUrl.value
        }
        this.props.addingProduct(productInfo);
        this.props.hideModal();
    }

    setCollection(evt){
      evt.preventDefault();
      this.setState({
        collection: evt.target.value
      })
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
                      <select onChange={this.setCollection}>
                        <option value="Day">Day</option>
                        <option value="Evening">Evening</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="input-group">
                      <input type="text" name="imgUrl" className="form-control" id="img" placeholder="Enter image URL..." />
                      <label htmlFor="img" className="input-group-addon glyphicon glyphicon-globe" />
                    </div>
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
