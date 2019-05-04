import React from 'react';
import PropTypes from 'prop-types';
import Button from "../../ui/button/button";
import styles from './projects-item.module.css';

const ProjectsItem = props => {
    return (
        <div className={ styles.projectsItem }>
            <div className={ styles.itemText }>
                <span>#1</span>
                <span>Project Name</span>
            </div>
            <div>
                <Button
                    styleButton={ styles.itemButton }
                    text="Edit"/>
                <Button
                    styleButton={ styles.itemButton }
                    text="Leave"/>
                <Button
                    styleButton={ styles.itemButton }
                    text="Requests"/>
            </div>
        </div>
    );
};

ProjectsItem.propTypes = {

};

export default ProjectsItem;
