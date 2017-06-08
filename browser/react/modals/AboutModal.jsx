import React from 'react';

import { connect } from 'react-redux';

import { hideModal } from '../action-creators/modals';
import Modal from './Modal';

class AboutModal extends React.Component {
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
                    <div className="modal-content About">
                        <h4>Who are we?</h4>
                        <p>J.S.S Knitwear has combined style and sophistication to provide timeless women’s apparel. Unlike many others, all knitwear by J.S.S is hand knit, made in New York. J.S.S knitwear distinguishes itself by proving exceptional comfort and elegance through an utmost standard in workmanship and tailoring. J.S.S provides a wide array of its original women’s apparel in business attire, leisure wear, and special occasion ensembles.</p>
                        <p>All products are hand made, with a speciality in custom made suits. All of the raw materials used are carefully selected, with a vast majority imported from Italy. Our quality is second to none.</p>
                        <p>J.S.S Knitwear was founded by Herman Zhou and Kun Yuan Zhou in 1993. Herman attended the fashion Institute of Technology while working in the garment industry. With 15 years of industry experience, Herman founded J.S.S Knitwear in 1993. Originally designed as a supplier for major labels, J.S.S Knitwear has developed its own brand name over the past 23 years and it now ships to many special boutique shops and showrooms across North America.</p>
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

export default connect(null, mapDispatchToProps)(AboutModal);
