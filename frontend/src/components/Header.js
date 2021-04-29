import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import {
  List,
  Box,
  Icon,
  ListIcon,
  OrderedList,
  UnorderedList,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';

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
    console.log(state.authenticated);
  }, [state.authenticated]);

  const setActiveController = () => {
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
        <i
          onClick={() => setActiveController()}
          className={`fas fa-bars ${active}`}
        ></i>

        {showLinks ? (
          <ul className="globalist">
            <li>
              <Link to="/about">
                <span>About</span>
              </Link>
            </li>
            <li>
              <i class="fas fa-user"></i> <span>theodasa</span>{' '}
              <i class="fas fa-caret-down"></i>
              <ul>
                <li className="navlink">
                  <NavLink
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
                <li className="navlink">
                  <NavLink onClick={() => dispatch(logout())} to="#">
                    <i style={{ color: 'red' }} class="fas fa-power-off"></i>
                    Sign Out
                  </NavLink>
                </li>
              </ul>
            </li>
          </ul>
        ) : (
          <>
            <SignIn /> <SignUp />
          </>
        )}
      </div>
    </nav>
  );
}
