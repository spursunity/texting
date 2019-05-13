import React from 'react';
import PropTypes from 'prop-types';
import Button from "../../ui/button/button";
import styles from './projects-item.module.css';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import { selectItem } from "../../../store/actions/actions-projects";

const ProjectsItem = ({
                          pageData,
                          projectsData,
                          onClickHandler,
                          selectedId,
                          onSelectItem
}) => {
    const projects = projectsData.map((project, index) => {
        const id = project.id || project.uid || '';

        const buttons = pageData.buttons.map(( buttonData, index ) => {
            const projectLink = buttonData.dynamicLink ? id : '';

            if (buttonData.link) {
                return  (
                    <Link
                        to={ buttonData.link + projectLink }
                        key={ index }
                    >
                        <Button
                            styleButton={ styles.itemButton }
                            text={ buttonData.text }
                        />
                    </Link>
                )
            } else {
                return (
                    <Button
                        key={ index }
                        styleButton={ styles.itemButton }
                        text={ buttonData.text }
                        onClickButton={ onClickHandler.bind({}, id) }
                        // onClickButton={ onLeaveProject.bind(this, project.id) }
                    />
                )
            }

        });

        let projectClassName = styles.projectItems;

        if ( selectedId === id ) {
            projectClassName = styles.projectItemsSelected;
        }

        return (
            <div
                className={ projectClassName }
                key={ index }
                onClick={ onSelectItem.bind(this, id) }
            >
                <div className={ styles.itemText }>
                    <span>#{ index + 1 }</span>
                    <span>{ project.title || project.uName }</span>
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
    selectedId: PropTypes.string,
    onClickHandler: PropTypes.func,
    onSelectItem: PropTypes.func
};

function mapStateToProps(state) {
    const projectsState = state.projects;
    return {
        selectedId: projectsState.selectedId
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onSelectItem: (projectId) => {
            dispatch(selectItem(projectId));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsItem);
