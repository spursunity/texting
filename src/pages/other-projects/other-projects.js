import React from 'react';
import PropTypes from 'prop-types';
import WorkingSpace from "../../components/two-page-working-space/working-space";
import {connect} from "react-redux";
import CheckUser from '../../components/hoc/check-user/check-user';

const OtherProjects = props => {
    return (
        <CheckUser>
            <WorkingSpace
                withBlockForCreating={ true }
                pageData={ props.otherProjectsPage }
                projectsData={ props.otherProjectsFreeData }
            />
        </CheckUser>
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
