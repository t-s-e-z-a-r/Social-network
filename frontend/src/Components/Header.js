import React from 'react';
import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <nav className='d-flex flex-row justify-content-between'>
      <NavLink style={{ textDecoration: 'none' }} to={"/"}><h1>Social Network</h1></NavLink>
      <div className='p-2 d-flex justify-content-center align-items-center'>
        <p className='m-0'>
          <NavLink to={'/signIn'}>Sign-In</NavLink> / <NavLink to={"/signUp"}>Sign-Up</NavLink>
        </p>
      </div>
    </nav>
  );
}

export default Header;
