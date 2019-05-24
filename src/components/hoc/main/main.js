import React from 'react';
import styles from './main.module.css';
import {Link} from "react-router-dom";
import CancelButton from "../../projects/manage/project-manage";
import {connect} from "react-redux";
import {signOut} from "../../../store/actions/actions-authorization";

const Main = ({
                  children,
                  onSignOut
    }) => {
    return (
        <div className={ styles.mainBlock }>
            <div className={ styles.sidebar }>
                <nav>
                    <Link to={ '/own-projects' }>My Projects</Link>
                    <Link to={ '/other-projects' }>Other Projects</Link>
                    <Link to={ '/create' }>Create Project</Link>
                </nav>
                <CancelButton
                    text={ "Sign out" }
                    onClickCancel={ onSignOut }
                />
            </div>
            { children }
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

export default connect(null, mapDispatchToProps)(Main);
