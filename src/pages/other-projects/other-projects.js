import React from 'react';
import PropTypes from 'prop-types';
import WorkingSpace from "../../components/two-page-working-space/working-space";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

const OtherProjects = props => {
    if (props.isUserAuthorized <= 0) {
        return <Redirect to={ '/' }/>;
    }

    return (
        <WorkingSpace
        withBlockForCreating={ true }
        pageData={ props.otherProjectsPage }
        projectsData={ props.otherProjectsFreeData }/>
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
