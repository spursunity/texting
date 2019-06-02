import React from 'react';
import PropTypes from 'prop-types';
import ProjectsItem from "../item/projects-item";
import styles from './projects-list.module.css';

const ProjectsList = ({ pageData, projectsData, onClickHandler }) => {
    return (
        <div className={ styles.projectsList }>
            <h1
                style={{ textAlign: 'center' }}
            >
                { pageData.title }
            </h1>
            <ProjectsItem
                pageData={ pageData }
                projectsData={ projectsData }
                onClickHandler={ onClickHandler }
            />
        </div>
    );
};

ProjectsList.propTypes = {
    pageData: PropTypes.object.isRequired,
    projectsData: PropTypes.array.isRequired,
    onClickHandler: PropTypes.func
};

export default ProjectsList;
