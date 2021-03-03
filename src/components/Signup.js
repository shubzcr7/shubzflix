import React, { useState, useEffect, useRef, useContext } from "react";
import { Authcontext } from "../Authcontext";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../firebase";
import { Jumbotron, jumbotron } from "react-bootstrap";
import "./Signup.css";
function Signup() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const val = useContext(Authcontext);
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmpasswordRef = useRef();
  const history = useHistory();
  const handlesubmit = async (e) => {
    e.preventDefault();
    if (passwordRef.current.value !== confirmpasswordRef.current.value) {
      return setError("passwords not match");
    }
    try {
      setError("");
      setLoading(true);
      await val.signup(emailRef.current.value, passwordRef.current.value);
      alert("succesfully signed up");
    } catch {
      setError("Unable to sign up");
    }
    val.auth.currentUser.sendEmailVerification();
    setLoading(false);
    history.push("/login");
    await val.signout();
  };
  return (
    <div id="main">
      {error && alert(error)}
      <h2
        style={{
          paddingTop: "20px",
          fontFamily: "sans-serif",
          fontSize: "50px",
        }}
      >
        Sign up
      </h2>
      <div id="form-control">
        <form onSubmit={handlesubmit}>
          <label>
            Enter Email :
            <input type="email" ref={emailRef} />
          </label>
          <br />
          <label>
            Enter password :
            <input type="password" ref={passwordRef} />
          </label>
          <br />
          <label>
            Confirm password :
            <input type="password" ref={confirmpasswordRef} />
          </label>
          <br />
          <button disabled={loading} type="submit">
            Submit
          </button>
        </form>
      </div>
      <h2>Already have an account</h2>
      <Link to="/login" style={{ color: "yellowgreen" }}>
        login now
      </Link>
    </div>
  );
}

export default Signup;
