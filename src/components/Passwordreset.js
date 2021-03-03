import React, { useContext, useRef } from "react";
import { Authcontext } from "../Authcontext";
import { useHistory } from "react-router-dom";
import "./PR.css";
function Passwordreset() {
  const val = useContext(Authcontext);
  const history = useHistory();
  const emailRef = useRef();
  const handlesubmit = () => {
    console.log(emailRef.current.value);
    val.auth
      .sendPasswordResetEmail(emailRef.current.value)
      .then(() => {
        alert("Your password reset email has been sent");
        history.push("/login");
      })
      .catch((e) => {
        alert(e);
      });
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
        Reset your Password
      </h2>
      <div id="form-control">
        <label>
          Enter email :
          <input type="email" ref={emailRef} />
        </label>
        <br />
        <button onClick={handlesubmit} ref={emailRef}>
          Click here to send password reset email
        </button>
      </div>
    </div>
  );
}

export default Passwordreset;
