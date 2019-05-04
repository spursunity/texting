import React from 'react';
import PropTypes from 'prop-types';
import WorkingSpace from "../../components/two-page-working-space/working-space";

const Invitation = props => {
    return (
        <WorkingSpace
            withBlockForCreating={ false }/>
    );
};

Invitation.propTypes = {

};

export default Invitation;
