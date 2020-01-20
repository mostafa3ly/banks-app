import React from 'react';
import classes from './FadeIn.module.css';

const fadeIn = (props) => {
    return <div className={classes.FadeIn}>{props.children}</div>
}

export default fadeIn;