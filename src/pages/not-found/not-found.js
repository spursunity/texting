import React from 'react';
import styles from './not-found.module.css';

const PageNotFound = () => {
    return (
        <div className={ styles.pageNotFound }>
            <h1 className={ styles.text }>Page Not Found</h1>
            <h2 className={ styles.text }>Please, check entered URL</h2>
        </div>
    );
};

export default PageNotFound;
