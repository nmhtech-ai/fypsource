import React, { useState, useEffect } from 'react';
import axios from '../../../../config/axiosConfig';
import Modal from '../../../../components/modal/modal';
import classes from './devTable.module.css';


const DevTable = (props) => {

    const [modalShow, setModalShow] = useState(false);
    const [userDetails, setUserDetails] = useState();
    const [datalist, setDataList] = useState([]);

    useEffect(() => {
        axios({
            method: "POST",
            data: {
                group: "Developers"
            },
            withCredentials: true,
            url: "/v1/users/",
        }).then((res) => {
            console.log(res.data);
            setDataList(res.data.map((doc, index) => {
                return (
                    <React.Fragment key={index}>
                        <tr className={classes.row} key={index} onClick={() => {
                            setModalShow(true);
                            setUserDetails(doc);
                        }}>
                            <th scope="row" key={index}>{index + 1}</th>
                            <td key={index + 1}>{doc.role}</td>
                            <td key={index + 2}>{doc.authId.username}</td>
                            <td key={index + 3}>{doc.nickname}</td>
                            <td key={index + 4}>{doc.fullname}</td>
                            <td key={index + 5}>{doc.gender}</td>
                            <td key={index + 6}>{doc.mobile}</td>
                            <td key={index + 7}>{doc.email}</td>
                            <td key={index + 8}>{doc.birthdate}</td>
                        </tr >
                    </React.Fragment>
                )
            }));

        })
    }, []);

    return (
        <React.Fragment>
            <div className={classes.tablediv}>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th className="col-1" scope="col"></th>
                            <th className="col" scope="col">Role</th>
                            <th className="col" scope="col">Username</th>
                            <th className="col" scope="col">Nickname</th>
                            <th className="col" scope="col">Fullname</th>
                            <th className="col" scope="col">Gender</th>
                            <th className="col" scope="col">Mobile</th>
                            <th className="col" scope="col">Email</th>
                            <th className="col" scope="col">Birthdate</th>
                        </tr>
                    </thead>
                    <tbody>
                        {datalist}
                    </tbody>
                    <Modal
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                        user={userDetails}
                        type="UserEdit"
                    />
                </table>
            </div>
        </React.Fragment>
    );
};

export default DevTable;