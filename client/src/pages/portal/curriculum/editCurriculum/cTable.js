import React, { useState, useEffect } from 'react';
import axios from '../../../../config/axiosConfig';
import Modal from '../../../../components/modal/modal';
import classes from './cTable.module.css';

const CTable = (props) => {

    const [CList, setList] = useState();
    const [modalShow, setModalShow] = useState(false);
    const [curriculumDetails, setCurriculumDetails] = useState();


    const orderSort = (a, b) => {
        return a.order - b.order;
    };

    useEffect(() => {
        axios({
            method: "POST",
            data: {
                grade: props.grade,
                semester: props.semester
            },
            withCredentials: true,
            url: "/getcurriculum",
        }).then((res) => {
            setList(res.data.sort(orderSort).map((doc, index) => {

                let date = new Date(doc.updated);
                return (
                    <React.Fragment key={index}>
                        <tr className={classes.row} key={doc._id} onClick={() => {
                            setModalShow(true);
                            setCurriculumDetails(doc);
                        }}>
                            <th scope="row">{doc.order}</th>
                            <td>{doc.code}</td>
                            <td>{doc.zhtopic}</td>
                            <td>{doc.zhsubtopics.map((doc, index) => {
                                return (
                                    <table key={index}>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    {doc}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                );
                            })}</td>
                            <td>{doc.entopic}</td>
                            <td>{doc.ensubtopics.map((doc, index) => {
                                return (
                                    <table key={index}>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    {doc}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                );
                            })}</td>
                            <td>{date.toDateString()}</td>
                        </tr >
                    </React.Fragment>

                )
            }));
        })
    }, [props]);


    return (
        <div className={classes.tablediv}>
            <table className="table table-hover">
                <thead className={classes.tableHead}>
                    <tr>
                        <th className="col-1" >Order</th>
                        <th className="col" >Code</th>
                        <th className="col" >Topic (ZH)</th>
                        <th className="col" >Subtopic (ZH)</th>
                        <th className="col" >Topic (EN)</th>
                        <th className="col" >Subtopic (EN) </th>
                        <th className="col" >Updated Date</th>
                    </tr>
                </thead>
                <tbody>
                    {CList}
                </tbody>
                <Modal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    details={curriculumDetails}
                    type="CEdit"
                />
            </table >
        </div>

    );
};

export default CTable;