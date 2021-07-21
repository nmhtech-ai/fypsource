import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as BiIcons from 'react-icons/bi';

const BasicSBData = [
    {
        title: 'Profile',
        path: '/profile',
        icon: <AiIcons.AiOutlineUser />
    },
    // {
    //     title: 'Database',
    //     path: '/database',
    //     icon: <AiIcons.AiFillFolder />
    // },
    // {
    //     title: 'Instructions',
    //     path: '/instructions',
    //     icon: <AiIcons.AiFillInfoCircle />
    // },
    // {
    //     title: 'Settings',
    //     path: '/settings',
    //     icon: <AiIcons.AiFillSetting />
    // },
    {
        title: 'Logout',
        path: '/logout',
        icon: <BiIcons.BiLogOut />
    }
];

export default BasicSBData;