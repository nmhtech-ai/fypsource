import React from 'react';
import { Link } from 'react-router-dom';
import classes from '../sidebar.module.css';

const SidebarMenu = ({ item }) => {
    return (
        <React.Fragment>
            <li className={classes.navItem}>
                <Link to={item.path} className={classes.navLink}>
                    {item.icon}
                    <span className={classes.linkText}>{item.title}</span>
                </Link>
            </li>
        </React.Fragment>
    );
};

export default SidebarMenu;