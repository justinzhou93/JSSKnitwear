import React from 'react';
import { connect } from 'react-redux';

import AdminColors from '../components/AdminColors';

import { loadSingleColor } from '../action-creators/colors';
import { loadModal } from '../action-creators/modals';
import { ADD_COLOR_MODAL } from '../modals/modaltypes';

export class AdminColorsContainer extends React.Component {
    constructor(props) {
        super(props);

        this.showAddColorModal = this.showAddColorModal.bind(this);
    }

    showAddColorModal() {
        this.props.loadModal(ADD_COLOR_MODAL);
    }

    render() {
        console.log('Container Colorlist:', this.props);
        return (
            <AdminColors
                loadModal={this.props.loadModal}
                showAddColorModal={this.showAddColorModal}
                loadCurrentColor={this.props.loadCurrentColor}
                colorList={this.props.colorList}
            />
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        colorList: state.colors.colorList
    }
};

const mapDispatchToProps = dispatch => {
    return {
        loadModal: (modelType, payload) => dispatch(loadModal(modelType, payload)),
        loadCurrentColor: colorId => dispatch(loadSingleColor(colorId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminColorsContainer);
