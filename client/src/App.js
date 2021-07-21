import React, { Suspense } from 'react';
import './App.css';
// import LoaderHOC from "./hoc/loadCheck/loaderCheck";
import Loader from './components/loader/loader';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import TSSignUp from './pages/signup/tp_signup';
// import Portal from './hoc/portal/portal';
const Auth = React.lazy(() => import('./hoc/auth/auth'));
const Portal = React.lazy(() => import('./hoc/portal/portal'));
const Logout = React.lazy(() => import('./pages/logout/logout'));

function App() {
    return (
        <Suspense fallback={<Loader bg="image" />}>
            {/*<LoaderHOC> */}
            <Router >
                <div className="App">
                    <Switch>
                        <Route path="/login" component={() => <Auth />} />
                        <Route path="/signup" component={() => <TSSignUp />} />
                        <Route path="/portal" component={() => <Portal />} />
                        {/* <Route path="/profile" component={() => <Portal />} />
                        <Route path="/management" component={() => <Portal />} />
                        <Route exact path="/database" component={() => <Portal />} />
                        <Route path="/curriculum" component={() => <Portal />} />
                        <Route exact path="/instructions" component={() => <Portal />} />
                        <Route exact path="/settings" component={() => <Portal />} /> */}
                        <Route path="/logout" component={() => <Logout />} />
                        <Redirect from="/" to="/login" />
                    </Switch>
                </div>
            </Router >
            {/*</LoaderHOC>*/}
        </Suspense >
    );
};

export default App;