import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logout } from '../API/slice';
import { useNavigate } from 'react-router-dom';

function Header(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const navRef = React.useRef();

  React.useEffect(() => {
    const updateNavHeight = () => {
      if (navRef.current) {
        const navComputedStyle = getComputedStyle(navRef.current);
        const totalHeight = navRef.current.offsetHeight + 
                            parseFloat(navComputedStyle.marginTop) + 
                            parseFloat(navComputedStyle.marginBottom) + 
                            parseFloat(navComputedStyle.paddingTop) + 
                            parseFloat(navComputedStyle.paddingBottom);
        console.log("Height", totalHeight)
        document.documentElement.style.setProperty('--nav-total-height', `${totalHeight}px`);
      }
    };

    window.addEventListener('resize', updateNavHeight);
    updateNavHeight();

    return () => {
      window.removeEventListener('resize', updateNavHeight);
    };
  }, []);

  const userData = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
  <div ref={navRef}>
    <div className='spacerDiv'></div>
    <nav className='d-flex flex-row justify-content-between' style={{ paddingTop: '20px' }}>
      <NavLink style={{ textDecoration: 'none' }} to={"/"}><h1>Social Network</h1></NavLink>
      <div className='d-flex justify-content-center align-items-center'>
        {userData && userData.firstName && userData.lastName && userData.token ? 
        (<div>
          <h5>Welcome {userData.firstName} {userData.lastName}</h5>
          <p className="text-end pe-auto" onClick={handleLogout}>Logout()</p>
        </div>)
        :
        (<p>
          <NavLink to={'/signIn'}>Sign-In</NavLink> / <NavLink to={"/signUp"}>Sign-Up</NavLink>
        </p>)}
      </div>
    </nav>
  </div>
  );
}

export default Header;