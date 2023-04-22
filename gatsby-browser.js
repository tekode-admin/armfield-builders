import "./src/styles/reset.css";
import 'swiper/css';
import "swiper/css/pagination";
import reduxStore from './src/redux/reduxStore';
import {setScreenSize} from './src/redux/actions/actions';

if (typeof window !== 'undefined') {
    window.addEventListener('resize', () => {
        reduxStore.dispatch(setScreenSize());
    });
 }

export { default as wrapRootElement } from './src/redux/reduxWrapper';
 