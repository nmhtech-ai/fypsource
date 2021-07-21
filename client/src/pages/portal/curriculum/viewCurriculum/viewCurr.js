import React, { useState, useEffect } from 'react';
import classes from './viewCurr.module.css';
import { withRouter } from 'react-router-dom';
import CTable from '../editCurriculum/cTable';
import axios from '../../../../config/axiosConfig';

const ViewCurr = (props) => {

    const [grade, setGrade] = useState("P2");

    useEffect(() => {
        axios({
            method: "GET",
            withCredentials: true,
            url: "/getuser",
        }).then((res) => {
            if (!res.data.isAuthenticated) {
                props.history.push("/login");
            }
        })
    }, [props])

    return (
        <React.Fragment>
            <div>
                <select
                    className={[classes.select, "form-select"].join(" ")}
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)} >
                    <option value="P1">Primary One 小一</option>
                    <option value="P2">Primary Two 小二</option>
                    <option value="P3">Primary Three 小三</option>
                    <option value="P4">Primary Four 小四</option>
                    <option value="P5">Primary Five 小五</option>
                    <option value="P6">Primary Six 小六</option>
                    <option value="S1">Secondary One 中一</option>
                    <option value="S2">Secondary Two 中二</option>
                    <option value="S3">Secondary Three 中三</option>
                </select>
            </div>
            <h5>First Term 上學期</h5>
            <hr />
            <CTable grade={grade} semester={"A"} />
            <h5>Final Term 下學期</h5>
            <hr />
            <CTable grade={grade} semester={"B"} />
        </React.Fragment >
    );
};

export default withRouter(ViewCurr);