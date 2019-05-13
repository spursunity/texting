import React from 'react';
import PropTypes from 'prop-types';
import Button from "../ui/button/button";
import styles from './motivation.module.css';
import {connect} from "react-redux";
import {acceptUser, findRequest, removeRequest} from "../../store/actions/actions-invitation";
import CancelButton from "../ui/button/cancel/cancel-button";

const Motivation = (props) => {
    props.findSelectedRequest(props.projectRequests, props.selectedId);
    if (!props.selectedRequest) {
        return (
            <div className={ styles.motivation }>
                <h2>User Name</h2>
                <div className={ styles.motivationText }>His offer</div>
            </div>
        );
    } else {
        return (
            <div className={ styles.motivation }>
                <h2>{ props.selectedRequest.uName }</h2>
                <div className={ styles.motivationText }>{ props.selectedRequest.motivation }</div>
                <div>
                    <CancelButton
                        text={ 'Deny' }
                        onClickCancel={ props.removeRequest }
                    />
                    <Button
                        text={ 'Accept' }
                        onClickButton={ props.acceptUser }
                    />
                </div>
            </div>
        );
    }
};

Motivation.propTypes = {
    selectedId: PropTypes.string,
    invitationState: PropTypes.array
};

function mapStateToProps(state) {
    const projectsState = state.projects,
        invitationState = state.invitation
    ;
    return {
        selectedId: projectsState.selectedId,
        projectRequests: invitationState.projectRequests,
        selectedRequest: invitationState.selectedRequest
    };
}

function mapDispatchToProps(dispatch) {
    return {
        findSelectedRequest: (requests, id) => {
            dispatch(findRequest(requests, id));
        },
        removeRequest: () => {
            dispatch(removeRequest());
        },
        acceptUser: () => {
            dispatch(acceptUser());
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Motivation);
