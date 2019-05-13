import React from 'react';
import Button from "../../ui/button/button";
import styles from './project-manage.module.css';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {signOut} from "../../../store/actions/actions-authorization";
import CancelButton from "../../ui/button/cancel/cancel-button";

const ProjectManage = ({ onSignOut }) => {
    return (
        <div className={ styles.projectCreate }>
            <Link to={ '/create' }>
                <Button
                    text={ "Create New Project" }
                    styleButton={ styles.createButton }
                />
            </Link>
            <CancelButton
                text={ "Sign out" }
                onClickCancel={ onSignOut }
            />
        </div>
    );
};

function mapDispatchToProps(dispatch) {
    return {
        onSignOut: () => {
            dispatch(signOut());
        }
    };
}

export default connect(null, mapDispatchToProps)(ProjectManage);
