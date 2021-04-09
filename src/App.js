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
import Arrow from './components/Arrow';
import Questions from './pages/Questions';

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

  const footer = (
    <footer>
      <Arrow caption="© 2021 Death Star" 
      icon='fa-external-link'
      click={() => { window.location = "https://alexandrebelloni.com" }} />
    </footer>
  )

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/edit">
            <UserEdit setUser={setUser} footer={footer} />
          </Route>
          <Route path="/profile">
            <Profile user={loggedUser} signOut={signOut} footer={footer} />
          </Route>
          <Route path="/questions">
            <Questions user={loggedUser}  footer={footer}/>
          </Route>
          <Route path="/">
            <Login setUser={setUser} footer={footer} />
          </Route>
        </Switch>

      </div>
    </Router>
  )
}

export default App;
