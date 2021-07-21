import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import axios from '../../config/axiosConfig';
import * as groups from '../../contexts/groups';
import * as roles from '../../contexts/roles';

const SignUp = (props) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [nickname, setNickname] = useState("");
    const [gender, setGender] = useState("");
    const [mobile, setMobile] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [group, setGroup] = useState("");
    const [fullname, setFullname] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [related_acc, setRelatedAccount] = useState("");
    const [school, setSchool] = useState("");
    const [grade, setGrade] = useState("");


    const onSubmitHandler = () => {

        axios({
            method: 'POST',
            data: {
                username: username,
                password: password,
                nickname: nickname,
                gender: gender,
                mobile: mobile,
                email: email,
                role: role,
                group: group,
                fullname: fullname,
                birthdate: birthdate,
                related_acc: related_acc,
                school: school,
                grade: grade
            },
            withCredentials: true,
            url: "/signup",
        }).then((res) => {
            // console.log(res);
            if (res.data.success === true) {
                props.history.push('/login');
            }
        })
    }

    const roleConverter = (e) => {
        setRole(e.target.value)
        switch (e.target.value) {
            case roles.ADMIN: case roles.DEVELOPER: case roles.EDITOR: case roles.BASIC:
                setGroup(groups.DEVELOPMENT);
                setFullname("---");
                setBirthdate("---");
                setRelatedAccount("---");
                setSchool("---");
                setGrade("---");
                break;
            case roles.STUDENT: default:
                setGroup(groups.CLIENT);
                setFullname("");
                setBirthdate("");
                setRelatedAccount("");
                setSchool("");
                setGrade("");
                break;
            case roles.TEACHER:
                setGroup(groups.CLIENT);
                setFullname("---");
                setBirthdate("---");
                setRelatedAccount("---");
                setSchool("");
                setGrade("---");
                break;
            case roles.PARENT:
                setGroup(groups.CLIENT);
                setFullname("---");
                setBirthdate("---");
                setRelatedAccount("");
                setSchool("---");
                setGrade("---");
                break;
        }
    }

    return (
        <div>
            <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)}></input>
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}></input>
            <input type="text" placeholder="Nickname" onChange={(e) => setNickname(e.target.value)}></input>
            <select onChange={(e) => setGender(e.target.value)}>
                <option value=""></option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </select>
            <input type="text" placeholder="Mobile" onChange={(e) => setMobile(e.target.value)}></input>
            <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)}></input>
            <br />
            <select onChange={(e) => roleConverter(e)}>
                <option value=""></option>
                <option value={roles.ADMIN}>{roles.ADMIN}</option>
                <option value={roles.DEVELOPER}>{roles.DEVELOPER}</option>
                <option value={roles.EDITOR}>{roles.EDITOR}</option>
                <option value={roles.BASIC}>{roles.BASIC}</option>
                <option value={roles.STUDENT}>{roles.STUDENT}</option>
                <option value={roles.PARENT}>{roles.PARENT}</option>
                <option value={roles.TEACHER}>{roles.TEACHER}</option>
            </select>
            <br />
            <input type="text" placeholder="Fullname" value={fullname} onChange={(e) => setFullname(e.target.value)}></input>
            <input type="text" placeholder="Birthdate" value={birthdate} onChange={(e) => setBirthdate(e.target.value)}></input>
            <input type="text" placeholder="Linkaccount" value={related_acc} onChange={(e) => setRelatedAccount(e.target.value)}></input>
            <input type="text" placeholder="School" value={school} onChange={(e) => setSchool(e.target.value)}></input>
            <input type="text" placeholder="Grade" value={grade} onChange={(e) => setGrade(e.target.value)}></input>

            <button onClick={onSubmitHandler}>Submit</button>
        </div>
    );
};

export default withRouter(SignUp);









