import React, {Component} from 'react';
import PropTypes from 'prop-types';
import WorkingSpace from "../../components/two-page-working-space/working-space";
import {connect} from "react-redux";
import {setIdsAndFreeData} from "../../store/actions/actions-projects";
import {Redirect} from "react-router-dom";

class OwnProjects extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.getDatabase();
    }

    render() {
        const { props } = this;

        if (props.isUserAuthorized <= 0) {
            return <Redirect to={ '/' }/>;
        }

        return (
            <WorkingSpace
                pageData = { props.ownProjectsPage }
                projectsData = { props.ownProjectsFreeData }
                withBlockForCreating={ true }/>
        );
    }
}

OwnProjects.propTypes = {
    userProjectsIds: PropTypes.array,
    ownProjectsPage: PropTypes.object.isRequired,
    ownProjectsFreeData: PropTypes.array.isRequired,
    isUserAuthorized: PropTypes.number
};

function mapStateToProps(state) {
    const projectsState = state.projects,
        authState = state.authorization
    ;
    return {
        userProjectsIds: projectsState.userProjectsIds,
        ownProjectsPage: projectsState.ownProjectsPage,
        ownProjectsFreeData: projectsState.ownProjectsFreeData,
        isUserAuthorized: authState.isUserAuthorized
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getDatabase: () => {
            dispatch(setIdsAndFreeData());
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(OwnProjects);
