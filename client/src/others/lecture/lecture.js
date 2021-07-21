import React, { useEffect, Suspense } from 'react';
import { withRouter, Route, Redirect } from 'react-router-dom';
import axios from '../../config/axiosConfig';
import classes from './other.module.css';

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
            <h2 className={classes.header}>網上學習</h2>
            <hr />
            <div className={[classes.container, "container"].join(" ")}>
                <div className="video-responsive">
                    <iframe
                        width="853"
                        height="480"
                        src="https://www.youtube.com/embed/XY_J-ldESiI"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="Embedded youtube"
                    />
                </div>
            </div>
        </div>
    );
};

export default withRouter(Question);