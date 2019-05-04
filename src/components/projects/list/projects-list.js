import React from 'react';
import PropTypes from 'prop-types';
import ProjectsItem from "../item/projects-item";
import styles from './projects-list.module.css';
import Button from "../../ui/button/button";

const ProjectsList = props => {
    return (
        <div className={ styles.projectsList }>
            <Button
                text={ 'See other project' }/>
            <h1
                style={{ textAlign: 'center' }}>
                { props.header }
            </h1>
            <ProjectsItem/>
        </div>
    );
};

ProjectsList.propTypes = {
    header: PropTypes.string.isRequired
};

export default ProjectsList;
