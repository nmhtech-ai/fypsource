import React, { useState, useEffect } from 'react';
import classes from './addCurr.module.css';
import axios from '../../../../config/axiosConfig';
import { withRouter } from 'react-router-dom';

const AddCurr = (props) => {

    const [entopic, setENTopic] = useState();
    const [zhtopic, setZHTopic] = useState();
    const [ensubtopics, setENSubtopic] = useState();
    const [zhsubtopics, setZHSubtopic] = useState();
    const [grade, setGrade] = useState("P2");
    const [semester, setSemester] = useState("B");
    const [editor, setEditor] = useState("");
    const [duplicate, setDuplicate] = useState(false);
    const [notEqual, setNotEqual] = useState(false);
    const [code, setCode] = useState();

    useEffect(() => {
        axios({
            method: "GET",
            withCredentials: true,
            url: "/getuser",
        }).then((res) => {
            setEditor(res.data.role);
        })
    }, [editor])


    const onSaveHandler = () => {
        if (ensubtopics.length !== zhsubtopics.length) {
            setNotEqual(true);
        } else {
            axios({
                method: 'POST',
                data: {
                    code: code,
                    editor: editor,
                    grade: grade,
                    semester: semester,
                    zhtopic: zhtopic,
                    zhsubtopics: zhsubtopics,
                    entopic: entopic,
                    ensubtopics: ensubtopics
                },
                withCredentials: true,
                url: "/curriculum/add",
            }).then((res) => {
                console.log(res.data);
                if (res.data.success) {
                    alert("Topic added!");
                    props.history.push("/curriculum/add");
                } else if (res.data.duplicate) {
                    setDuplicate(true);
                }
            })
        }
    }

    const onClearHandler = () => {
        props.history.push("/curriculum/add");
    }

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
                <select
                    className={[classes.select, "form-select"].join(" ")}
                    value={semester}
                    onChange={(e) => setSemester(e.target.value)} >
                    <option value="A">First Semester 上學期</option>
                    <option value="B">Final Semester 下學期</option>
                </select>
                <input
                    type="text"
                    className={[classes.input, "form-control"].join(" ")}
                    onChange={(e) => setCode(e.target.value)}
                    onClick={() => setDuplicate(false)}
                    placeholder="Curriculum Code" />
                <div className="input-group">
                    <input
                        type="text"
                        className={[classes.input, "form-control"].join(" ")}
                        onChange={(e) => setENTopic(e.target.value)}
                        onClick={() => setDuplicate(false)}
                        placeholder="Topic" />
                    <input
                        type="text"
                        className={[classes.input, "form-control"].join(" ")}
                        onChange={(e) => setZHTopic(e.target.value)}
                        onClick={() => setDuplicate(false)}
                        placeholder="主課題名稱" />
                </div>
                <div className="input-group">
                    <input
                        type="text"
                        className={[classes.input, "form-control"].join(" ")}
                        onChange={(e) => setENSubtopic(e.target.value.split(","))}
                        onClick={() => setNotEqual(false)}
                        placeholder="Subtopic" />
                    <input
                        type="text"
                        className={[classes.input, "form-control"].join(" ")}
                        onChange={(e) => setZHSubtopic(e.target.value.split(","))}
                        onClick={() => setNotEqual(false)}
                        placeholder="分課題名稱" />
                </div><br />
                <p className="form-label">Please separate subtopics by "," (e.g. Subtopic 1, Subtopic 2, Subtopic 3)</p>
                <p className="form-label">請以 "," 分隔與標示分課題 (例如：分課題 1, 分課題 2, 分課題 3)</p>
            </div>
            <div className={[classes.container, "container container-sm"].join(" ")}>
                <div className="row">
                    <div className="col-12 text-start">
                        <p><span className={classes.label}>Code</span>
                            {code
                                ? <span className={classes.text}>{code}</span>
                                : <span className={classes.text}>Input Code</span>}
                        </p>
                    </div>
                </div>
                <div className="row">
                    {duplicate ? <p style={{ color: "red" }}>Curriculum code OR Topic name duplicated!</p> : null}
                    {notEqual ? <p style={{ color: "red" }}>Number of subtopics are unequal!</p> : null}
                    <div className="col-12 col-md-6">
                        <p><span className={classes.label}>Topic</span>
                            {entopic
                                ? <span className={classes.label}>{entopic}</span>
                                : <span className={classes.text}>Input Topic</span>}
                        </p>
                        {!ensubtopics
                            ? <p className={classes.label}>Subtopic <span className={classes.text}>Input Subtopic</span> </p>
                            : ensubtopics.map((subtopic, index) => {
                                return (
                                    <p>
                                        <span className={classes.label} key={index}>Subtopic {index + 1}</span>
                                        <span className={classes.text} key={index}>{subtopic}</span>
                                    </p>)
                            })
                        }
                    </div>
                    <div className="col-12 col-md-6">
                        <p>
                            <span className={classes.label}>主課題名稱</span>
                            {zhtopic
                                ? <span className={classes.label}>{zhtopic}</span>
                                : <span className={classes.text}>輸入主課題名稱</span>}
                        </p>
                        {!zhsubtopics
                            ? <p className={classes.label}>分課題名稱 <span className={classes.text}>輸入分課題名稱</span> </p>
                            : zhsubtopics.map((subtopic, index) => {
                                return (
                                    <p>
                                        <span className={classes.label} key={index}>分課題 {index + 1}</span>
                                        <span className={classes.text} key={index}>{subtopic}</span>
                                    </p>)
                            })
                        }
                    </div>
                </div>
            </div>
            <p style={{ color: "red", marginTop: "10px", marginBottom: "6px", fontSize: "12px" }}>Upon saving, the item will be place at last. Please amend the order in the "View Curriculm" Page if neccessary.</p>
            <p style={{ color: "red", marginTop: "5px", fontSize: "12px" }}>儲存後，項目會被放到列表的最尾端。 如有需要，請在"View Curriculm"頁面更改次序。</p>
            <button className={[classes.button, "btn btn-success"].join(" ")} onClick={onSaveHandler}>Save</button>
            <button className={[classes.button, "btn btn-secondary"].join(" ")} onClick={onClearHandler}>Clear</button>
        </React.Fragment >
    );
};

export default withRouter(AddCurr);