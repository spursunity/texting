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
        const {props} = this,
            status = props.isUserAuthorized
        ;
        let path = props.location.pathname;
        if (status > 0) {
            path = '/' ? '/own-projects' : path ;
            return <Redirect to={ path }/>;
        } else if (status < 0) {
            return <Redirect to={ '/auth' }/>;
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
    isUserAuthorized: PropTypes.number.isRequired
};

function mapStateToProps(state) {
    const authState = state.authorization;
    return {
        isUserAuthorized: authState.isUserAuthorized
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
