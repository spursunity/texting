import React from 'react';
import PropTypes from 'prop-types';
import ProjectsList from "../projects/list/projects-list";
import ProjectInfo from "../projects/info/project-info";
import ProjectCreate from "../projects/create/project-create";
import styles from './working-space.module.css';
import Motivation from "../motivation/motivation";

const WorkingSpace = props => {
    const { pageData, projectsData } = props;
    const rightBlock = props.withBlockForCreating ? (
        <div className={ styles.rightColumn }>
            <ProjectInfo
            projectsData={ projectsData }/>
            <ProjectCreate/>
        </div>
    ) : (
        <Motivation/>
    ) ;

    return (
        <div className={ styles.projects }>
            <div>
                <ProjectsList
                pageData={ pageData }
                projectsData={ projectsData }/>
            </div>
            { rightBlock }
        </div>
    );
};

WorkingSpace.propTypes = {
    withBlockForCreating: PropTypes.bool.isRequired,
    pageData: PropTypes.object.isRequired,
    projectsData: PropTypes.array.isRequired
};

export default WorkingSpace;
