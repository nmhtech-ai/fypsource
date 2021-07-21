import React, { useState, Suspense, useEffect } from 'react';
import { withRouter, Link, Route } from 'react-router-dom';
import axios from '../../config/axiosConfig';
import classes from './performance.module.css';
import { IconContext } from "react-icons";
import SelectSubtopic from '../selectSubtopic/selectSubtopic';
import { AiOutlineConsoleSql } from 'react-icons/ai';
// import Loader from '../components/loader/loader';

const Performance = (props) => {

    const [oRatings, setORatings] = useState([]);
    const [tRatings, setTRatings] = useState([]);


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
                    url: "/v1/users/ratings",
                    params: {
                        // grade: "P2",
                        // semester: "B"
                    }
                }).then((res) => {
                    console.log(res.data);
                    setORatings(res.data.oRating.ratings);
                    setTRatings(res.data.tRating.ratings);
                    console.log(oRatings);
                    console.log(tRatings);
                    // // setData(res.data);
                    // console.log(res.data);
                    // console.log(data.oRating.ratings);
                    // console.log(data.tRating.ratings);
                })
            }

            return function cleanup() {
                res.data.isAuthenticated = false;
            }
        })
    }, []);

    return (
        <div>
            <h2 className={classes.header}>學習表現</h2>
            <hr />
            <div className={[classes.container, "container"].join(" ")}>
                <div className="row">
                    <div className="col col-6">
                        <br></br>
                        <h4 style={{ color: "blue" }}>整體表現</h4>
                        {oRatings.map((item, index) => {
                            return (
                                <React.Fragment key={index}>
                                    <IconContext.Provider value={{ color: "black", size: "2.4rem" }}>
                                        {/* <Link to={"/portal/exercise/" + item.code} className={classes.link}> */}
                                        <div className={[classes.card, "col"].join(" ")} key={index}>
                                            <div className="card h-100">
                                                <div className="card-body">
                                                    <span className="align-middle">{item.skillId.name[0].description}</span>
                                                    <h5 className={[classes.text, "card-title align-middle"].join(" ")}>{Math.round(item.score * 100000)}</h5>
                                                </div>
                                            </div>
                                        </div>
                                        {/* </Link> */}
                                    </IconContext.Provider>
                                </React.Fragment>
                            );
                        })}
                    </div >
                    <div className="col col-6">
                        <br></br>
                        <h4 style={{ color: "blue" }}>題目表現</h4>
                        {tRatings.map((item, index) => {
                            return (
                                <React.Fragment key={index}>
                                    <IconContext.Provider value={{ color: "black", size: "2.4rem" }}>
                                        {/* <Link to={"/portal/exercise/" + item.code} className={classes.link}> */}
                                        <div className={[classes.card, "col"].join(" ")} key={index}>
                                            <div className="card h-100">
                                                <div className="card-body">
                                                    <span className="align-middle">{item.typeId.name[0].description}</span>
                                                    <h5 className={[classes.text, "card-title align-middle"].join(" ")}>{Math.round(item.score * 100000)}</h5>
                                                </div>
                                            </div>
                                        </div>
                                        {/* </Link> */}
                                    </IconContext.Provider>
                                </React.Fragment>
                            );
                        })}
                    </div >
                </div>
            </div>
        </div>

    );

};


export default withRouter(Performance);