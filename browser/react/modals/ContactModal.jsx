import React from 'react';

import { connect } from 'react-redux';

import { hideModal } from '../action-creators/modals';
import Modal from './Modal';

class ContactModal extends React.Component {
    constructor(props) {
        super(props);

        this.onClose = this.onClose.bind(this);
    }

    onClose() {
        this.props.hideModal();
    }

    render() {
        return (
            <Modal onClose={this.onClose}>
                <div className="modal-lg ImgMag">
                    <div className="modal-content Contact">
                        <h4>Contact us!</h4>
                        <p>Email us directly at hermanzhou1952@gmail.com or reach out to our representatives at Blake and Company at 212-869-5959.</p>
                    </div>
                </div>
            </Modal>
        );
    }
}


const mapDispatchToProps = dispatch => {
    return {
        hideModal: () => dispatch(hideModal())
    }
};

export default connect(null, mapDispatchToProps)(ContactModal);
