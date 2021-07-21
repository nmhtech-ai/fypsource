import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import classes from './langbox.module.css';
import { IoMdGlobe } from "react-icons/io";
import { useTranslation } from 'react-i18next';


const LangBox = () => {

    const { i18n } = useTranslation();
    const [language, setLanguage] = useState('zh-HK');

    const change = (lang) => {
        setLanguage(lang)
        i18n.changeLanguage(lang);
    }

    let languageSelector = null;
    switch (language) {
        case ('en'): default:
            languageSelector = (<NavLink
                to={"/login"}
                className={classes.langTag}
                onClick={() => change('zh-HK')}>English</NavLink>)
            break;
        case ('zh-HK'):
            languageSelector = (<NavLink
                to={"/login"}
                className={classes.langTag}
                onClick={() => change('en')}>繁體中文</NavLink>)
    }

    return (
        <div className={classes.langBox}>
            <IoMdGlobe className={classes.globe} />
            {languageSelector}
        </div>
    );
};


export default LangBox;