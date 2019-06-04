import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {setProjectForInvitation, setProjectRequests} from "../../store/actions/actions-invitation";
import {clearSelectedItem} from "../../store/actions/actions-projects";
import Main from '../../components/hoc/main/main';
import ProjectsList from "../../components/projects/list/projects-list";



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
            projectRequests
        } = this.props;

        return (
            <Main>
                <ProjectsList
                    pageData={ invitationPage }
                    projectsData={ projectRequests }
                />
            </Main>
        );
    }
}

Invitation.propTypes = {
    invitationPage: PropTypes.object.isRequired,
    projectRequests: PropTypes.array.isRequired
};

function mapStateToProps(state) {
    const invitationState = state.invitation
    ;
    return {
        invitationPage: invitationState.invitationPage,
        projectRequests: invitationState.projectRequests
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
