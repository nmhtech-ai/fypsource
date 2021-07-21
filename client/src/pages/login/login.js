import React, { useState, Suspense, useEffect } from 'react';
import Loader from '../../components/loader/loader';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import classes from './login.module.css';
import Input from '../../components/uInteface/input/input';
import axios from '../../config/axiosConfig';
import { withTranslation } from 'react-i18next';

const LoginPage = ({ t, i18n }) => {

    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [authPrompt, setAuthPrompt] = useState(false);

    const history = useHistory();

    useEffect(() => { document.title = "MathX"; }, [])

    let prompt = null;
    const onLoginHandler = () => {
        axios({
            method: 'POST',
            data: {
                username: loginUsername,
                password: loginPassword
            },
            withCredentials: true,
            url: "/v1/users/login"
        }).then(res => {
            if (res.data.isAuthenticated === false) {
                setAuthPrompt(true);
            } else {
                history.push('/portal');
            }
        })
    }

    if (authPrompt) prompt = <p className={classes.authPrompt}>{t('invalid.label')}</p>;

    return (
        <Suspense fallback={<Loader />} >
            {prompt}
            <div className={classes.inputdiv}>
                <Input
                    inputtype="input"
                    type="text"
                    autoComplete="username"
                    placeholder={t('username.label')}
                    classassign={classes.input}
                    onClick={() => setAuthPrompt(false)}
                    onChange={(e) => {
                        setLoginUsername(e.target.value);
                        setAuthPrompt(false);
                    }}
                    onKeyPress={(e) => { if (e.key === 'Enter') { onLoginHandler(); } }}
                />
                <Input
                    inputtype="input"
                    type="password"
                    autoComplete="current-password"
                    classassign={classes.input}
                    placeholder={t('password.label')}
                    onClick={() => setAuthPrompt(false)}
                    onChange={(e) => {
                        setLoginPassword(e.target.value);
                        setAuthPrompt(false);
                    }}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            onLoginHandler();
                        }
                    }}
                />
            </div>
            <p></p>
            {/* <p className={classes.infoText}>{t('forgot.label')}</p> */}
            <button
                type="button"
                className={[classes.button, "btn btn-lg btn-primary"].join(" ")}
                onClick={onLoginHandler}
            > {t('login.label')}</button>
            <Link
                to="/signup"
                className={[
                    classes.button,
                    classes.signUpBtn,
                    "btn btn-lg btn-secondary"].join(" ")}>{t('signup.label')}</Link>
        </Suspense >
    );
};

export default withTranslation()(LoginPage);