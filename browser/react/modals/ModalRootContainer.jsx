import React from 'react';
import { connect } from 'react-redux';

/** Modal Components */
import SignupModal from './SignupModal';
import LoginModal from './LoginModal';
import AddProductModal from './AddProductModal';
import AddColorModal from './AddcolorModal';
import DeleteWarningModal from './DeleteWarningModal';
import EditProductModal from './EditProductModal';
import AddReviewModal from './AddReviewModal';
import CartModal from './CartModal';
import ShowImagesModal from './ShowImagesModal';
import AboutModal from './AboutModal';
import ContactModal from './ContactModal';

/** Modal Type Constants */
import { LOGIN_MODAL, SIGNUP_MODAL, ADD_PRODUCT_MODAL, ADD_COLOR_MODAL, DELETE_WARNING_MODAL, EDIT_PRODUCT_MODAL, CART_MODAL, ADD_REVIEW_MODAL, SHOW_IMAGES_MODAL, ABOUT_MODAL, CONTACT_MODAL } from './modaltypes';


const MODAL_COMPONENTS = {
    LOGIN_MODAL: LoginModal,
    SIGNUP_MODAL: SignupModal,
    ADD_PRODUCT_MODAL: AddProductModal,
    ADD_COLOR_MODAL: AddColorModal,
    DELETE_WARNING_MODAL: DeleteWarningModal,
    EDIT_PRODUCT_MODAL: EditProductModal,
    CART_MODAL: CartModal,
    ADD_REVIEW_MODAL: AddReviewModal,
    SHOW_IMAGES_MODAL: ShowImagesModal,
    ABOUT_MODAL: AboutModal,
    CONTACT_MODAL: ContactModal
};

const ModalContainer = (props) => {
    if (!props.modalType) {
        return null;
    }

    const SpecificModal = MODAL_COMPONENTS[props.modalType];

    return <SpecificModal payload={props.payload} />;
};

const mapStateToProps = state => {
    return {
        modalType: state.modal.modalType,
        payload: state.modal.payload
    };
};

export default connect(mapStateToProps)(ModalContainer);
