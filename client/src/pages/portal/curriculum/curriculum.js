import React, { Suspense, useEffect } from 'react';
import { withRouter, NavLink, Route } from 'react-router-dom';
import axios from '../../../config/axiosConfig';
import classes from './curriculum.module.css';
import AddCurriculum from './addCurriculum/addCurr';
import ViewCurriculum from './viewCurriculum/viewCurr';
import Loader from '../../../components/loader/loader';


const Management = (props) => {

    useEffect(() => {
        document.title = "MathX | Curriculum";

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
            <h2>Curriculum</h2>
            <hr />
            <div className={[classes.container, "container"].join(" ")}>
                <div className="row">
                    <div className={classes.btnList}>
                        {/* <NavLink
                            exact={true}
                            className={[
                                classes.button,
                                "btn btn-outline-primary col-12 col-md-12 col-lg-3 col-xl-2"].join(" ")}
                            activeClassName={[classes.isActive, "btn-primary"].join(" ")}
                            to='/portal/curriculum/view'>View Curriculum</NavLink> */}
                        <NavLink
                            exact={true}
                            className={[
                                classes.button,
                                "btn btn-outline-success col-12 col-md-12 col-lg-3 col-xl-2"].join(" ")}
                            activeClassName={[classes.isActive, "btn-success"].join(" ")}
                            to='/portal/curriculum/add'>Add Curriculum</NavLink>
                    </div>
                    <Suspense fallback={<Loader bg="white" />}>
                        <Route exact path='/portal/curriculum/view' component={() => <ViewCurriculum />} />
                        <Route exact path='/portal/curriculum/add' component={() => <AddCurriculum />} />
                    </Suspense>

                </div>
            </div>
        </div>
    );
};

export default withRouter(Management);