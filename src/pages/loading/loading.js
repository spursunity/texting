import PropTypes from 'prop-types';
import styles from './loading.module.css';
import {connect} from "react-redux";
import {setAuthHandler} from "../../store/actions/actions-authorization";
import {Redirect} from "react-router-dom";
import React, {Component} from 'react';

class Loading extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.handleAuthStatus();
    }

    render() {
        const {
            isUserAuthorized,
            authStatuses,
            authPath,
            ownProjectsPath } = this.props;

        if (isUserAuthorized === authStatuses.isUserAuthorized) {
            return <Redirect to={ ownProjectsPath }/>;
        } else if (isUserAuthorized === authStatuses.userIsUnauthorized) {
            return <Redirect to={ authPath }/>;
        } else {
            return (
                <div className={ styles.loading }>
                    <div className={ styles.spinner }>
                        <div className={styles.doubleBounce1}/>
                        <div className={styles.doubleBounce2}/>
                    </div>
                </div>
            );
        }
    }
}

Loading.propTypes = {
    isUserAuthorized: PropTypes.number.isRequired,
    authStatuses: PropTypes.object.isRequired,
    authPath: PropTypes.string.isRequired,
    ownProjectsPath: PropTypes.string.isRequired
};

function mapStateToProps(state) {
    const authState = state.authorization,
        projectsState = state.projects
    ;
    return {
        isUserAuthorized: authState.isUserAuthorized,
        authStatuses: authState.authStatuses,
        authPath: authState.authPath,
        ownProjectsPath: projectsState.ownProjectsPath
    };
}

function mapDispatchToProps(dispatch) {
    return {
        handleAuthStatus: () => {
            dispatch(setAuthHandler());
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Loading);
