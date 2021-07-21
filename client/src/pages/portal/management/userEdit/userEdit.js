import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import classes from './userEdit.module.css';
import axios from '../../../../config/axiosConfig';
import Input from '../../../../components/uInteface/input/input';
import * as roles from '../../../../contexts/roles';
import * as groups from '../../../../contexts/groups';



const DevEdit = (props) => {

    const id = useState(props.user._id)[0];
    const [username, setUsername] = useState(props.user.authId.username);
    const [nickname, setNickname] = useState(props.user.nickname);
    const [fullname, setFullname] = useState(props.user.fullname);
    const [gender, setGender] = useState(props.user.gender);
    const [mobile, setMobile] = useState(props.user.mobile);
    const [email, setEmail] = useState(props.user.email);
    const [role, setRole] = useState(props.user.role);
    const [group, setGroup] = useState(props.user.group);
    const [birthdate, setBirthdate] = useState(props.user.birthdate);
    const [link, setLink] = useState(props.user.linkaccount);
    const [school, setSchool] = useState(props.user.school);
    const [grade, setGrade] = useState(props.user.grade);
    const [password, setPassword] = useState("");
    const [confirmDel, setConfirmDel] = useState(false);
    const [editor, setEditor] = useState("");
    const [duplicate, setDuplicate] = useState(false);

    useEffect(() => {
        axios({
            method: "GET",
            withCredentials: true,
            url: "/getuser",
        }).then((res) => {
            // console.log(res.data);
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
        // console.log(id);
        axios({
            method: 'POST',
            data: {
                editor: editor,
                _id: id,
                username: username,
                nickname: nickname,
                fullname: fullname,
                gender: gender,
                mobile: mobile,
                email: email,
                role: role,
                group: group,
                birthdate: birthdate,
                relatedAcc: link,
                school: school,
                grade: grade,
                password: password,
            },
            withCredentials: true,
            url: "/edituser",
        }).then((res) => {
            // console.log(res.data.duplicate);
            if (res.data.duplicate) {
                setDuplicate(true);
            } else {
                if (props.user.group === groups.DEVELOPMENT) {
                    props.history.replace("/portal/management/list/developers");
                } else if (props.user.role === roles.STUDENT) {
                    props.history.replace("/portal/management/list/students");
                } else if (props.user.role === roles.TEACHER) {
                    props.history.replace("/portal/management/list/teachers");
                } else if (props.user.role === roles.PARENT) {
                    props.history.replace("/portal/management/list/parents");
                }
            }
        })
    }

    const onDeleteHandler = () => {
        axios({
            method: 'POST',
            data: {
                editor: editor,
                _id: id,
                username: username,
            },
            withCredentials: true,
            url: "/deleteuser",
        }).then((res) => {
            if (props.user.group === groups.DEVELOPMENT) {
                props.history.replace("/portal/management/list/developers");
            } else if (props.user.role === roles.STUDENT) {
                props.history.replace("/portal/management/list/students");
            } else if (props.user.role === roles.TEACHER) {
                props.history.replace("/portal/management/list/teachers");
            } else if (props.user.role === roles.PARENT) {
                props.history.replace("/portal/management/list/parents");
            }
        })
    }


    let confirmDelete = (
        <React.Fragment>
            <div className={[classes.deletebox, "card col-12"].join(" ")} >
                <div className="card-body">
                    <p
                        className={[classes.cardText, "card-text"].join(" ")}
                        style={{ color: "red", textAlign: "center" }}
                    >Are you sure you want to delete?</p>
                    {duplicate && <p style={{ color: "red", marginLeft: "20px" }}>Username duplicated!</p>}
                    <button className={[classes.button, "btn btn-lg btn-danger"].join(" ")} onClick={onDeleteHandler}>CONFIRM</button>
                    <button className={[classes.button, "btn btn-lg btn-secondary"].join(" ")} onClick={() => setConfirmDel(false)}>Cancel</button>
                </div>
            </div>
        </React.Fragment >
    );

    let notConfirmDelete = (
        <React.Fragment>
            <div className={[classes.deletebox, "card col-12"].join(" ")} >
                <div className="card-body">
                    <button className={[classes.button, "btn btn-primary"].join(" ")} onClick={onSaveHandler}>Save</button>
                    <button className={[classes.button, "btn btn-danger"].join(" ")} onClick={() => setConfirmDel(true)}>Delete</button>
                    <button className={[classes.button, "btn btn-secondary"].join(" ")} onClick={props.onHide}>Cancel</button>
                </div>
            </div>
        </React.Fragment>
    )

    return (
        <React.Fragment>
            <div className={[classes.cardContainer, "card"].join(" ")}>
                <div className={[classes.containerBody, "card-body"].join(" ")} >
                    <div className={[classes.containerRow, "row"].join(" ")}>
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
                                        classassign={["shadow-none", classes.profileInput].join(" ")}
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
                                        classassign={["shadow-none", classes.profileInput].join(" ")}
                                    /></p>
                            </div>
                        </div>
                        <div className={[classes.card, "card col-md-4"].join(" ")} >
                            <div className="card-body">
                                <h6 className="card-title">Fullname</h6>
                                <p className="card-text">
                                    <Input
                                        inputType="input"
                                        type="text"
                                        placeholder="Fullname"
                                        value={fullname}
                                        onChange={(e) => setFullname(e.target.value)}
                                        classassign={["shadow-none", classes.profileInput].join(" ")}
                                    />
                                </p>
                            </div>
                        </div>
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
                                        classassign={["shadow-none", classes.profileInput].join(" ")}
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
                                        classassign={["shadow-none", classes.profileInput].join(" ")}
                                    />
                                </p>
                            </div>
                        </div>
                        <div className={[classes.card, "card col-md-4"].join(" ")} >
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
                        <div className={[classes.card, "card col-md-4"].join(" ")} >
                            <div className="card-body">
                                <h6 className="card-title">Group</h6>
                                <p className="card-text">
                                    <Input
                                        inputType="input"
                                        type="text"
                                        placeholder="Group"
                                        value={group}
                                        onChange={(e) => setGroup(e.target.value)}
                                        classassign={["shadow-none", classes.profileInput].join(" ")}
                                        disabled
                                    /></p>
                            </div>
                        </div>
                        <div className={[classes.card, "card col-md-4"].join(" ")} >
                            <div className="card-body">
                                <h6 className="card-title">Birthdate</h6>
                                <p className="card-text">
                                    <Input
                                        inputType="input"
                                        type="text"
                                        placeholder="Birthdate"
                                        value={birthdate}
                                        onChange={(e) => setBirthdate(e.target.value)}
                                        classassign={["shadow-none", classes.profileInput].join(" ")}
                                    /></p>
                            </div>
                        </div>
                        <div className={[classes.card, "card col-md-4"].join(" ")} >
                            <div className="card-body">
                                <h6 className="card-title">Link Account</h6>
                                <p className="card-text">
                                    <Input
                                        inputType="input"
                                        type="text"
                                        placeholder="Link account"
                                        value={link}
                                        onChange={(e) => setLink(e.target.value)}
                                        classassign={["shadow-none", classes.profileInput].join(" ")}
                                    /></p>
                            </div>
                        </div>
                        <div className={[classes.card, "card col-md-4"].join(" ")} >
                            <div className="card-body">
                                <h6 className="card-title">School</h6>
                                <p className="card-text">
                                    <Input
                                        inputType="input"
                                        type="text"
                                        placeholder="School"
                                        value={school}
                                        onChange={(e) => setSchool(e.target.value)}
                                        classassign={["shadow-none", classes.profileInput].join(" ")}
                                    /></p>
                            </div>
                        </div>
                        <div className={[classes.card, "card col-md-4"].join(" ")} >
                            <div className="card-body">
                                <h6 className="card-title">Grade (2020 - 2021)</h6>
                                <p className="card-text">
                                    <Input
                                        inputType="input"
                                        type="text"
                                        placeholder="Grade"
                                        value={grade}
                                        onChange={(e) => setGrade(e.target.value)}
                                        classassign={["shadow-none", classes.profileInput].join(" ")}
                                    /></p>
                            </div>
                        </div>
                        <div className={[classes.card, "card col-12"].join(" ")} >
                            <div className="card-body">
                                <h6 className="card-title">Password</h6>
                                <p className="card-text">
                                    <Input
                                        inputType="input"
                                        type="text"
                                        placeholder="New Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        classassign={["shadow-none", classes.profileInput].join(" ")}
                                    /></p>
                            </div>
                        </div>
                        {confirmDel ? confirmDelete : notConfirmDelete}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default withRouter(DevEdit);