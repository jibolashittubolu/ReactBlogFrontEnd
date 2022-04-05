import React, {useContext, useEffect} from 'react'
import { Facebook, Twitter, Pinterest, Instagram, Search} from '@material-ui/icons';
import "./topbar.scss";
import logo from '../../assets/images/profilepic.png';

import {useNavigate, Link} from "react-router-dom";
import { aContext } from '../../context/Context';
import axios from 'axios';

function TopBar() {
    const PublicFolderURL = "http://localhost:5000/submittedimages/"

    // useEffect( () => {
    //     axios.get("http://localhost:5000/submittedimages/1645984349866profilepic.png").then(res => console.log(res.data))
    // })

    const {user, dispatch} = useContext(aContext);

    var userIsLoggedIn = false;
    user ? userIsLoggedIn = true : userIsLoggedIn = false;
    // we assign the user variable to the userIsLoggedIn. 
    //Why? Because I am too lazy to go to the components and set them back to user
    // console.log(userIsLoggedIn)

    const navigate = useNavigate()
    const [isScrolled, setisScrolled] = React.useState(false)

    window.onscroll = () => {
        setisScrolled(window.pageYOffset === 0 ? false : true)
        return () => (window.onscroll = null)
    }

    const handleLogout = async () => {
        await navigate('/')
        await dispatch({type:"LOGOUT"})
        // try{
        //     navigate('/')
        // }
        // catch(error){
        //     return null
        // }
    }

    const mini_settings_link = (
        <li 
        onClick={() => navigate('/settings')}>
        SETTINGS
        </li>
    )

    const mini_login_link = (
        <li 
        onClick={() => navigate('/login')} >
        LOGIN
        </li>
    )
    
    const login_or_register_topbar = 
        <ul className='topCenterList2'>
            <li 
            className='topCenterListItem2'
            onClick={() => navigate('/login')} >
            LOGIN
            </li>
            <li 
            className='topCenterListItem2'
            onClick={() => navigate('/register')} >
            REGISTER
            </li>
        </ul>
    
    const login_extract = (
        <li 
        className='topCenterListItem2'
        onClick={() => navigate('/login')} >
        LOGIN
        </li>
    )

    const logout_extract = (
        <li 
        className='topCenterListItem2'
        onClick={() => handleLogout()} >
        LOGOUT
        </li>
    )

    const register_extract = (
        <li 
        className='topCenterList2'
        onClick={() => navigate('/register')} >
        REGISTER
        </li>
    )

    const profile_picture = (
        <Link to='/settings'>
            <img 
            src={user && (PublicFolderURL + user.profilePic)} 
            alt=""
            className="topRightImg" />
        </Link>
    )

    return (
        <>
            <div className={isScrolled === true ? "top" : "top isNotScrolled"}>
                <div className="topLeft">
                    <Facebook className="topLeftIcon"/>
                    <Twitter className="topLeftIcon"/>
                    <Pinterest className="topLeftIcon"/>
                    <Instagram className="topLeftIcon"/>
                </div>
                <div className="topCenter">
                    <ul className="topCenterList">
                        <li 
                            onClick={() => navigate('/')} className="topCenterListItem">HOME
                        </li>
                        <li 
                        onClick={() => navigate('/')} 
                        className="topCenterListItem">ABOUT
                        </li>
                        <li 
                        onClick={() => navigate('/write')} 
                        className="topCenterListItem">WRITE
                        </li>
                        <li 
                        onClick={() => navigate('/settings')} 
                        className="topCenterListItem">{mini_settings_link}
                        </li>
                        <li 
                        className="topCenterListItem">
                            {userIsLoggedIn ?
                             logout_extract:
                             login_extract}
                        </li>
                    </ul>
                </div>
                <div className="topRight">
                    {userIsLoggedIn ?
                    profile_picture:
                    register_extract
                    }
                  <Search className="topRightSearchIcon"/>
                </div>

            </div>
             
        </>
    )
}

export default TopBar
