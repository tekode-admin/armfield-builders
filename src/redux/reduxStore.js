import { createStore } from 'redux';
import Reducer from '../redux/reducers/reducers';

const initialState = {
    isMobile: true,
    openModal: false,
}

if (typeof window !== 'undefined') {
   initialState.isMobile = window.innerWidth < 1024;
}

const store = createStore(Reducer, initialState);

export default store;