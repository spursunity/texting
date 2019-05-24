import React, {Component} from 'react';
import PropTypes from 'prop-types';
import WorkingSpace from "../../components/two-page-working-space/working-space";
import {connect} from "react-redux";
import {setProjectForInvitation, setProjectRequests} from "../../store/actions/actions-invitation";
import {clearSelectedItem} from "../../store/actions/actions-projects";
import CheckUser from '../../components/hoc/check-user/check-user';



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
            <CheckUser>
                <WorkingSpace
                    pageData={ invitationPage }
                    projectsData={ projectRequests }
                    withBlockForCreating={ false }
                />
            </CheckUser>
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
