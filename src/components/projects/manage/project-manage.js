import React from 'react';
import Button from "../../ui/button/button";
import styles from './project-manage.module.css';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {signOut} from "../../../store/actions/actions-authorization";

const ProjectManage = ({ onSignOut }) => {
    return (
        <div className={ styles.projectCreate }>
            <Link to={ '/create' }>
                <Button
                    text={ "Create New Project" }
                    styleButton={ styles.createButton }
                />
            </Link>
            <Button
                text={ "Sign out" }
                onClickButton={ onSignOut }
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
