import React from 'react';
import PropTypes from 'prop-types';
import Button from "../../components/ui/button/button";
import styles from './creating.module.css';
import CancelButton from "../../components/ui/button/cancel/cancel-button";
import ContentEditable from "react-contenteditable";
import {Link, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {changeDescriptionProject, changeNameProject, setNewProject} from "../../store/actions/actions-creating";

const Creating = props => {
    if (props.isUserAuthorized <= 0) {
        return <Redirect to={ '/' }/>;
    }

    return (
        <div className={ styles.creating }>
            <h1>Create your own project</h1>
            <h2>Name</h2>
            <ContentEditable
                className={ styles.creatingName }
                html={ props.nameProject }
                onChange={ props.onChangeName }/>
            <h2>Description</h2>
            <ContentEditable
                className={ styles.creatingDescription }
                html={ props.descriptionProject }
                onChange={ props.onChangeDescription }/>
            <div>
                <Link to={ '/own-projects' }>
                    <CancelButton/>
                </Link>
                <Link to={ '/own-projects' }>
                    <Button
                        text={ 'Accept' }
                        onClickButton={ props.createNewProject }/>
                </Link>
            </div>
        </div>
    );
};

Creating.propTypes = {
    nameProject: PropTypes.string,
    descriptionProject: PropTypes.string
};

function mapStateToProps(state) {
    const creatingState = state.creating,
        authState = state.authorization
    ;
    return {
        nameProject: creatingState.nameProject,
        descriptionProject: creatingState.descriptionProject,
        isUserAuthorized: authState.isUserAuthorized
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onChangeName: (event) => {
            dispatch(changeNameProject(event));
        },
        onChangeDescription: (event) => {
            dispatch(changeDescriptionProject(event));
        },
        createNewProject: () => {
            dispatch(setNewProject());
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Creating);