import React from 'react';
import PropTypes from 'prop-types';
import ProjectsItem from "../item/projects-item";
import styles from './projects-list.module.css';
import Button from "../../ui/button/button";
import {Link} from "react-router-dom";

const ProjectsList = props => {
    const { pageData, projectsData } = props;
    return (
        <div className={ styles.projectsList }>
            <Link
            className={ styles.link }
            to={ pageData.changeProjectListButton.link }>
                <Button
                    text={ pageData.changeProjectListButton.text }/>
            </Link>
            <h1
                style={{ textAlign: 'center' }}>
                { pageData.title }
            </h1>
            <ProjectsItem
            pageData={ pageData }
            projectsData={ projectsData }/>
        </div>
    );
};

ProjectsList.propTypes = {
    pageData: PropTypes.object.isRequired,
    projectsData: PropTypes.array.isRequired
};

export default ProjectsList;
