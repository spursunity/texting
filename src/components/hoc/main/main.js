import React from 'react';
import styles from './main.module.css';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {signOut} from "../../../store/actions/actions-authorization";
import CheckUser from "../check-user/check-user";
import CancelButton from "../../ui/button/cancel/cancel-button";
import Button from "../../ui/button/button";

const Main = ({
                  children,
                  onSignOut
    }) => {
    return (
        <CheckUser>
            <div className={ styles.mainBlock }>
                <div className={ styles.sidebar }>
                    <nav className={ styles.navigation }>
                        <Link to={ '/own-projects' }>
                            <Button
                                text={ 'My projects' }
                                styleButton={ styles.linkButton }
                            />
                        </Link>
                        <Link to={ '/other-projects' }>
                            <Button
                                text={ 'Other projects' }
                                styleButton={ styles.linkButton }
                            />
                        </Link>
                        <Link to={ '/create' }>
                            <Button
                                text={ 'Create project' }
                                styleButton={ styles.linkButton }
                            />
                        </Link>
                    </nav>
                    <CancelButton
                        text={ "Sign out" }
                        onClickCancel={ onSignOut }
                    />
                </div>
                <div className={ styles.content }>
                    { children }
                </div>
            </div>
        </CheckUser>
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
