import React, { useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';
import axios from '../../../config/axiosConfig';
import BrandImage from '../../../assets/brand/brand-mathx-blueblack.png';
import classes from './welcome.module.css';
import { IconContext } from "react-icons";

import * as roles from '../../../contexts/roles';

import AdminSBData from '../../../components/sidebar/data/admin-sb-data';
import DevSBData from '../../../components/sidebar/data/dev-sb-data';
import EditorSBData from '../../../components/sidebar/data/editor-sb-data';
import BasicSBData from '../../../components/sidebar/data/basic-sb-data';
import StudentSBData from '../../../components/sidebar/data/student-sb-data';
import ParentSBData from '../../../components/sidebar/data/parent-sb-data';

const WelcomePage = (props) => {

    useEffect(() => {
        document.title = "MathX | Portal";

        axios({
            method: "GET",
            withCredentials: true,
            url: "/v1/users/edit",
        }).then((res) => {
            if (res.data.isAuthenticated !== true) {
                props.history.push("./login");
            }
        })
    }, [props])

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
            <div className={classes.bottom}>
                <h2 className={classes.header}>歡迎來到</h2>
                {/* Welcome To */}
                <img
                    className={classes.brandLogo}
                    alt="MathX Brand Logo"
                    height="20%"
                    width="60%"
                    src={BrandImage} />
            </div>
            <hr />
            <br />
            <h3>傳送門</h3>
            {/* Quick Links */}
            <br />
            <div className="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 row-cols-xxl-5 g-4">
                {data.filter(
                    (item) => item.title !== "Logout" && item.title !== "Settings" && item.title !== "登出" && item.title !== "設定"
                ).map((item, index) => {
                    return (
                        <React.Fragment key={index}>
                            <IconContext.Provider value={{ color: "black", size: "2.4rem" }}>
                                <Link to={item.path} className={classes.link}>
                                    <div className={[classes.card, "col"].join(" ")} key={index}>
                                        <div className="card h-100">
                                            <div className="card-body">

                                                <span className="align-middle">{item.icon}</span>
                                                <h5 className={[classes.text, "card-title align-middle"].join(" ")}>{item.title}</h5>

                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </IconContext.Provider>
                        </React.Fragment>);
                })}
            </div>
        </div >
    );
};

export default withRouter(WelcomePage);