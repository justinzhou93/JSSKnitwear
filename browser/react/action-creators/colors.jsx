import axios from 'axios';
import {browserHistory} from 'react-router';

/** Constants */
export const SET_COLOR_LIST = 'SET_COLOR_LIST';
export const SET_SINGLE_COLOR = 'SET_SINGLE_COLOR';

/** Action-creators */
const settingColorList = (colors) => {
    return {
        type: SET_COLOR_LIST,
        colorList: colors
    }
}

const setSingleColor = (color) => {
    return {
        type: SET_SINGLE_COLOR,
        currentColor: color
    }
}

/** Thunk actions */

// load all colors
export const loadAllColors = () => {
    return dispatch => {
        axios.get('/api/colors')
            .then((res => res.data))
            .then(colors => dispatch(settingColorList(colors)))
    };
};

// loads single color
export const loadSingleColor = (colorId) => {
    return dispatch => {
        axios.get(`/api/colors/${colorId}`)
            .then((res => res.data))
            .then(color => dispatch(setSingleColor(color)));
    };
};

/** ADMIN thunks */
export const addColor = (colorInfo) => {
    return dispatch => {
        axios.post('/api/colors', colorInfo)
            .then(() => {
                dispatch(loadAllColors());
                browserHistory.push('/colors');
            })
    };
};

export const editColor = (colorId, colorInfo) => {
    return dispatch => {
        axios.put(`/api/colors/${colorId}`, colorInfo)
            .then(() => {
                dispatch(loadAllColors());
                browserHistory.push('/colors');
            })
    };
};

export const deleteColor = (colorId) => {
    return dispatch => {
        axios.delete(`/api/colors/${colorId}`)
            .then(() => {
                dispatch(loadAllColors());
                browserHistory.push('/colors');
            })
    };
};
