import React from 'react';
import PropTypes from 'prop-types';
import ProjectsList from "../projects/list/projects-list";
import ProjectInfo from "../projects/info/project-info";
import ProjectCreate from "../projects/create/project-create";
import styles from './working-space.module.css';
import Motivation from "../motivation/motivation";

const WorkingSpace = props => {
    const rightBlock = props.withBlockForCreating ? (
        <div className={ styles.rightColumn }>
            <ProjectInfo/>
            <ProjectCreate/>
        </div>
    ) : (
        <Motivation/>
    ) ;

    return (
        <div className={ styles.ownProject }>
            <div>
                <ProjectsList
                    header={ "Your own own-projects" }/>
            </div>
            { rightBlock }
        </div>
    );
};

WorkingSpace.propTypes = {
    withBlockForCreating: PropTypes.bool.isRequired
};

export default WorkingSpace;
