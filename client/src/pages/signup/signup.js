import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../../components/uInteface/input/input';
import axios from '../../config/axiosConfig';
import classes from './signup.module.css';

const SignUp = (props) => {

    const [registerUsername, setRegisterUsername] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");


    const onRegisterHandler = (props) => {
        axios({
            method: 'POST',
            data: {
                username: registerUsername,
                password: registerPassword
            },
            withCredentials: true,
            url: "/signup"
        }).then(res => {

        })
    }

    return (
        <div>
            <h2>Welcome!</h2>
            <p>Please fill in the following information</p>
            <Input inputType="name" type="text" disabled />
            <Input inputType="input" type="email" placeholder="Parent's email" disabled />
            <Input inputType="input" type="text" placeholder="Parent's Tel" disabled />
            <Input
                inputType="input"
                type="text"
                placeholder="Username"
                onChange={(e) => setRegisterUsername(e.target.value)}
            />
            <Input
                inputType="input"
                type="password"
                placeholder="Password"
                onChange={(e) => setRegisterPassword(e.target.value)}
            />
            <Input inputType="input" type="password" placeholder="ConfirmPassword" disabled />
            <button
                type="button"
                className={[classes.Button, "btn btn-primary"].join(" ")}
                onClick={onRegisterHandler}>Sign Up</button>
            <Link
                to="/login"
                className={[
                    classes.button,
                    classes.marginRight,
                    "btn btn-secondary"].join(" ")}>Login</Link>
        </div>
    );
};

export default SignUp;