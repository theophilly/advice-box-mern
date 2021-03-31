import React from "react";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <nav>
      <div className="logo">
        <i className="fab fa-asymmetrik"></i> <span>Advice</span> Box
      </div>

      <div className="links">
        <NavLink className="navlink" to="/">
          <i className="fas fa-sign-in-alt"></i> Sign In
        </NavLink>
        <NavLink className="navlink" to="/">
          <i className="fas fa-user-plus"></i> Sign Up
        </NavLink>
      </div>
    </nav>
  );
}
