import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logout } from '../API/slice';
import { useNavigate } from 'react-router-dom';


function Header(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.user);
  const tokenData = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout())
    navigate("/");
  }
  return (
    <>
      <div className='space mb-5'></div>
      <nav className='d-flex mt-4 flex-row justify-content-between'>
        <NavLink style={{ textDecoration: 'none' }} to={"/"}><h1>Social Network</h1></NavLink>
        <div className='p-2 d-flex justify-content-center align-items-center'>
          {userData && userData.firstName && userData.lastName && tokenData.token ? 
          (<div>
            <h5 className='m-0'>Welcome {userData.firstName} {userData.lastName}</h5>
            <p className="m-0 text-end pe-auto" onClick={handleLogout}>Logout()</p>
          </div>)
          :
          (<p className='m-0'>
            <NavLink to={'/signIn'}>Sign-In</NavLink> / <NavLink to={"/signUp"}>Sign-Up</NavLink>
          </p>)}
        </div>
      </nav>
    </>
  );
}

export default Header;
