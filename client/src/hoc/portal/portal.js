import React, { useState, useEffect } from 'react';
import DevPortal from './devportal/devportal';
// import ClientPortal from './clientportal/clientportal';
import * as groups from '../../contexts/groups';
import axios from '../../config/axiosConfig';
import { withRouter } from 'react-router-dom';

const Portal = (props) => {

    const [content, setContent] = useState();

    useEffect(() => {
        axios({
            method: "GET",
            withCredentials: true,
            url: "/v1/users/auth",
        }).then((res) => {
            if (res.data.isAuthenticated === true) {
                switch (res.data.group) {
                    case groups.DEVELOPMENT: case groups.CLIENT:
                        setContent(<DevPortal role={res.data.role} />);
                        break;
                    // case groups.CLIENT:
                    //     setContent(<ClientPortal />);
                    //     break;
                    default:
                        break;
                }
            } else {
                props.history.replace("/login");
            }
        })
    }, [props])

    return (
        <div>
            {content}
        </div>
    );
};

export default withRouter(Portal);