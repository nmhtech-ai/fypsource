import React, { useState, Suspense, useEffect } from 'react';
import { withRouter, Link, Route, useParams } from 'react-router-dom';
import axios from '../../config/axiosConfig';
import classes from './selectSubtopic.module.css';
import { IconContext } from "react-icons";
// import Loader from '../components/loader/loader';

const SelectSubtopic = (props) => {

    let { code } = useParams();
    const [subtopics, setSubtopics] = useState([]);

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
                    url: "/v1/subtopic",
                    params: {
                        code: code
                    }
                }).then((res) => {
                    setSubtopics(res.data.subtopics);
                })
            }
        });
    }, [props]);

    return (

        < div >
            {
                subtopics.map((item, index) => {
                    console.log(item.code);
                    return (
                        <React.Fragment key={index}>
                            <IconContext.Provider value={{ color: "black", size: "2.4rem" }}>
                                <Link to={"/portal/exercise/" + item.topicId.code + "/" + item.id} className={classes.link}>
                                    <div className={[classes.card, "col"].join(" ")} key={index}>
                                        <div className="card h-100">
                                            <div className="card-body">
                                                <span className="align-middle">{index + 1}</span>
                                                <h5 className={[classes.text, "card-title align-middle"].join(" ")}>{item.name[0].description}</h5>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </IconContext.Provider>
                        </React.Fragment>
                    );
                })
            }
        </div >
    );

};


export default withRouter(SelectSubtopic);