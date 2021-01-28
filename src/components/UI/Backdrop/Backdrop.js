import React from 'react';

import './Backdrop.css'

function Backdrop(props) {
    return (
        props.show ? <div className='backdrop' onClick={props.clicked}></div> : null
    )
};

export default Backdrop;