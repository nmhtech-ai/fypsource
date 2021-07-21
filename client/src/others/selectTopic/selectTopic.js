import React, { useState, Suspense, useEffect } from 'react';
import { withRouter, Link, Route } from 'react-router-dom';
import axios from '../../config/axiosConfig';
import classes from './selectTopic.module.css';
import { IconContext } from "react-icons";
import SelectSubtopic from '../selectSubtopic/selectSubtopic';
// import Loader from '../components/loader/loader';

const SelectTopic = (props) => {

    const [topics, setTopics] = useState([]);


    useEffect(() => {
        document.title = "MathX";

        axios({
            method: "GET",
            withCredentials: true,
            url: "/v1/users/auth",
        }).then((res) => {
            if (res.data.isAuthenticated !== true) {
                props.history.push("./login");
            } else {
                axios({
                    method: "GET",
                    withCredentials: true,
                    url: "/v1/topic",
                    params: {
                        grade: "P2",
                        semester: "B"
                    }
                }).then((res) => {
                    setTopics(res.data.data.topics);
                })
            }

            return function cleanup() {
                res.data.isAuthenticated = false;
            }
        })
    }, []);

    return (
        <div>
            {topics.map((item, index) => {
                return (
                    <React.Fragment key={index}>
                        <IconContext.Provider value={{ color: "black", size: "2.4rem" }}>
                            <Link to={"/portal/exercise/" + item.code} className={classes.link}>
                                <div className={[classes.card, "col"].join(" ")} key={index}>
                                    <div className="card h-100">
                                        <div className="card-body">
                                            <span className="align-middle">{item.code}</span>
                                            <h5 className={[classes.text, "card-title align-middle"].join(" ")}>{item.name[0].description}</h5>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </IconContext.Provider>
                    </React.Fragment>
                );
            })}
        </div >
    );

};


export default withRouter(SelectTopic);