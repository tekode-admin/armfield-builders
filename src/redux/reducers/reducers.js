import * as actionTypes from '../actions/actionTypes';

const initialState = {
    openModal: false,
    headerRefs: []
};

if (typeof window !== 'undefined') {
    initialState.isMobile = window.innerWidth < 1024;
 }

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.SET_IS_MOBILE:
            return { ...state, isMobile: action.isMobile};
        case actionTypes.SET_OPEN_MODAL:
            return { ...state, openModal: action.openModal};
        default:
            return state;
    }
};

export default reducer;