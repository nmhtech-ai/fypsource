import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import classes from './addUser.module.css';
import axios from '../../../../config/axiosConfig';
import Input from '../../../../components/uInteface/input/input';
import * as roles from '../../../../contexts/roles';
import * as groups from '../../../../contexts/groups';



const AddUser = (props) => {

    const [username, setUsername] = useState("");
    const [nickname, setNickname] = useState("");
    const [fullname, setFullname] = useState("");
    const [gender, setGender] = useState("Male");
    const [mobile, setMobile] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState(roles.STUDENT);
    const [group, setGroup] = useState(groups.CLIENT);
    const [birthdate, setBirthdate] = useState("");
    const [link, setLink] = useState("");
    const [school, setSchool] = useState("");
    const [grade, setGrade] = useState("");
    const [password, setPassword] = useState("");
    const [editor, setEditor] = useState("");
    const [duplicate, setDuplicate] = useState(false);

    useEffect(() => {
        axios({
            method: "GET",
            withCredentials: true,
            url: "/getuser",
        }).then((res) => {
            setEditor(res.data.role);
        })
    }, [editor])

    const roleConverter = (e) => {
        setRole(e.target.value)
        switch (e.target.value) {
            case roles.ADMIN: case roles.DEVELOPER: case roles.EDITOR: case roles.BASIC:
                setGroup(groups.DEVELOPMENT);
                setFullname("---");
                setBirthdate("---");
                setLink("---");
                setSchool("---");
                setGrade("---");
                break;
            case roles.STUDENT: default:
                setGroup(groups.CLIENT);
                setFullname("");
                setBirthdate("");
                setLink("");
                setSchool("");
                setGrade("");
                break;
            case roles.TEACHER:
                setGroup(groups.CLIENT);
                setFullname("---");
                setBirthdate("---");
                setLink("---");
                setSchool("");
                setGrade("---");
                break;
            case roles.PARENT:
                setGroup(groups.CLIENT);
                setFullname("---");
                setBirthdate("---");
                setLink("");
                setSchool("---");
                setGrade("---");
                break;
        }
    }

    const onSaveHandler = () => {
        axios({
            method: 'POST',
            data: {
                editor: editor,
                username: username,
                nickname: nickname,
                fullname: fullname,
                gender: gender,
                mobile: mobile,
                email: email,
                role: role,
                group: group,
                birthdate: birthdate,
                linkaccount: link,
                school: school,
                grade: grade,
                password: password,
            },
            withCredentials: true,
            url: "/signup",
        }).then((res) => {
            console.log(res.data.duplicate);
            if (res.data.duplicate) {
                setDuplicate(true);
            } else {
                if (group === groups.DEVELOPMENT) {
                    props.history.replace("/portal/management/list/developers");
                } else if (role === roles.STUDENT) {
                    props.history.replace("/portal/management/list/students");
                } else if (role === roles.TEACHER) {
                    props.history.replace("/portal/management/list/teachers");
                } else if (role === roles.PARENT) {
                    props.history.replace("/portal/management/list/parents");
                }
            }
        })
    }

    const onClearHandler = () => {
        setUsername("");
        setNickname("");
        setFullname("");
        setGender("Male");
        setMobile("");
        setEmail("");
        setRole(roles.STUDENT);
        setGroup(groups.CLIENT);
        setBirthdate("");
        setLink("");
        setSchool("");
        setGrade("");
        setPassword("");
        setEditor("");
        setDuplicate(false);
    }

    let buttonList = (
        <React.Fragment>
            <div className={[classes.deletebox, "card col-12"].join(" ")} >
                <div className="card-body">
                    <button className={[classes.button, "btn btn-primary"].join(" ")} onClick={onSaveHandler}>Add</button>
                    <button className={[classes.button, "btn btn-secondary"].join(" ")} onClick={onClearHandler}>Clear</button>
                </div>
            </div>
        </React.Fragment >
    )

    return (
        <React.Fragment>
            <div className={[classes.cardContainer, "card"].join(" ")}>
                <div className={[classes.containerBody, "card-body"].join(" ")} >
                    <div className={[classes.containerRow, "row"].join(" ")}>
                        <div className={[classes.card, "card col-md-6"].join(" ")} >
                            <div className="card-body">
                                <h6 className="card-title">Role</h6>
                                <p className="card-text">
                                    <select className={classes.select} value={role} onChange={(e) => roleConverter(e)}>
                                        <option value={roles.ADMIN}>{roles.ADMIN}</option>
                                        <option value={roles.DEVELOPER}>{roles.DEVELOPER}</option>
                                        <option value={roles.EDITOR}>{roles.EDITOR}</option>
                                        <option value={roles.BASIC}>{roles.BASIC}</option>
                                        <option value={roles.STUDENT}>{roles.STUDENT}</option>
                                        <option value={roles.PARENT}>{roles.PARENT}</option>
                                        <option value={roles.TEACHER}>{roles.TEACHER}</option>
                                    </select>
                                </p>
                            </div>
                        </div>
                        <div className={[classes.card, "card col-md-6"].join(" ")} >
                            <div className="card-body">
                                <h6 className="card-title">Group</h6>
                                <p className="card-text">
                                    <Input
                                        inputType="input"
                                        type="text"
                                        placeholder="Group"
                                        value={group}
                                        onChange={(e) => setGroup(e.target.value)}
                                        classassign={[classes.profileInput, "shadow-none"].join(" ")}
                                        disabled
                                    /></p>
                            </div>
                        </div>
                        <div className={[classes.card, "card col-md-4"].join(" ")} >
                            <div className="card-body">
                                <h6 className="card-title">Username</h6>
                                <p className="card-text">
                                    <Input
                                        inputType="input"
                                        type="text"
                                        placeholder="Username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        onClick={() => setDuplicate(false)}
                                        classassign={[classes.profileInput, "shadow-none"].join(" ")}
                                    /></p>
                                {duplicate && <p style={{ color: "red", marginLeft: "20px" }}>Username duplicated!</p>}
                            </div>
                        </div>
                        <div className={[classes.card, "card col-md-4"].join(" ")} >
                            <div className="card-body">
                                <h6 className="card-title">Nickname</h6>
                                <p className="card-text">
                                    <Input
                                        inputType="input"
                                        type="text"
                                        placeholder="Nickname"
                                        value={nickname}
                                        onChange={(e) => setNickname(e.target.value)}
                                        classassign={[classes.profileInput, "shadow-none"].join(" ")}
                                    /></p>
                            </div>
                        </div>
                        {role === roles.STUDENT && <div className={[classes.card, "card col-md-4"].join(" ")} >
                            <div className="card-body">
                                <h6 className="card-title">Fullname</h6>
                                <p className="card-text">
                                    <Input
                                        inputType="input"
                                        type="text"
                                        placeholder="Fullname"
                                        value={fullname}
                                        onChange={(e) => setFullname(e.target.value)}
                                        classassign={[classes.profileInput, "shadow-none"].join(" ")}
                                    />
                                </p>
                            </div>
                        </div>}
                        <div className={[classes.card, "card col-md-4"].join(" ")} >
                            <div className="card-body">
                                <h6 className="card-title">Gender</h6>
                                <p className="card-text">
                                    <select className={classes.select} value={gender} onChange={(e) => setGender(e.target.value)} >
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </p>
                            </div>
                        </div>
                        <div className={[classes.card, "card col-md-4"].join(" ")} >
                            <div className="card-body">
                                <h6 className="card-title">Mobile</h6>
                                <p className="card-text">
                                    <Input
                                        inputType="input"
                                        type="text"
                                        placeholder="Mobile"
                                        value={mobile}
                                        onChange={(e) => setMobile(e.target.value)}
                                        classassign={[classes.profileInput, "shadow-none"].join(" ")}
                                    />
                                </p>
                            </div>
                        </div>
                        <div className={[classes.card, "card col-md-4"].join(" ")} >
                            <div className="card-body">
                                <h6 className="card-title">Email</h6>
                                <p className="card-text">
                                    <Input
                                        inputType="input"
                                        type="text"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        classassign={[classes.profileInput, "shadow-none"].join(" ")}
                                    />
                                </p>
                            </div>
                        </div>
                        {role === roles.STUDENT && <div className={[classes.card, "card col-md-4"].join(" ")} >
                            <div className="card-body">
                                <h6 className="card-title">Birthdate</h6>
                                <p className="card-text">
                                    <Input
                                        inputType="input"
                                        type="text"
                                        placeholder="Birthdate"
                                        value={birthdate}
                                        onChange={(e) => setBirthdate(e.target.value)}
                                        classassign={[classes.profileInput, "shadow-none"].join(" ")}
                                    /></p>
                            </div>
                        </div>}
                        {(role === roles.STUDENT || role === roles.PARENT) && <div className={[classes.card, "card col-md-4"].join(" ")} >
                            <div className="card-body">
                                <h6 className="card-title">Link Account</h6>
                                <p className="card-text">
                                    <Input
                                        inputType="input"
                                        type="text"
                                        placeholder="Link account"
                                        value={link}
                                        onChange={(e) => setLink(e.target.value)}
                                        classassign={[classes.profileInput, "shadow-none"].join(" ")}
                                    /></p>
                            </div>
                        </div>}
                        {(role === roles.STUDENT || role === roles.TEACHER) && <div className={[classes.card, "card col-md-4"].join(" ")} >
                            <div className="card-body">
                                <h6 className="card-title">School</h6>
                                <p className="card-text">
                                    <Input
                                        inputType="input"
                                        type="text"
                                        placeholder="School"
                                        value={school}
                                        onChange={(e) => setSchool(e.target.value)}
                                        classassign={[classes.profileInput, "shadow-none"].join(" ")}
                                    /></p>
                            </div>
                        </div>}
                        {role === roles.STUDENT && <div className={[classes.card, "card col-md-4"].join(" ")} >
                            <div className="card-body">
                                <h6 className="card-title">Grade (2020 - 2021)</h6>
                                <p className="card-text">
                                    <Input
                                        inputType="input"
                                        type="text"
                                        placeholder="Grade"
                                        value={grade}
                                        onChange={(e) => setGrade(e.target.value)}
                                        classassign={[classes.profileInput, "shadow-none"].join(" ")}
                                    /></p>
                            </div>
                        </div>}
                        <div className={[classes.card, "card col-md-4"].join(" ")} >
                            <div className="card-body">
                                <h6 className="card-title">Password</h6>
                                <p className="card-text">
                                    <Input
                                        inputType="input"
                                        type="text"
                                        placeholder="New Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        classassign={[classes.profileInput, "shadow-none"].join(" ")}
                                    /></p>
                            </div>
                        </div>
                        {buttonList}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default withRouter(AddUser);