import React, {useEffect, useState} from 'react'
import './sidebar.scss'
import logo from '../../assets/images/logo.svg';
import goodmorning from '../../assets/images/goodmorning.jpg';
import { Facebook, Twitter, Pinterest, Instagram, Search} from '@material-ui/icons';
import axios from 'axios';
import {Link, useLocation} from "react-router-dom";


function Sidebar() {
    const location = useLocation();
    const [categories, setCategories] = useState([])

    // useEffect( () => {
    //     const fetchCategories = async () => {
    //         const fetchedCategories = await axios.get('/categories/findall');
    //         setCategories(fetchedCategories.data)
    //     }
    //     return fetchCategories()
    // }, [])

    useEffect( () => {
        const fetchCategoriess = async () => {
            const response = await axios.get('/categories/findall');
            setCategories(response.data)
        }
        fetchCategoriess()
    })

    return (
        <div className="sidebar">
            <div className="sidebarItem">
                 <span className="sidebarItemTitle"> ABOUT ME </span>
                 <img src={goodmorning} alt="" />
                 <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate qui necessitatibus nostrum illum reprehenderit
                 </p>
            </div>
            <div className="sidebarItem">
                <span className="sidebarItemTitle"> CATEGORIES </span>
                <ul className="sidebarItemList">
                    {
                        categories.map(
                            (category, key) => (
                                <Link to={`/?category=${category.name}`} className="link">  
                            <b> { category.name } </b>  
                                </Link>
                            )
                        )
                    }
                </ul>
            </div>
            <div className="sidebarItem">
                <span className="sidebarItemTitle">FOLLOW US</span>
                <div className="sidebarSocial">
                    <Facebook className="sidebarIcon"/>
                    <Twitter className="sidebarIcon"/>
                    <Pinterest className="sidebarIcon"/>
                    <Instagram className="sidebarIcon"/>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
