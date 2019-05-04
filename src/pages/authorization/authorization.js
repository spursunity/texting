import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from "../../components/ui/button/button";
import Input from "../../components/ui/input/input";
import styles from './authorization.module.css';
import {
    changeEmail,
    changeName,
    changePassword, setAuthHandler,
    signIn,
    signUp
} from "../../store/actions/actions-authorization";
import { Redirect } from "react-router-dom";


class Authorization extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.setHandlerOnAuthStatus();
    }

    render() {
        const props = this.props;

        if (props.isUserAuthorized) {
            return <Redirect to={ '/own-projects' }/>
        } else {
            return (<div className={ styles.authorization }>
                    <h1>Welcome</h1>
                    <Input
                        name="Username"
                        type="text"
                        onChangeInput={ event => props.onChangeName(event) }
                        inputValue={ props.userName }/>
                    <Input
                        name="Email"
                        type="email"
                        onChangeInput={ event => props.onChangeEmail(event) }
                        inputValue={ props.userEmail }/>
                    <Input
                        name="Password"
                        type="password"
                        onChangeInput={ event => props.onChangePassword(event) }
                        inputValue={ props.userPassword }/>
                    <div className={ styles.buttonsContainer }>
                        <Button
                            text="Sign in"
                            onClickButton={ props.onSignIn }/>
                        <Button
                            text="Sign up"
                            onClickButton={ props.onSignUp }/>
                    </div>
                </div>
            );
        }
    }
}


Authorization.propTypes = {
    userName: PropTypes.string,
    userEmail: PropTypes.string,
    userPassword: PropTypes.string,
    isUserAuthorized: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    const scope = state.authorization;
    return {
        userName: scope.userName,
        userEmail: scope.userEmail,
        userPassword: scope.userPassword,
        isUserAuthorized: scope.isUserAuthorized
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
        },
        setHandlerOnAuthStatus: () => {
            dispatch(setAuthHandler());
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Authorization);
