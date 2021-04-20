import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import SignUp from './SignUp';
import SignIn from './SignIn';
import { logout } from '../store/actions/authActions';

export default function Header() {
  const [showLinks, setShowLinks] = useState(true);
  const state = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    setShowLinks(state.authenticated);
    console.log(state.authenticated);
  }, [state.authenticated]);
  return (
    <nav>
      <NavLink to="/">
        <div className="logo">
          <i className="fab fa-asymmetrik"></i> <span>Advice</span> Box
        </div>
      </NavLink>
      <div className="links">
        {showLinks ? (
          <>
            <NavLink
              className="navlink"
              to={
                state.user && state.user.userName
                  ? `/dashboard/${state.user.userName}`
                  : `#`
              }
            >
              <i class="fas fa-laptop-house"></i>
              Dashboard
            </NavLink>
            <NavLink
              onClick={() => dispatch(logout())}
              className="navlink"
              to="/home"
            >
              <i style={{ color: 'red' }} class="fas fa-power-off"></i>
              Sign Out
            </NavLink>
          </>
        ) : (
          <>
            <SignIn /> <SignUp />
          </>
        )}
      </div>
    </nav>
  );
}
