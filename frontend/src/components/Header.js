import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import SignUp from './SignUp';
import SignIn from './SignIn';
import { logout } from '../store/actions/authActions';

export default function Header() {
  const [showLinks, setShowLinks] = useState(true);
  const [active, setActive] = useState('');
  const state = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    setShowLinks(state.authenticated);
  }, [state.authenticated]);

  const setActiveToggle = () => {
    if (active === '') {
      setActive('active');
    } else {
      setActive('');
    }
  };
  return (
    <nav>
      <NavLink to="/">
        <div className="logo">
          <i className="fab fa-asymmetrik"></i> <span>Advice</span> Box
        </div>
      </NavLink>
      <div className="links">
        <label onClick={setActiveToggle} className="menu" for="menu">
          <div id="toggle" class={`menu-toggle ${active}`}>
            <span class="menu-icon"></span>
            <span class="menu-icon"></span>
            <span class="menu-icon"></span>
          </div>
        </label>
        <input type="checkbox" id="menu"></input>

        {showLinks ? (
          <div className="multilevel">
            <div className="item">
              <input type="checkbox" id="A"></input>
              <label for="A">
                <NavLink to="/about">
                  <i class="far fa-address-card"></i>
                  about
                </NavLink>
              </label>
            </div>
            <div className="item">
              <label for="B">
                <i class="fas fa-user" />
                {state.authenticated && state.user.userName}
                <i class="fas fa-caret-down"></i>
              </label>
              <input type="checkbox" id="B"></input>
              <ul>
                <li>
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
                </li>
                <li>
                  <NavLink
                    onClick={() => dispatch(logout())}
                    className="navlink"
                    to="#"
                  >
                    <i style={{ color: 'red' }} class="fas fa-power-off"></i>
                    Sign Out
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="multilevel">
            <div className="item">
              <input type="checkbox" id="A"></input>
              <label for="A">
                <SignIn />
              </label>
            </div>
            <div className="item">
              <input type="checkbox" id="B"></input>
              <label for="B">
                <SignUp />
              </label>
            </div>
            <div className="item">
              <input type="checkbox" id="C"></input>
              <label for="C">
                <i class="far fa-address-card"></i>
                <NavLink to="/about">about</NavLink>
              </label>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
