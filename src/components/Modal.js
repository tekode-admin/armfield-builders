import React from 'react';
import { useSelector } from 'react-redux';
import * as styles from '../styles/Modal.module.scss';
import Logo from '../images/logo.svg';
import { Link } from 'gatsby'
import reduxStore from '../redux/reduxStore';
import { setOpenModal } from '../redux/actions/actions';


const Modal = (props) => {
    const openModal = useSelector(state => state.openModal);

    // openModal ? document.body.classList.add(styles.BodyFreeze) : document.body.classList.remove(styles.BodyFreeze);

    const closeMenu = () => {
        reduxStore.dispatch(setOpenModal(false));
      }

    return (
        <section className={[styles.ModalWrap, openModal ? styles.ModalOpen : ''].join(' ')}>
            <div className={styles.ModalHeaderWrap}>
            <Link to={"/"} onClick={() => closeMenu()}><img className={styles.ModalLogo} src={Logo} alt="Armfield Builders" /></Link>
                <button className={styles.ModalCloseButtonWrap} onClick={() => props.callback()}>
                    <div className={styles.ModalCloseButton}>
                    </div>
                </button>
            </div>
            {props.children}
        </section>

    );
}

export default Modal; 