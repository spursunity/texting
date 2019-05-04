import React from 'react';
import PropTypes from 'prop-types';
import styles from './input.module.css';


const Input = (props) => {
    return (
        <label className={ styles.labelBlock }>
            { props.name }
            <br/>
            <input
                type={ props.type }
                className={ styles.input }
                onChange={ props.onChangeInput }
                value={ props.inputValue }/>
        </label>
    );
};

Input.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    onChangeInput: PropTypes.func,
    inputValue: PropTypes.string
};

export default Input;