import React from 'react';
import PropTypes from 'prop-types';
import Button from "../button";
import styles from './cancel-button.module.css';

const CancelButton = props => {
    return (
        <Button
            styleButton={ styles.cancelButton }
            text={ 'Cancel' }/>
    );
};

CancelButton.propTypes = {

};

// Настоящий Ализариновый красный

export default CancelButton;
