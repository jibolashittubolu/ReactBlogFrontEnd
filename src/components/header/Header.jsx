import './header.scss'
import zen from '../../assets/images/zen.jpg'

import React from 'react'

function Header() {
    const zenImg = '../../assets/images/zen.jpg'
    return (
        <div className="header">
            <div className="headerTitles">
                <span className="headerTitleSm">React & Node</span>
                <span className="headerTitleLg">Blog</span>
            </div>
            <img
                className="headerImg"
                width = "100%"
                src={zen}
                alt=""
            />
        </div>
    )
}

export default Header
