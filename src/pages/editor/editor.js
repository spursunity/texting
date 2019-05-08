import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from "../../components/ui/button/button";
import styles from './editor.module.css';
import CancelButton from "../../components/ui/button/cancel/cancel-button";
import ContentEditable from "react-contenteditable";
import {connect} from "react-redux";
import {changeProjectText, getProjectBody, pushProjectChanges} from "../../store/actions/actions-editor";
import {Redirect} from "react-router-dom";


class Editor extends Component {
    constructor(props) {
        super(props);
        this.id = this.props.match.params.id;
    }

    componentDidMount() {
        this.props.getProjectBody(this.id);
    }

    render() {
        const { props, id } = this;

        if (props.isUserAuthorized <= 0) {
            return <Redirect to={ '/' }/>;
        }

        return (
            <div className={ styles.editor }>
                <ContentEditable
                className={ styles.projectText }
                html={ props.projectBody }
                onChange={ props.onChangeProjectText }/>
                <div className={ styles.buttons }>
                    <CancelButton/>
                    <Button
                    text={ 'Accept changes' }
                    onClickButton={ props.onPushChanges.bind(this, id) }/>
                </div>
            </div>
        );
    }
}

Editor.propTypes = {
    projectBody: PropTypes.string.isRequired
};

function mapStateToProps(state) {
    const editorState = state.editor,
        authState = state.authorization
    ;
    return {
        projectBody: editorState.projectBody,
        isUserAuthorized: authState.isUserAuthorized
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getProjectBody: (id) => {
            dispatch(getProjectBody(id));
        },
        onChangeProjectText: (event) => {
            dispatch(changeProjectText(event));
        },
        onPushChanges: (id) => {
            dispatch(pushProjectChanges(id));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
