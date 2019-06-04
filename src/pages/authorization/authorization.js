import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from "../../components/ui/button/button";
import Input from "../../components/ui/input/input";
import styles from './authorization.module.css';
import {
    changeEmail,
    changeName,
    changePassword,
    signIn,
    signUp
} from "../../store/actions/actions-authorization";
import {Link, Redirect} from "react-router-dom";


class Authorization extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            isUserAuthorized,
            authStatuses,
            ownProjectsPath,
            userName,
            userEmail,
            userPassword,
            onChangeName,
            onChangeEmail,
            onChangePassword,
            onSignIn,
            onSignUp
        } = this.props;


        return isUserAuthorized === authStatuses.userIsAuthorized ?
            <Redirect to={ ownProjectsPath }/> :
            (
                <div className={ styles.authorization }>
                    <h1>Welcome</h1>
                    <Input
                        name="Username"
                        type="text"
                        onChangeInput={ event => onChangeName(event) }
                        inputValue={ userName }/>
                    <Input
                        name="Email"
                        type="email"
                        onChangeInput={ event => onChangeEmail(event) }
                        inputValue={ userEmail }/>
                    <Input
                        name="Password"
                        type="password"
                        onChangeInput={ event => onChangePassword(event) }
                        inputValue={ userPassword }/>
                    <div className={ styles.buttonsContainer }>
                        <Link to={ '/own-projects' }>
                            <Button
                                text="Sign in"
                                onClickButton={ onSignIn }/>
                        </Link>
                        <Link to={ '/own-projects' }>
                            <Button
                                text="Sign up"
                                onClickButton={ onSignUp }/>
                        </Link>
                    </div>
                </div>
            );
    }
}


Authorization.propTypes = {
    userName: PropTypes.string,
    userEmail: PropTypes.string,
    userPassword: PropTypes.string,
    isUserAuthorized: PropTypes.number.isRequired,
    authStatuses: PropTypes.object.isRequired,
    ownProjectsPath: PropTypes.string.isRequired
};

function mapStateToProps(state) {
    const authState = state.authorization;
    const projectsState = state.projects;

    return {
        userName: authState.userName,
        userEmail: authState.userEmail,
        userPassword: authState.userPassword,
        isUserAuthorized: authState.isUserAuthorized,
        authStatuses: authState.authStatuses,
        ownProjectsPath: projectsState.ownProjectsPath
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onSignIn: () => {
            dispatch(signIn());
        },
        onSignUp: () => {
            dispatch(signUp());
        },
        onChangeName: (event) => {
            dispatch(changeName(event));
        },
        onChangeEmail: (event) => {
            dispatch(changeEmail(event));
        },
        onChangePassword: (event) => {
            dispatch(changePassword(event));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Authorization);
