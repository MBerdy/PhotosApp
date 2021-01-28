import React from 'react';

import './Modal.css';
import Backdrop from '../Backdrop/Backdrop';

function Modal(props) {
    return (
        <>
            <Backdrop show={props.show} clicked={props.modalClosed} />
            <div
                className='modal'
                style={{
                    transform: props.show ? 'translate(0)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0'
                }}>
                    <div className='close' onClick={props.modalClosed}></div>
                {props.children}
            </div>
        </>
    );
};

export default Modal;