import React from 'react';
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {Redirect} from "react-router-dom";

const CheckUser = ({
                       children,
                       isUserAuthorized,
                       authStatuses
    }) => {
    const authorizedUser = isUserAuthorized === authStatuses.userIsAuthorized;

    return authorizedUser ? children : <Redirect to={ '/' }/> ;
};

CheckUser.propTypes = {
    isUserAuthorized: PropTypes.number.isRequired,
    authStatuses: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    const authState = state.authorization;
    return {
        isUserAuthorized: authState.isUserAuthorized,
        authStatuses: authState.authStatuses
    };
}

export default connect(mapStateToProps)(CheckUser);
