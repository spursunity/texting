import React from 'react';
import PropTypes from 'prop-types';
import Button from "../../ui/button/button";
import styles from './project-create.module.css';
import {Link} from "react-router-dom";

const ProjectCreate = props => {
    return (
        <div className={ styles.projectCreate }>
            <Link to={ '/create' }>
                <Button
                    text={ "Create New Project" }/>
            </Link>
        </div>
    );
};

ProjectCreate.propTypes = {
    
};

export default ProjectCreate;
