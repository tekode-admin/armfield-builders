import * as actionTypes from '../actions/actionTypes';

const initialState = {
    openModal: false,
    isMobile: true,
};

if (typeof window !== 'undefined') {
    initialState.isMobile = window.innerWidth < 768;
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_IS_MOBILE:
            return { ...state, isMobile: action.isMobile };
        case actionTypes.SET_OPEN_MODAL:
            return { ...state, openModal: action.openModal };
        case actionTypes.SET_SCREEN_SIZE:
            return { ...state, isMobile: action.isMobile };
        default:
            return state;
    }
};

export default reducer;