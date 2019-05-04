import React from 'react';
import PropTypes from 'prop-types';
import Button from "../ui/button/button";
import styles from './motivation.module.css';

const Motivation = props => {
    return (
        <div className={ styles.motivation }>
            <h2>User Name</h2>
            <div className={ styles.motivationText }>Why you</div>
            <div>
                <Button
                    styleButton={ styles.denyButton }
                    text={ 'Deny' }/>
                <Button
                    text={ 'Accept' }/>
            </div>
        </div>
    );
};

Motivation.propTypes = {

};

export default Motivation;
