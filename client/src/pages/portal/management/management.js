import React, { Suspense, useEffect } from 'react';
import { withRouter, NavLink, Route } from 'react-router-dom';
import axios from '../../../config/axiosConfig';
import classes from './management.module.css';
import Loader from '../../../components/loader/loader';
import * as roles from '../../../contexts/roles';
const DevTable = React.lazy(() => import('./devTable/devTable'));
const ClientTable = React.lazy(() => import('./clientTable/clientTable'));
const AddUser = React.lazy(() => import('./addUser/addUser'));


const Management = (props) => {

    useEffect(() => {
        document.title = "MathX | Management";

        axios({
            method: "GET",
            withCredentials: true,
            url: "/v1/users/auth",
        }).then((res) => {
            if (res.data.isAuthenticated !== true) {
                props.history.push("./login");
            }
        })
    }, [props])

    return (
        <div>
            <h2>Users Management</h2>
            <hr />
            <div className={[classes.container, "container"].join(" ")}>
                <div className="row">
                    <div className={classes.btnList}>
                        <NavLink
                            exact={true}
                            className={[
                                classes.button,
                                "btn btn-outline-primary col-12 col-md-2 shadow-none"].join(" ")}
                            activeClassName={classes.isActive}
                            to='/portal/management/list/developers'>Developers</NavLink>
                        {/* <NavLink
                            exact={true}
                            className={[
                                classes.button,
                                "btn btn-outline-primary col-12 col-md-2 shadow-none"].join(" ")}
                            activeClassName={classes.isActive}
                            to='/portal/management/list/teachers'>Teachers</NavLink> */}
                        <NavLink
                            exact={true}
                            className={[
                                classes.button,
                                "btn btn-outline-primary col-12 col-md-2 shadow-none"].join(" ")}
                            activeClassName={classes.isActive}
                            to='/portal/management/list/parents'>Parents</NavLink>
                        <NavLink
                            exact={true}
                            className={[
                                classes.button,
                                "btn btn-outline-primary col-12 col-md-2 shadow-none"].join(" ")}
                            activeClassName={classes.isActive}
                            to='/portal/management/list/students'>Students</NavLink>
                        <NavLink
                            exact={true}
                            className={[
                                classes.button,
                                "btn btn-outline-primary col-12 col-md-2 shadow-none"].join(" ")}
                            activeClassName={classes.isActive}
                            to='/portal/management/adduser'>Add Users</NavLink>

                    </div>
                    <Suspense fallback={<Loader bg="white" />}>
                        <Route exact path='/portal/management/list/developers' component={() => <DevTable />} />
                        <Route exact path='/portal/management/list/teachers' component={() => <ClientTable role={roles.TEACHER} />} />
                        <Route exact path='/portal/management/list/parents' component={() => <ClientTable role={roles.PARENT} />} />
                        <Route exact path='/portal/management/list/students' component={() => <ClientTable role={roles.STUDENT} />} />
                        <Route exact path='/portal/management/adduser' component={() => <AddUser />} />
                    </Suspense>
                </div>
            </div>
        </div>
    );
};

export default withRouter(Management);