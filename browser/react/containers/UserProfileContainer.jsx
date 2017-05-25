import React from 'react';
import { connect } from 'react-redux';

import UserProfile from '../components/UserProfile';
import { deleteAddress, deleteCreditCard, deleteUserReview, addNewMeasurements } from '../action-creators/users';

export class UserProfileContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addressesOpen: false,
            creditCardFormOpen: false,
            reviewsOpen: false,
            cardsOpen: false,
            sizesOpen: false,
            sizesFormOpen: false
        }
        this.handleAddressClick = this.handleAddressClick.bind(this);
        this.handleCardFormClick = this.handleCardFormClick.bind(this);
        this.handleReviewsClick = this.handleReviewsClick.bind(this);
        this.handleCardsClick = this.handleCardsClick.bind(this);
        this.handleSizesClick = this.handleSizesClick.bind(this);
        this.handleSizeFormClick = this.handleSizeFormClick.bind(this);
    }

    handleAddressClick(evt) {
        evt.preventDefault();
        if (this.state.addressesOpen) this.setState({addressesOpen: false});
        else this.setState({addressesOpen: true});
    }

    handleCardFormClick(evt) {
        evt.preventDefault();
        if (this.state.creditCardFormOpen) this.setState({creditCardFormOpen: false});
        else this.setState({creditCardFormOpen: true});
    }

    handleReviewsClick(evt) {
        evt.preventDefault();
        if (this.state.reviewsOpen) this.setState({reviewsOpen: false});
        else this.setState({reviewsOpen: true});
    }

    handleCardsClick(evt) {
        evt.preventDefault();
        if (this.state.cardsOpen) this.setState({cardsOpen: false});
        else this.setState({cardsOpen: true});
    }

    handleSizesClick(evt) {
        evt.preventDefault();
        if (this.state.sizesOpen){
          this.setState({sizesOpen: false});
        }
        else {
          this.setState({sizesOpen: true});
        }
    }

    handleSizeFormClick(evt) {
        evt.preventDefault();
        if (this.state.sizesFormOpen){
          this.setState({sizesFormOpen: false})
        }
        else {
          this.setState({sizesFormOpen: true})
        }
    }

    render() {
        return (
            <UserProfile
                addressesOpen={this.state.addressesOpen}
                reviewsOpen={this.state.reviewsOpen}
                creditCardFormOpen={this.state.creditCardFormOpen}
                cardsOpen={this.state.cardsOpen}
                sizesOpen={this.state.sizesOpen}
                sizesFormOpen={this.state.sizesFormOpen}
                currentUser={this.props.currentUser}
                handleAddressClick={this.handleAddressClick}
                handleCardsClick={this.handleCardsClick}
                handleCardFormClick={this.handleCardFormClick}
                handleReviewsClick={this.handleReviewsClick}
                handleSizesClick={this.handleSizesClick}
                handleSizeFormClick={this.handleSizeFormClick}
                deletingAddress={this.props.deletingAddress}
                deletingCreditCard={this.props.deletingCreditCard}
                deletingUserReview={this.props.deletingUserReview}
                addingNewMeasurements={this.props.addingNewMeasurements}
            />
        )
    }
}

const mapStateToProps = state => {
    return {
        currentUser: state.auth.currentUser
    };
}

const mapDispatchToProps = dispatch => {
    return {
        deletingAddress: (userId, addressId) => {dispatch(deleteAddress(userId, addressId))},
        deletingCreditCard: (userId, creditId) => {dispatch(deleteCreditCard(userId, creditId))},
        deletingUserReview: (productId, reviewId) => {dispatch(deleteUserReview(productId, reviewId))},
        addingNewMeasurements: (userId, measurements) => {dispatch(addNewMeasurements(userId, measurements))}
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileContainer);
