import React, { useEffect, Suspense } from 'react';
import { withRouter, Route, Redirect } from 'react-router-dom';
import axios from '../config/axiosConfig';
import classes from './other.module.css';
import Loader from '../components/loader/loader';
import SelectTopic from './selectTopic/selectTopic';
import SelectSubtopic from './selectSubtopic/selectSubtopic';
import Exercise from './exercise/exercise';
const Welcome = React.lazy(() => import('../pages/portal/welcome/welcome'));


const Question = (props) => {

    useEffect(() => {
        document.title = "MathX";

        axios({
            method: "GET",
            withCredentials: true,
            url: "/v1/users/auth",
        }).then((res) => {
            if (res.data.isAuthenticated !== true) {
                props.history.push("./login");
            }
        })
    }, [props]);

    return (
        <div>
            <h2 className={classes.header}>數學練習</h2>
            <hr />
            <div className={[classes.container, "container"].join(" ")}>
                <div className="row">
                    <Suspense fallback={<Loader bg="white" />}>
                        <Route path="/portal/exercise/:code/:id" component={() => <Exercise />} />
                        <Route exact path="/portal/exercise/:id" component={() => <SelectSubtopic />} />
                        <Route exact path="/portal/exercise" component={() => <SelectTopic />} />
                    </Suspense>
                </div>
            </div>
        </div>
    );
};

export default withRouter(Question);