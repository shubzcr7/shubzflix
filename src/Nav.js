import React, { useContext } from "react";
import "./Nav.css";
import { Modal, Navbar } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { Authcontext } from "./Authcontext";
function Nav() {
  const history = useHistory();
  const val = useContext(Authcontext);
  const handlelogout = async () => {
    try {
      await val.signout();
      history.push("/");
    } catch {
      console.log("some error occured");
    }
  };
  if (
    val.auth.currentUser == null ||
    val.auth.currentUser.emailVerified == false
  ) {
    return (
      <div className="nav">
        <img
          className="nav_logo"
          src="https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.svg"
          alt="Netflix-logo"
        />

        <div className="btnclass">
          <button className="btn" onClick={() => history.push("/")}>
            Home
          </button>
          <button className="btn" onClick={() => history.push("/login")}>
            Sign in
          </button>
          <button className="btn" onClick={() => history.push("/register")}>
            {" "}
            Register Now
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="nav">
        <img
          className="nav_logo"
          src="https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.svg"
          alt="Netflix-logo"
        />
        {/* <h5 style={{ color: "white" }}>Welcome {val.auth.currentUser.email}</h5> */}
        <div className="btnclass">
          <button className="btn" onClick={() => history.push("/profile")}>
            Profile
          </button>
          <button className="btn" onClick={() => history.push("/")}>
            Home
          </button>
          <button className="btn" onClick={handlelogout}>
            Logout
          </button>
        </div>
      </div>
    );
  }
}

export default Nav;
