import * as actionTypes from './actionTypes';

export const setIsMobile = () => {
    return {
        type: actionTypes.SET_IS_MOBILE,
        isMobile: window.innerWidth < 1024
    }
}

export const setOpenModal = (openModal) => {
    return {
        type: actionTypes.SET_OPEN_MODAL,
        openModal: openModal
    }
}

export const setScreenSize = () => {
    return {
        type: actionTypes.SET_SCREEN_SIZE,
        isMobile: window.innerWidth < 768,
    }
}
