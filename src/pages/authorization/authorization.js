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
import {Link} from "react-router-dom";
import CheckUser from '../../components/hoc/check-user/check-user';


class Authorization extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const props = this.props;

        return (
            <div className={ styles.authorization }>
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
                    <Link to={ '/own-projects' }>
                        <Button
                            text="Sign in"
                            onClickButton={ props.onSignIn }/>
                    </Link>
                    <Link to={ '/own-projects' }>
                        <Button
                            text="Sign up"
                            onClickButton={ props.onSignUp }/>
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
    isUserAuthorized: PropTypes.number.isRequired
};

function mapStateToProps(state) {
    const authState = state.authorization;
    return {
        userName: authState.userName,
        userEmail: authState.userEmail,
        userPassword: authState.userPassword,
        isUserAuthorized: authState.isUserAuthorized
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
