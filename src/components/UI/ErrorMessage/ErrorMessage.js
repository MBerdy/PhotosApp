import React from 'react';

import './ErrorMessage.css'

function ErrorMessage(props) {
    return (
        <div className="error-message">
            <h2>An Error Occurred!</h2>
            <p>{props.children}</p>
        </div>
    )
}

export default ErrorMessage