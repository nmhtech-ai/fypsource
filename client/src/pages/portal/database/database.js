import React, { useEffect } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import axios from '../../../config/axiosConfig';
import classes from './database.module.css';
import * as BsIcons from 'react-icons/bs';
import { IconContext } from "react-icons";

const Database = (props) => {

    useEffect(() => {
        document.title = "MathX | Database";

        axios({
            method: "GET",
            withCredentials: true,
            url: "/getuser",
        }).then((res) => {
            if (res.data.isAuthenticated !== true) {
                props.history.push("./login");
            }
        })
    }, [props])

    return (
        <div>
            <h2 className={classes.header}>Database</h2>
            <hr />
            <div className={[classes.container, "container"].join(" ")}>
                <div className="row">
                    <div className={[classes.sidemenu, "col-2"].join(" ")}>
                        <p>Hello</p>
                        <NavLink
                            exact={true}
                            // className={[
                            //     classes.button,
                            //     "btn btn-outline-primary col-12 col-md-2 shadow-none"].join(" ")}
                            // activeClassName={classes.isActive}
                            to='/portal/database/question'>Question</NavLink>
                    </div>
                    <div className="col-10">

                    </div>
                    {/* <div> */}
                    {/* <IconContext.Provider value={{ color: "white", size: "1.5rem", margin: "10px" }}>
                            <div className={classes.btnList}>
                                <NavLink
                                    exact={true}
                                    className={[
                                        classes.button,
                                        "btn btn-success col-12 col-md-12 col-lg-3 col-xl-2"].join(" ")}
                                    activeClassName={classes.isActive}
                                    to='/management/devlist'><BsIcons.BsPlus className="me-3" />Add Question</NavLink>
                            </div>
                        </IconContext.Provider> */}
                    {/* <select className={[classes.select, "form-select"].join(" ")} value="0" aria-label="Default select example">
                            <option value="0">Open this select menu</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                        <select className={[classes.select, "form-select"].join(" ")} value="0" aria-label="Default select example">
                            <option value="0">Open this select menu</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select> */}
                    {/* </div> */}
                </div>
            </div>
        </div>
    );
};

export default withRouter(Database);