import React, { useState, useRef, useContext } from "react";
import { Authcontext } from "../Authcontext";
import { Link, useHistory } from "react-router-dom";
import "./Login.css";
function Login() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const val = useContext(Authcontext);
  const emailRef = useRef();
  const passwordRef = useRef();
  const history = useHistory();
  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await val.signin(emailRef.current.value, passwordRef.current.value);
    } catch {
      setError("Unable to sign up");
    }
    setLoading(false);
    {
      val.auth.currentUser &&
        (val.auth.currentUser.emailVerified == false
          ? val.signout().then(() => alert("Please verify your account first"))
          : history.push("/profile"));
    }
  };
  return (
    <div id="main">
      <h2
        style={{
          paddingTop: "20px",
          fontFamily: "sans-serif",
          fontSize: "50px",
        }}
      >
        Sign in
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
          <button disabled={loading} type="submit">
            Submit
          </button>
          <br />
          <small>
            <Link to="/passwordreset" style={{ color: "yellowgreen" }}>
              Forgot password
            </Link>
          </small>
        </form>
      </div>
      <h2>Need an account</h2>
      <Link to="/register" style={{ color: "yellowgreen" }}>
        Register now
      </Link>
    </div>
  );
}

export default Login;
