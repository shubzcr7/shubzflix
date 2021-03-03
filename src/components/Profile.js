import React, { useContext, useRef } from "react";
import { Authcontext } from "../Authcontext";
import { Link, useHistory } from "react-router-dom";
import { Jumbotron, Container, Button } from "react-bootstrap";
import "./Profile.css";
function Profile() {
  const val = useContext(Authcontext);
  const history = useHistory();
  const displayName = useRef();
  const photoUrl = useRef();
  const newpassword = useRef();
  const confirmnewpassword = useRef();

  const handlesubmit = () => {
    val.auth.currentUser
      .updateProfile({
        displayName: displayName.current.value,
        photoURL: photoUrl.current.value,
      })
      .then(() => {
        alert("Updated succcessfully");
      })
      .catch((e) => {
        alert(e);
      });
  };

  const handledeletesubmit = () => {
    val.auth.currentUser
      .delete()
      .then(() => {
        alert("Your account has been deleted");
        history.push("/");
      })
      .catch((e) => {
        alert(e);
      });
  };

  const handlepasssubmit = async () => {
    if (newpassword.current.value !== confirmnewpassword.current.value) {
      return alert("passwords not match");
    }
    val.auth.currentUser
      .updatePassword(newpassword.current.value)
      .then(() => {
        alert("Password updated successfully");
      })
      .catch((e) => {
        alert(e);
      });
  };
  //   const handleclick = async () => {
  //     try {
  //       await val.signout();
  //       history.push("/");
  //     } catch {
  //       console.log("some error occured");
  //     }
  //   };
  return (
    <div id="main">
      <Jumbotron fluid>
        <Container>
          <h2>
            Welcome
            {val.auth.currentUser && JSON.stringify(val.auth.currentUser.email)}
            {/* {val.auth.currentUser &&
              JSON.stringify(val.auth.currentUser.displayName)} */}
          </h2>
          <div class="box">
            <h1>Update User info</h1>
            <label>
              Add display name :
              <input type="text" ref={displayName} />
            </label>
            <br></br>
            <label>
              Enter photo URL :
              <input type="url" ref={photoUrl} />
            </label>
            <br />
            <button onClick={handlesubmit}>Update</button>
          </div>

          <div class="box">
            <h1>Update password info </h1>
            <label>
              Password :
              <input type="password" ref={newpassword} />
            </label>
            <br></br>
            <label>
              Confirm new password :
              <input type="password" ref={confirmnewpassword} />
            </label>
            <br />
            <button onClick={handlepasssubmit}>Update new password</button>
          </div>
          <br />
        </Container>
        <Button variant="danger" onClick={handledeletesubmit}>
          Delete account
        </Button>
      </Jumbotron>
    </div>
  );
}

export default Profile;
