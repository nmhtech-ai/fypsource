import React from 'react';
import { Link } from 'react-router-dom';
import classes from './sidebar.module.css';
import BrandImage from '../../assets/brand/brand-mathx-bluewhite.png';
import SidebarMenu from './menu/menu';
import * as roles from '../../contexts/roles';
import * as AiIcons from 'react-icons/ai';
import { IconContext } from "react-icons";

import AdminSBData from './data/admin-sb-data';
import DevSBData from './data/dev-sb-data';
import EditorSBData from './data/editor-sb-data';
import BasicSBData from './data/basic-sb-data';
import StudentSBData from './data/student-sb-data';
import ParentSBData from './data/parent-sb-data';


// const AdminSBData = React.lazy(() => import('./data/admin-sb-data'));
// const DevSBData = React.lazy(() => import('./data/dev-sb-data'));
// const EditorSBData = React.lazy(() => import('./data/editor-sb-data'));
// const BasicSBData = React.lazy(() => import('./data/basic-sb-data'));

const Sidebar = (props) => {

    let data = null;

    switch (props.role) {
        case roles.ADMIN:
            data = AdminSBData; break;
        case roles.DEVELOPER:
            data = DevSBData; break;
        case roles.EDITOR:
            data = EditorSBData; break;
        case roles.BASIC:
            data = BasicSBData; break;
        case roles.STUDENT:
            data = StudentSBData; break;
        case roles.PARENT:
            data = ParentSBData; break;
        default:
            break;
    }

    return (
        <div>
            <nav className={classes.navbar}>
                <IconContext.Provider value={{ color: "white", size: "1.5rem" }}>
                    <ul className={classes.navbarNav}>
                        <li className={classes.logo}>
                            <Link to="/portal" className={classes.navLogo}>
                                <span className={[classes.linkText, classes.logoText].join(' ')}><img
                                    alt="MathX Brand Logo"
                                    height="20%"
                                    width="60%"
                                    src={BrandImage} /></span>
                                <AiIcons.AiOutlineMenuUnfold />
                            </Link>
                        </li>
                        {data.map((item, index) => {
                            return <SidebarMenu item={item} key={index} />;
                        })}
                    </ul>
                </IconContext.Provider>
            </nav>
        </div>
    );
};

export default Sidebar;