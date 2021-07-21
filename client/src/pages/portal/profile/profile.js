import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import axios from '../../../config/axiosConfig';
import classes from './profile.module.css';
import Input from '../../../components/uInteface/input/input';
import * as roles from '../../../contexts/roles';
import * as groups from '../../../contexts/groups';
// import { withTranslation } from 'react-i18next';

const Profile = (props) => {

    const [username, setUsername] = useState("");
    const [nickname, setNickname] = useState("");
    const [gender, setGender] = useState("");
    const [mobile, setMobile] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [group, setGroup] = useState("");
    const [fullname, setFullname] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [school, setSchool] = useState("");
    const [grade, setGrade] = useState("");
    const [link, setLink] = useState("");

    const [changePassword, setChangePassword] = useState(false);
    const [curPW, setCurPW] = useState();
    const [newPW, setNewPW] = useState("");
    const [reconfirmPW, setReconfirmPW] = useState("");
    const [pwNotMatch, setPWNotMatch] = useState(false);
    const [wrongPW, setWrongPW] = useState(false);
    const [samePW, setSamePW] = useState(false);
    const [showPW, setShowPW] = useState(false);
    let data = null;

    useEffect(() => {

        document.title = "MathX | Profile";
        axios({
            method: "GET",
            withCredentials: true,
            url: "/v1/users/auth",
        }).then((res) => {
            data = res.data;
            if (res.data.isAuthenticated === true) {
                setUsername(res.data.user.authId.username);
                setFullname(res.data.user.fullname);
                setNickname(res.data.user.nickname);
                setGender(res.data.user.gender);
                setMobile(res.data.user.mobile);
                setEmail(res.data.user.email);
                setBirthdate(res.data.user.birthdate);
                setRole(res.data.user.role);
                setGroup(res.data.user.group);
                if (res.data.role === 'Student') {
                    setSchool(res.data.user.school);
                    setGrade(res.data.user.grade);
                }
            } else {
                props.history.replace("/login");
            }
        })
    }, [data]);

    const onSubmitHandler = () => {
        if (reconfirmPW.localeCompare(newPW) !== 0) {
            setPWNotMatch(true);
        } else {
            setPWNotMatch(false);
            axios({
                method: 'POST',
                data: {
                    username: username,
                    oldPassword: curPW,
                    newPassword: newPW
                },
                withCredentials: true,
                url: "/v1/users/password"
            }).then(res => {
                if (res.data.success === false) {
                    if (res.data.duplicated === true) {
                        setSamePW(true);
                    } else {
                        setWrongPW(true);
                    }
                } else {
                    alert("Password changed!");
                    props.history.replace("/portal");
                }
            })
        }
    }

    const developers = (
        <React.Fragment>
            <div className={[classes.card, "card col-md-4"].join(" ")} >
                <div className="card-body">
                    <h6 className="card-title">權限</h6>
                    <p className="card-text">{role}</p>
                </div>
            </div>
            <div className={[classes.card, "card col-md-4"].join(" ")} >
                <div className="card-body">
                    <h6 className="card-title">群組</h6>
                    <p className="card-text">{group}</p>
                </div>
            </div>
        </React.Fragment>
    );

    const students = (
        <React.Fragment>
            <div className={[classes.card, "card col-md-4"].join(" ")} >
                <div className="card-body">
                    <h6 className="card-title">生日日期</h6>
                    <p className="card-text">{birthdate}</p>
                </div>
            </div>
            <div className={[classes.card, "card col-md-4"].join(" ")} >
                <div className="card-body">
                    <h6 className="card-title">就讀學校</h6>
                    <p className="card-text">{school}</p>
                </div>
            </div>
            <div className={[classes.card, "card col-md-4"].join(" ")} >
                <div className="card-body">
                    <h6 className="card-title">年級(2020 - 2021)</h6>
                    <p className="card-text">{grade}</p>
                </div>
            </div>
        </React.Fragment>
    );

    const parents = (
        <React.Fragment>
            <div className={[classes.card, "card col-md-4"].join(" ")} >
                <div className="card-body">
                    <h6 className="card-title">Link Account</h6>
                    <p className="card-text">{link}</p>
                </div>
            </div>
        </React.Fragment>
    );

    const teachers = (
        <React.Fragment>
            <div className={[classes.card, "card col-md-4"].join(" ")} >
                <div className="card-body">
                    <h6 className="card-title">School</h6>
                    <p className="card-text">{school}</p>
                </div>
            </div>
        </React.Fragment>
    );

    const beforePWChange = (
        <React.Fragment>
            <div className={[classes.card, "card"].join(" ")} >
                <div className="card-body">
                    <button
                        type="button"
                        className={[classes.button, "btn btn-lg btn-outline-secondary"].join(" ")}
                        onClick={() => setChangePassword(!changePassword)}
                    >更改密碼</button>
                </div>
            </div>
        </React.Fragment>
    );

    const afterPWChange = (
        <React.Fragment>
            <div className={[classes.card, "card col-md-4"].join(" ")} >
                <div className="card-body">
                    <Input
                        inputtype="input"
                        type={showPW ? "text" : "password"}
                        placeholder="舊密碼"
                        classassign={classes.profileInput}
                        autoComplete="current-password"
                        onClick={() => setWrongPW(false)}
                        onChange={(e) => setCurPW(e.target.value)}
                    />
                    {wrongPW && <p style={{ color: "red", paddingLeft: "10px" }}>密碼錯誤!</p>}
                </div>
            </div>
            <div className={[classes.card, "card col-md-4"].join(" ")} >
                <div className="card-body">
                    <Input
                        inputtype="input"
                        type={showPW ? "text" : "password"}
                        placeholder="新密碼"
                        classassign={classes.profileInput}
                        autoComplete="new-password"
                        onClick={() => setSamePW(false)}
                        onChange={(e) => setNewPW(e.target.value)}
                    />
                    {samePW && <p style={{ color: "red", paddingLeft: "10px" }}>不能使用相同密碼!</p>}
                </div>
            </div>
            <div className={[classes.card, "card col-md-4"].join(" ")} >
                <div className="card-body">
                    <Input
                        inputtype="input"
                        type={showPW ? "text" : "password"}
                        placeholder="確定密碼"
                        classassign={classes.profileInput}
                        autoComplete="new-password"
                        onClick={() => setPWNotMatch(false)}
                        onChange={(e) => setReconfirmPW(e.target.value)}
                    />
                    {pwNotMatch && <p style={{ color: "red", paddingLeft: "10px" }}>密碼不符!</p>}
                </div>
            </div>
            <div className={[classes.card, "card"].join(" ")} >
                <div className="card-body">
                    <button
                        type="button"
                        className={[classes.button, "btn btn-lg btn-success"].join(" ")}
                        onClick={onSubmitHandler}
                    >儲存</button>
                    <button
                        type="button"
                        className={[classes.button, "btn btn-lg btn-outline-primary"].join(" ")}
                        onMouseDown={() => setShowPW(true)}
                        onMouseUp={() => setShowPW(false)}
                    >顯示密碼</button>
                    <button
                        type="button"
                        className={[classes.button, "btn btn-lg btn-outline-secondary"].join(" ")}
                        onClick={() => {
                            setChangePassword(!changePassword);
                            setWrongPW(false);
                        }}
                    >取消</button>
                </div>
            </div>
        </React.Fragment>
    );

    return (
        <div>
            <h2>個人檔案</h2>
            <hr />
            <div className={[classes.cardContainer, "card"].join(" ")}>
                <h5 className={[classes.containerHeader, "card-header"].join(" ")} >
                    個人資料</h5>
                <div className={[classes.containerBody, "card-body"].join(" ")} >
                    <div className={[classes.containerRow, "row"].join(" ")}>
                        <div className={[classes.card, "card col-md-4"].join(" ")} >
                            <div className="card-body">
                                <h6 className="card-title">用戶名稱</h6>
                                <p className="card-text">{username}</p>
                            </div>
                        </div>
                        <div className={[classes.card, "card col-md-4"].join(" ")} >
                            <div className="card-body">
                                <h6 className="card-title">暱稱</h6>
                                <p className="card-text">{nickname}</p>
                            </div>
                        </div>
                        <div className={[classes.card, "card col-md-4"].join(" ")} >
                            <div className="card-body">
                                <h6 className="card-title">全名</h6>
                                <p className="card-text">{fullname}</p>
                            </div>
                        </div>
                        <div className={[classes.card, "card col-md-4"].join(" ")} >
                            <div className="card-body">
                                <h6 className="card-title">性別</h6>
                                <p className="card-text">{gender}</p>
                            </div>
                        </div>
                        <div className={[classes.card, "card col-md-4"].join(" ")} >
                            <div className="card-body">
                                <h6 className="card-title">電話號碼</h6>
                                <p className="card-text">{mobile}</p>
                            </div>
                        </div>
                        <div className={[classes.card, "card col-md-4"].join(" ")} >
                            <div className="card-body">
                                <h6 className="card-title">電郵地址</h6>
                                <p className="card-text">{email}</p>
                            </div>
                        </div>
                        {group === groups.DEVELOPMENT && developers}
                        {role === roles.STUDENT && students}
                        {role === roles.TEACHER && teachers}
                        {role === roles.PARENT && parents}
                    </div>
                </div>
            </div>
            <div className={[classes.cardContainer, "card"].join(" ")}>
                <h5 className={[classes.containerHeader, "card-header"].join(" ")} >
                    更改密碼</h5>
                <div className={[classes.containerBody2, "card-body"].join(" ")} >
                    <div className={[classes.containerRow, "row"].join(" ")}>
                        {!changePassword ? beforePWChange : afterPWChange}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withRouter(Profile);

