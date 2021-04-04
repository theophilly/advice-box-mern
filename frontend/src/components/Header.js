import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import SignUp from "./SignUp";
import SignIn from "./SignIn";

export default function Header() {
  const [showLinks, setShowLinks] = useState(true);
  const state = useSelector((state) => state.authReducer);
  useEffect(() => {
    setShowLinks(state.authenticated);
    console.log(state.authenticated);
  }, [state.authenticated]);
  return (
    <nav>
      <div className="logo">
        <i className="fab fa-asymmetrik"></i> <span>Advice</span> Box
      </div>

      <div className="links">
        {showLinks ? (
          <>
            <NavLink className="navlink" to="/">
              <i class="fas fa-laptop-house"></i>
              Dashboard
            </NavLink>
            <NavLink className="navlink" to="/">
              <i style={{ color: "red" }} class="fas fa-power-off"></i>
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
