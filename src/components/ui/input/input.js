import React from 'react';
import PropTypes from 'prop-types';


const Input = (props) => {
    return (
        <label>
            { props.name }
            <input type={ props.type } />
        </label>
    );
};

Input.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
};

export default Input;