import React from 'react';
import classes from './bd-white.module.css';

const BdGalaxy = (props) => {
    return (
        <div className={classes.backdrop}>
            {props.children}
        </div>
    );
};

export default BdGalaxy;