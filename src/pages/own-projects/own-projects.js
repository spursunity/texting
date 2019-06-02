import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {removeUserFromProject, setIdsAndFreeData} from "../../store/actions/actions-projects";
import Main from '../../components/hoc/main/main';
import ProjectsList from "../../components/projects/list/projects-list";

class OwnProjects extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.getDatabase();
    }

    render() {
        const { props } = this;

        return (
            <Main>
                <ProjectsList
                    pageData={ props.ownProjectsPage }
                    projectsData={ props.ownProjectsFreeData }
                    onClickHandler={ props.onLeaveProject }
                />
            </Main>
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
        },
        onLeaveProject: (projectId) => {
            dispatch(removeUserFromProject(projectId));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(OwnProjects);
