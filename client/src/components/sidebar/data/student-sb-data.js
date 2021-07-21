import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as BiIcons from 'react-icons/bi';

const EditorSBData = [
    {
        title: '個人檔案',
        path: '/portal/profile',
        icon: <AiIcons.AiOutlineUser />
    },
    {
        title: '個人練習',
        path: '/portal/exercise',
        icon: <AiIcons.AiFillFolder />
    },
    {
        title: '網上學習',
        path: '/portal/lecture',
        icon: <AiIcons.AiFillBook />
    },
    {
        title: '學習表現',
        path: '/portal/performance',
        icon: <AiIcons.AiFillInfoCircle />
    },
    // {
    //     title: 'Settings',
    //     path: '/settings',
    //     icon: <AiIcons.AiFillSetting />
    // },
    {
        title: '登出',
        path: '/logout',
        icon: <BiIcons.BiLogOut />
    }
];

export default EditorSBData;