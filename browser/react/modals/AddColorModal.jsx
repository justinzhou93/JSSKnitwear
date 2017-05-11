import React from 'react';
import { connect } from 'react-redux';

import { hideModal } from '../action-creators/modals';
import { addColor } from '../action-creators/color';

import Modal from './Modal';

/** TODO: add color route from addColor action-creator */
class AddColorModal extends React.Component {
    constructor(props) {
        super(props);

        this.onClose = this.onClose.bind(this);
        this.addColorSubmit = this.addColorSubmit.bind(this);
    }

    onClose() {
        this.props.hideModal();
    }

    addColorSubmit(evt) {
        evt.preventDefault();
        const colorInfo = {
            name: evt.target.name.value,
            code: evt.target.code.value
        }
        this.props.addingColor(colorInfo);
        this.props.hideModal();
    }

    render() {
        return (
            <Modal onClose={this.onClose}>
                <div className="modal-lg">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h4 className="modal-title" style={{fontWeight: 'bold'}}>ADD NEW COLOR</h4>
                        </div>

                        <div className="modal-body">
                            <form onSubmit={this.addColorSubmit} role="form">
                                <div className="form-group">
                                    <div className="input-group">
                                        <input type="text" name="title" className="form-control" id="uLogin" placeholder="Enter color name..." />
                                        <label htmlFor="uLogin" className="input-group-addon glyphicon glyphicon-info-sign" />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className="input-group">
                                        <textarea type="text" name="description" className="form-control" rows="7" placeholder="Enter color code..." />
                                        <label htmlFor="uPassword" className="input-group-addon glyphicon glyphicon-info-sign" />
                                    </div>
                                </div>

                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-default">Add Color</button>
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
        addingColor: (colorInfo) => (dispatch(addColor(colorInfo)))
    }
};

export default connect(null, mapDispatchToProps)(AddColorModal);
