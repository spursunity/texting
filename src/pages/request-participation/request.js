import React from 'react';
import PropTypes from 'prop-types';
import Button from "../../components/ui/button/button";
import styles from './request.module.css';
import CancelButton from "../../components/ui/button/cancel/cancel-button";

const RequestParticipation = props => {
    return (
        <div className={ styles.request }>
            <h2>Why You</h2>
            <div className={ styles.description }>Some Text</div>
            <div>
                <CancelButton/>
                <Button
                    text={ 'Send' }/>
            </div>
        </div>
    );
};

RequestParticipation.propTypes = {

};

export default RequestParticipation;
