import React, {Component} from 'react';
import PropTypes from 'prop-types';
import WorkingSpace from "../../components/two-page-working-space/working-space";
import {connect} from "react-redux";
import {setProjectForInvitation, setProjectRequests} from "../../store/actions/actions-invitation";
import {Redirect} from "react-router-dom";
import {clearSelectedItem} from "../../store/actions/actions-projects";



class Invitation extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {
            match,
            setRequests,
            clearId,
            setProjectId
        } = this.props,
            projectId = match.params.id
        ;
        setRequests(projectId);
        setProjectId(projectId);
        clearId();
    }

    render() {
        const {
            invitationPage,
            projectRequests,
            isUserAuthorized
        } = this.props;

        if (isUserAuthorized <= 0) {
            return <Redirect to={ '/' }/>;
        }

        return (
            <WorkingSpace
                pageData={ invitationPage }
                projectsData={ projectRequests }
                withBlockForCreating={ false }
            />
        );
    }
}

Invitation.propTypes = {

};

function mapStateToProps(state) {
    const invitationState = state.invitation,
        authState = state.authorization
    ;
    return {
        invitationPage: invitationState.invitationPage,
        projectRequests: invitationState.projectRequests,
        isUserAuthorized: authState.isUserAuthorized
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setRequests: (projectId) => {
            dispatch(setProjectRequests(projectId));
        },
        clearId: () => {
            dispatch(clearSelectedItem());
        },
        setProjectId: (projectId) => {
            dispatch(setProjectForInvitation(projectId));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Invitation);
