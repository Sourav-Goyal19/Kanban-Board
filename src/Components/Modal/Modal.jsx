import React from 'react';
import './Modal.css';

export const Modal = (props) => {
    return (
        <div onClick={()=>props.onClose()} className='modal'>
            <div onClick={(e) => { e.stopPropagation() }} className="modal-content custom-scroll">
                {props.children}
            </div>
        </div>
    );
};
