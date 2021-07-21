import React, { useState, useEffect } from 'react';
import axios from '../../../../config/axiosConfig';
import Modal from '../../../../components/modal/modal';
import classes from './clientTable.module.css';
import * as roles from '../../../../contexts/roles';


const ClientTable = (props) => {

    const [modalShow, setModalShow] = useState(false);
    const [userDetails, setUserDetails] = useState();
    const [datalist, setDataList] = useState([]);
    const [header, setHeader] = useState();

    useEffect(() => {
        axios({
            method: "POST",
            data: {
                group: "Clients",
                role: props.role
            },
            withCredentials: true,
            url: "/v1/users/",
        }).then((res) => {

            switch (props.role) {
                case roles.STUDENT: default:
                    setHeader(
                        <React.Fragment>
                            <th className="col-1" scope="col"></th>
                            <th className="col" scope="col">Username</th>
                            <th className="col" scope="col">Nickname</th>
                            <th className="col" scope="col">Fullname</th>
                            <th className="col" scope="col">Gender</th>
                            <th className="col" scope="col">Mobile</th>
                            <th className="col" scope="col">Email</th>
                            <th className="col" scope="col">Birthdate</th>
                            <th className="col" scope="col">LinkAcc</th>
                            <th className="col" scope="col">School</th>
                            <th className="col" scope="col">Grade</th>
                        </React.Fragment>
                    ); break;
                case roles.PARENT:
                    setHeader(
                        <React.Fragment>
                            <th className="col-1" scope="col"></th>
                            <th className="col" scope="col">Username</th>
                            <th className="col" scope="col">Nickname</th>
                            <th className="col" scope="col">Fullname</th>
                            <th className="col" scope="col">Gender</th>
                            <th className="col" scope="col">Mobile</th>
                            <th className="col" scope="col">Email</th>
                            <th className="col" scope="col">LinkAcc</th>
                        </React.Fragment>
                    ); break;
                case roles.TEACHER:
                    setHeader(
                        <React.Fragment>
                            <th className="col-1" scope="col"></th>
                            <th className="col" scope="col">Username</th>
                            <th className="col" scope="col">Nickname</th>
                            <th className="col" scope="col">Fullname</th>
                            <th className="col" scope="col">Gender</th>
                            <th className="col" scope="col">Mobile</th>
                            <th className="col" scope="col">Email</th>
                            <th className="col" scope="col">School</th>
                        </React.Fragment>
                    ); break;
            }


            setDataList(res.data.map((doc, index) => {
                switch (props.role) {
                    case roles.STUDENT: default:
                        return (
                            <React.Fragment key={index}>
                                <tr className={classes.row} key={index} onClick={() => {
                                    setModalShow(true);
                                    setUserDetails(doc);
                                }}>
                                    <th scope="row" key={index}>{index + 1}</th>
                                    <td key={index + 1}>{doc.authId.username}</td>
                                    <td key={index + 2}>{doc.nickname}</td>
                                    <td key={index + 3}>{doc.fullname}</td>
                                    <td key={index + 4}>{doc.gender}</td>
                                    <td key={index + 5}>{doc.mobile}</td>
                                    <td key={index + 6}>{doc.email}</td>
                                    <td key={index + 7}>{doc.birthdate}</td>
                                    <td key={index + 8}>{doc.linkaccount}</td>
                                    <td key={index + 9}>{doc.school}</td>
                                    <td key={index + 10}>{doc.grade}</td>
                                </tr >
                            </React.Fragment>
                        );
                    case roles.PARENT:
                        return (
                            <React.Fragment key={index}>
                                <tr className={classes.row} key={index} onClick={() => {
                                    setModalShow(true);
                                    setUserDetails(doc);
                                }}>
                                    <th scope="row" key={index}>{index + 1}</th>
                                    <td key={index + 1}>{doc.authId.username}</td>
                                    <td key={index + 2}>{doc.nickname}</td>
                                    <td key={index + 3}>{doc.fullname}</td>
                                    <td key={index + 4}>{doc.gender}</td>
                                    <td key={index + 5}>{doc.mobile}</td>
                                    <td key={index + 6}>{doc.email}</td>
                                    <td key={index + 7}>{doc.linkaccount}</td>
                                </tr >
                            </React.Fragment>
                        );
                    // case roles.TEACHER:
                    //     return (
                    //         <React.Fragment key={index}>
                    //             <tr className={classes.row} key={index} onClick={() => {
                    //                 setModalShow(true);
                    //                 setUserDetails(doc);
                    //             }}>
                    //                 <th scope="row" key={index}>{index + 1}</th>
                    //                 <td key={index + 1}>{doc.authId.username}</td>
                    //                 <td key={index + 2}>{doc.nickname}</td>
                    //                 <td key={index + 3}>{doc.fullname}</td>
                    //                 <td key={index + 4}>{doc.gender}</td>
                    //                 <td key={index + 5}>{doc.mobile}</td>
                    //                 <td key={index + 6}>{doc.email}</td>
                    //                 <td key={index + 7}>{doc.school}</td>
                    //             </tr >
                    //         </React.Fragment>
                    //     );
                }

            }));

        })
    }, [props.role]);

    return (
        <React.Fragment>
            <div className={classes.tablediv}>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            {header}
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

export default ClientTable;