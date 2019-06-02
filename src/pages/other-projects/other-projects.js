import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import Main from '../../components/hoc/main/main';
import ProjectsList from "../../components/projects/list/projects-list";

const OtherProjects = props => {
    return (
        <Main>
            <ProjectsList
                pageData={ props.otherProjectsPage }
                projectsData={ props.otherProjectsFreeData }
            />
        </Main>
    );
};

OtherProjects.propTypes = {
    otherProjectsPage: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    const projectsState = state.projects,
        authState = state.authorization
    ;
    return {
        otherProjectsPage: projectsState.otherProjectsPage,
        otherProjectsFreeData: projectsState.otherProjectsFreeData,
        isUserAuthorized: authState.isUserAuthorized
    };
}

export default connect(mapStateToProps)(OtherProjects);
