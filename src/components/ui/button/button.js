import React from 'react';
import PropTypes from 'prop-types';
import styles from './button.module.css';


const Button = (props) => {
    const styleFromParent = props.styleButton || '';

    return (
        <button
            className={ `${styles.button} ${styleFromParent}` }
            onClick={ props.onClickButton }>
            { props.text }
        </button>
    );
};

Button.propTypes = {
    text: PropTypes.string.isRequired,
    styleButton: PropTypes.string,
    onClickButton: PropTypes.func
};

export default Button;