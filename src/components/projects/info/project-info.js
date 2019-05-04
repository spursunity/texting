import React from 'react';
import PropTypes from 'prop-types';
import styles from './project-info.module.css';

const ProjectInfo = props => {
    return (
        <div className={ styles.projectInfo }>
            <h2>Name Project</h2>
            <p className={ styles.description }>Description</p>
            <div>
                <span className={ styles.titleType }>Users:</span>
                <span>John</span>
            </div>
            <div>
                <span className={ styles.titleType }>Last Changes:</span>
                <span>21.02.2012</span>
            </div>
        </div>
    );
};

ProjectInfo.propTypes = {

};

export default ProjectInfo;
