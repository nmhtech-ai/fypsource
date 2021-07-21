import React, { Suspense } from 'react';
import { Route, Redirect } from "react-router-dom";
import classes from './devportal.module.css';

import Sidebar from '../../../components/sidebar/sidebar';
// import LoaderHOC from '../../../hoc/loadCheck/loaderCheck';
import Curriculum from '../../../pages/portal/curriculum/curriculum';
import Loader from '../../../components/loader/loader';
const Profile = React.lazy(() => import('../../../pages/portal/profile/profile'));
const Management = React.lazy(() => import('../../../pages/portal/management/management'));
const Welcome = React.lazy(() => import('../../../pages/portal/welcome/welcome'));
const UnderConstruction = React.lazy(() => import('../../../pages/503/503'));
const Database = React.lazy(() => import('../../../pages/portal/database/database'));
// const Curriculum = React.lazy(() => import('../../../pages/portal/curriculum/curriculum'));
const Question = React.lazy(() => import('../../../others/question'));
const Lecture = React.lazy(() => import('../../../others/lecture/lecture'));
const Performance = React.lazy(() => import('../../../others/performance/performance'));

const DevPortal = (props) => {
    return (
        <div>
            <Sidebar role={props.role} />
            <div className={classes.portalContent}>
                <Suspense fallback={<Loader bg="white" />}>
                    <Route exact path="/portal" component={() => <Welcome role={props.role} />} />
                    <Route exact path="/portal/profile" component={() => <Profile />} />
                    <Route path="/portal/management/list" component={() => <Management />} />
                    <Route exact path="/portal/management/adduser" component={() => <Management />} />
                    <Route exact path="/portal/management" ><Redirect to="/portal/management/list/developers" /></Route>
                    <Route exact path="/portal/database" component={() => <Database />} />
                    <Route exact path="/portal/lecture" component={() => <Lecture />} />
                    <Route exact path="/portal/performance" component={() => <Performance />} />
                    <Route exact path="/portal/curriculum/view" component={() => <Curriculum />} />
                    <Route exact path="/portal/curriculum/add" component={() => <Curriculum />} />
                    <Route exact path="/portal/curriculum" ><Redirect to="/portal/curriculum/add" /></Route>
                    <Route exact path="/portal/settings" component={() => <UnderConstruction />} />

                    <Route path="/portal/exercise" component={() => <Question />} />
                </Suspense>
            </div>
        </div >
    )
}

export default DevPortal;
