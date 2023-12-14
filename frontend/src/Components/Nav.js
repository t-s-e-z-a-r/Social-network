import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logout } from '../API/slice';
import { useNavigate } from 'react-router-dom';


function Navigation(props) {
    return(
        <div id='nav'>
            <div className="div-links"><NavLink className="links" to={"/myaccount"}><span>Your Profile</span></NavLink></div>
            <div className="div-links"><NavLink className="links" to={"/posts"}><span>Posts</span></NavLink></div>
            <div className="div-links"><NavLink className="links" to={"/about"}><span>About</span></NavLink></div>
        </div>
    )
}

export default Navigation