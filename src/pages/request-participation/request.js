import React from 'react';
import PropTypes from 'prop-types';
import Button from "../../components/ui/button/button";
import styles from './request.module.css';
import CancelButton from "../../components/ui/button/cancel/cancel-button";
import {Link} from "react-router-dom";
import ContentEditable from "react-contenteditable";
import {connect} from "react-redux";
import {changeMotivation, checkExistingRequests, setInitialState} from "../../store/actions/actions-request";
import Main from '../../components/hoc/main/main';

const RequestParticipation = props => {
    const projectId = props.match.params.id;

    return (
        <Main>
            <div className={ styles.request }>
                <h2>Why You</h2>
                <ContentEditable
                    className={ styles.description }
                    html={ props.motivation }
                    onChange={ props.onChangeMotivation }/>
                <div>
                    <Link to={ '/other-projects' }>
                        <CancelButton
                            onClickCancel={ props.onCancelRequest }/>
                    </Link>
                    <Link to={ '/other-projects' }>
                        <Button
                            text={ 'Send' }
                            onClickButton={ props.onSendRequest.bind(this, projectId) }/>
                    </Link>

                </div>
            </div>
        </Main>
    );
};

RequestParticipation.propTypes = {
    motivation: PropTypes.string.isRequired
};

function mapStateToProps(state) {
    const requestState = state.request,
        authState = state.authorization
    ;
    return {
        motivation: requestState.motivation,
        isUserAuthorized: authState.isUserAuthorized
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onChangeMotivation: (event) => {
            dispatch(changeMotivation(event));
        },
        onSendRequest: (projectId) => {
            dispatch(checkExistingRequests(projectId));
        },
        onCancelRequest: () => {
            dispatch(setInitialState());
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestParticipation);
