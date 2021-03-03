import React, { useState, useEffect, useContext } from "react";
import { auth } from "./firebase";
import Nav from "./Nav";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Home from "./Home";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Passwordreset from "./components/Passwordreset";

export const Authcontext = React.createContext();

export function Authprovider() {
  const [currentUser, setcurrentUser] = useState();

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function signin(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function signout() {
    return auth.signOut();
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setcurrentUser(user);
    });
    return unsubscribe;
  }, []);

  return (
    <>
      <Router>
        <Authcontext.Provider
          value={{
            currentuser: currentUser,
            signup: signup,
            signin: signin,
            auth: auth,
            signout: signout,
          }}
        >
          <Nav />

          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/register" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/profile" component={Profile} />
            <Route path="/passwordreset" component={Passwordreset} />
          </Switch>
        </Authcontext.Provider>
      </Router>
    </>
  );
}
