import React from 'react';
import PropTypes from 'prop-types';
import styles from './project-info.module.css';
import {connect} from "react-redux";

const ProjectInfo = ({selectedId, projectsData}) => {

    const filteredData = projectsData.filter((project) => {
        return selectedId === project.id;
    });
    const projectData = filteredData[0] || {};
    const name = projectData.title || 'Name Project';
    const description = projectData.description || 'Description';
    const date = projectData.creatingDate || 'Date';
    const usersArray = projectData.usersNames || [''];
    const usersNames = usersArray.map((userName, index) => {
        return <span key={ index }>{ userName }</span>
    });

    return (
        <div className={ styles.projectInfo }>
            <h2>{ name }</h2>
            <p className={ styles.description }>{ description }</p>
            <div className={ styles.usersNames }>
                <span className={ styles.titleType }>Users:</span>
                { usersNames }
            </div>
            <div className={ styles.date }>
                <span className={ styles.titleType }>Date of creation:</span>
                <span>{ date }</span>
            </div>
        </div>
    );
};

ProjectInfo.propTypes = {
    projectsData: PropTypes.array,
    selectedId: PropTypes.string
};

function mapStateToProps(state) {
    const projectState = state.projects;
    return {
        selectedId: projectState.selectedId
    };
}

export default connect(mapStateToProps)(ProjectInfo);
