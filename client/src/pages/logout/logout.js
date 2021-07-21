import React from 'react';
import axios from '../../config/axiosConfig';
import { withRouter } from 'react-router-dom';

const Logout = (props) => {

    axios({
        method: "GET",
        withCredentials: true,
        url: "/v1/users/logout",
    }).then((res) => {
        props.history.push("/login");
    })

    return (
        <p></p>
    );
};

export default withRouter(Logout);