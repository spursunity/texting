import React from 'react';
import PropTypes from 'prop-types';
import Button from "../../ui/button/button";
import styles from './projects-item.module.css';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {removeUserFromProject, selectProject} from "../../../store/actions/actions-projects";

const ProjectsItem = props => {
    const { pageData, projectsData } = props;

    const projects = projectsData.map((project, index) => {
        const buttons = pageData.buttons.map(( buttonData, index ) => {
            const projectLink = buttonData.dynamicLink ? project.id : '';

            if (buttonData.link) {
                return  (<Link
                    to={ buttonData.link + projectLink }
                    key={ index }>
                    <Button
                        styleButton={ styles.itemButton }
                        text={ buttonData.text }/>
                </Link>)
            } else {
                return (
                    <Button
                        key={ index }
                        styleButton={ styles.itemButton }
                        text={ buttonData.text }
                        onClickButton={ props.onLeaveProject.bind(this, project.id) }
                    />
                )
            }

        });

        let projectClassName = styles.projectItems;

        if ( props.selectedProjectId === project.id ) {
            projectClassName = styles.projectItemsSelected;
        }

        return (
            <div
            className={ projectClassName }
            key={ index }
            onClick={ props.onSelectProject.bind(this, project.id) }>
                <div className={ styles.itemText }>
                    <span>#{ index + 1 }</span>
                    <span>{ project.title }</span>
                </div>
                <div>
                    { buttons }
                </div>
            </div>
        )
    });
    return (
        <div>
            { projects }
        </div>
    );
};

ProjectsItem.propTypes = {
    pageData: PropTypes.object.isRequired,
    projectsData: PropTypes.array.isRequired,
    selectedProjectId: PropTypes.string
};

function mapStateToProps(state) {
    const scope = state.projects;
    return {
        selectedProjectId: scope.selectedProjectId
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onSelectProject: (projectId) => {
            dispatch(selectProject(projectId));
        },
        onLeaveProject: (projectId) => {
            dispatch(removeUserFromProject(projectId));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsItem);
