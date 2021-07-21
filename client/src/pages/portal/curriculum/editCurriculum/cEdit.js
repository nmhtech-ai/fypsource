import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import classes from './cEdit.module.css';
import axios from '../../../../config/axiosConfig';

const CEdit = (props) => {

    const [confirmDel, setConfirmDel] = useState(false);
    const [editor, setEditor] = useState("");
    const [duplicate, setDuplicate] = useState(false);
    const [notEqual, setNotEqual] = useState(false);
    const id = useState(props.details._id)[0];
    const [code, setCode] = useState(props.details.code);
    const [grade, setGrade] = useState(props.details.grade);
    const [semester, setSemester] = useState(props.details.semester);
    const [zhtopic, setZHTopic] = useState(props.details.zhtopic);
    const [entopic, setENTopic] = useState(props.details.entopic);
    const [zhsubtopics, setZHSubtopics] = useState(props.details.zhsubtopics);
    const [ensubtopics, setENSubtopics] = useState(props.details.ensubtopics);
    const [order, setOrder] = useState(props.details.order);

    useEffect(() => {
        axios({
            method: "GET",
            withCredentials: true,
            url: "/getuser",
        }).then((res) => {
            setEditor(res.data.role);
        })
    }, [props.details])


    const onSaveHandler = () => {
        if (ensubtopics.length !== zhsubtopics.length) {
            setNotEqual(true);
        } else {
            axios({
                method: 'POST',
                data: {
                    _id: id,
                    code: code,
                    editor: editor,
                    grade: grade,
                    semester: semester,
                    zhtopic: zhtopic,
                    zhsubtopics: zhsubtopics,
                    entopic: entopic,
                    ensubtopics: ensubtopics,
                    order: order
                },
                withCredentials: true,
                url: "/curriculum/edit",
            }).then((res) => {
                // console.log(res.data.duplicate);
                if (res.data.duplicate) {
                    setDuplicate(true);
                } else {
                    props.history.push("/curriculum/view");
                }
            })
        }
    }

    const onDeleteHandler = () => {
        axios({
            method: 'POST',
            data: {
                editor: editor,
                _id: id,
                code: code
            },
            withCredentials: true,
            url: "/curriculum/delete",
        }).then((res) => {
            props.history.push("/curriculum/view");
        })
    }

    let confirmDelete = (
        <React.Fragment>
            <p style={{ color: "red", textAlign: "end", marginTop: "30px" }}>Are you sure you want to delete?</p>
            <button className={[classes.button, "btn btn-lg btn-secondary"].join(" ")} onClick={() => setConfirmDel(false)}>No</button>
            <button className={[classes.button, "btn btn-lg btn-danger"].join(" ")} onClick={onDeleteHandler}>Yes</button>
        </React.Fragment>
    );

    let notConfirmDelete = (
        <React.Fragment>
            <button className={[classes.button, "btn btn-secondary"].join(" ")} onClick={props.onHide}>Cancel</button>
            <button className={[classes.button, "btn btn-danger"].join(" ")} onClick={() => setConfirmDel(true)}>Delete</button>
            <button className={[classes.button, "btn btn-primary"].join(" ")} onClick={onSaveHandler}>Save</button>
        </React.Fragment>
    )

    return (
        <div className={[classes.container, "container container-sm"].join(" ")}>
            <div className="row">
                <p className={[classes.label, "col-12 col-sm-6"].join(" ")}>Code</p>
                <p className="col-12 col-sm-6">
                    <input
                        type="text"
                        className={[classes.input, "form-control"].join(" ")}
                        onChange={(e) => setCode(e.target.value)}
                        onClick={() => setDuplicate(false)}
                        value={code}
                        placeholder="Curriculum Code" />
                </p>
                <p className={[classes.label, "col-12 col-sm-6"].join(" ")}>Grade</p>
                <p className="col-12 col-sm-6">
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
                </p>
                <p className={[classes.label, "col-12 col-sm-6"].join(" ")}>Semester</p>
                <p className="col-12 col-sm-6">
                    <select
                        className={[classes.select, "form-select"].join(" ")}
                        value={semester}
                        onChange={(e) => setSemester(e.target.value)} >
                        <option value="A">First Semester 上學期</option>
                        <option value="B">Final Semester 下學期</option>
                    </select>
                </p>
                <p className={[classes.label, "col-12 col-sm-6"].join(" ")}>Order</p>
                <p className="col-12 col-sm-6">
                    <input
                        type="number"
                        className={[classes.input, "form-control"].join(" ")}
                        onChange={(e) => setOrder(e.target.value)}
                        onClick={() => setDuplicate(false)}
                        value={order}
                        placeholder="Order" />
                </p>
                <p className={[classes.label, "col-12 col-sm-6"].join(" ")}>主課題名稱</p>
                <p className="col-12 col-sm-6">
                    <input
                        type="text"
                        className={[classes.input, "form-control"].join(" ")}
                        onChange={(e) => setZHTopic(e.target.value)}
                        onClick={() => setDuplicate(false)}
                        value={zhtopic}
                        placeholder="Topic (ZH)" />
                </p>
                <p className={[classes.label, "col-12 col-sm-6"].join(" ")}>分課題名稱</p>
                <p className="col-12 col-sm-6">
                    <input
                        type="text"
                        className={[classes.input, "form-control"].join(" ")}
                        onChange={(e) => setZHSubtopics(e.target.value.split(","))}
                        onClick={() => setNotEqual(false)}
                        value={zhsubtopics}
                        placeholder="分課題名稱" />
                </p>
                <p className={[classes.label, "col-12 col-sm-6"].join(" ")}>Topic</p>
                <p className="col-12 col-sm-6">
                    <input
                        type="text"
                        className={[classes.input, "form-control"].join(" ")}
                        onChange={(e) => setENTopic(e.target.value)}
                        onClick={() => setDuplicate(false)}
                        value={entopic}
                        placeholder="Topic" />
                </p>
                <p className={[classes.label, "col-12 col-sm-6"].join(" ")}>Subtopics</p>
                <p className="col-12 col-sm-6">
                    <input
                        type="text"
                        className={[classes.input, "form-control"].join(" ")}
                        onChange={(e) => setENSubtopics(e.target.value.split(","))}
                        onClick={() => setNotEqual(false)}
                        value={ensubtopics}
                        placeholder="Subtopic" />
                </p>
                {duplicate ? <p className="col-12" style={{ color: "red" }}>Curriculum code OR Topic name duplicated!</p> : null}
                {notEqual ? <p className="col-12" style={{ color: "red" }}>Number of subtopics are unequal!</p> : null}
            </div >
            {!confirmDel ? notConfirmDelete : confirmDelete}
        </div >
    );
};

export default withRouter(CEdit);