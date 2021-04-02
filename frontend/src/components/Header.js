import React from "react";
import SignUp from "./SignUp";
import SignIn from "./SignIn";

export default function Header() {
  return (
    <nav>
      <div className="logo">
        <i className="fab fa-asymmetrik"></i> <span>Advice</span> Box
      </div>

      <div className="links">
        <SignIn />
        <SignUp />
      </div>
    </nav>
  );
}
