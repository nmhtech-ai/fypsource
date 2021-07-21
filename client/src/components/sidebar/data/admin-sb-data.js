import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as RiIcons from 'react-icons/ri';
import * as BiIcons from 'react-icons/bi';

const AdminSBData = [
    {
        title: 'Profile',
        path: '/portal/profile',
        icon: <AiIcons.AiOutlineUser />
    },
    {
        title: 'Management',
        path: '/portal/management',
        icon: <AiIcons.AiFillDatabase />
    },
    // {
    //     title: 'Instructions',
    //     path: '/instructions',
    //     icon: <AiIcons.AiFillInfoCircle />
    // },
    // {
    //     title: 'Curriculum',
    //     path: '/portal/curriculum',
    //     icon: <RiIcons.RiListSettingsLine />
    // },
    // {
    //     title: 'Question',
    //     path: '/portal/questions',
    //     icon: <AiIcons.AiFillQuestionCircle />
    // },
    // {
    //     title: 'Question Types',
    //     path: '/questiontypes',
    //     icon: <AiIcons.AiFillQuestionCircle />
    // },
    // {
    //     title: 'Database',
    //     path: '/portal/database',
    //     icon: <AiIcons.AiFillFolder />
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

export default AdminSBData;