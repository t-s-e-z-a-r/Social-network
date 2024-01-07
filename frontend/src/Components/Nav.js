import React from 'react';
import { NavLink } from 'react-router-dom';


function Navigation(props) {
    return(
        <div id='nav'>
            <div className="div-links"><NavLink className="links" to={"/myaccount"}><span>Your Profile</span></NavLink></div>
            <div className="div-links"><NavLink className="links" to={"/posts"}><span>Posts</span></NavLink></div>
            <div className="div-links"><NavLink className="links" to={"/about"}><span>About</span></NavLink></div>
            <div className="div-links"><NavLink className="links" to={`/chats`}><span>Chats</span></NavLink></div>
        </div>
    )
}

export default Navigation