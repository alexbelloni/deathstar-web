import './App.css';
import { useState } from "react";
import Login from './pages/Login';
import Profile from './pages/Profile';
import UserEdit from './pages/UserEdit';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
require('dotenv').config()

function App() {
  const [loggedUser, setLoggedUser] = useState();

  const signOut = (callback) => {
    setLoggedUser(null);
    if (callback) callback();
  }

  const setUser = (user, callback) => {
    setLoggedUser(user);
    if (callback) callback();
  }

  return (
    <Router>
      <header></header>
      <Switch>
        <Route path="/edit">
          <UserEdit setUser={setUser} />
        </Route>
        <Route path="/profile">
          <Profile user={loggedUser} signOut={signOut} />
        </Route>
        <Route path="/">
          <Login setUser={setUser} />
        </Route>
      </Switch>
    </Router>
  )
}

export default App;
