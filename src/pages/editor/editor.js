import React from 'react';
import PropTypes from 'prop-types';
import Button from "../../components/ui/button/button";
import styles from './editor.module.css';
import CancelButton from "../../components/ui/button/cancel/cancel-button";

const Editor = props => {
    return (
        <div className={ styles.editor }>
            <div className={ styles.previousText }>Created Text</div>
            <div className={ styles.creatingBlock }>
                <div className={ styles.newText }>New Text</div>
                <div className={ styles.creatingButtons }>
                    <CancelButton/>
                    <Button
                        text={ 'Add' }/>
                </div>
            </div>
        </div>
    );
};

Editor.propTypes = {

};

export default Editor;
