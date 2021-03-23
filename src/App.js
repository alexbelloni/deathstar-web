import './App.css';
import { useState } from "react";
import Profile from './pages/Profile';
require('dotenv').config()

function App() {
  const [loggedUser, setLoggedUser] = useState();
  const [error, setError] = useState();
  const [user, setUser] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleClick = e => {
    if (e) e.preventDefault();
    login({
      email: user.email,
      password: user.password
    });
  }

  function login(data) {
    setLoading(true);
    fetch(`${process.env.REACT_APP_BASE_URL}login`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    })
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          setError(res.error);
          setLoading(false);
        } else {
          setLoggedUser(res);
          setLoading(false);
        }
      })
      .catch(e => {
        setError(e.message);
        setLoading(false);
      });
  }

  const signOut = () => {
    setError('');
    setUser({ email: "", password: "" });
    setLoggedUser(null);
  }

  const handleChange = e => {
    const newUser = { ...user, [e.target.name]: e.target.value };
    setUser(newUser);
  }

  const handleTrial = e => {
    login({
      "email": process.env.REACT_APP_TRIAL_EMAIL,
      "password": process.env.REACT_APP_TRIAL_PASSWORD
    })
  }

  return loggedUser ? <Profile user={loggedUser} signOut={signOut} />
    : (
      <div className="container">
        <div id="login">
          <form>
            <fieldset className="clearfix">
              <p>
                <span className="fa fa-envelope"></span>
                <input type="text" name='email' value={user.email} onChange={handleChange}
                  placeholder='e-mail' required />
              </p>
              <p><span className="fa fa-lock"></span>
                <input type="password" name='password' value={user.password} onChange={handleChange}
                  placeholder='password' required />
              </p>
              <p>
                <input type="submit" value="Sign In" onClick={handleClick}></input>
              </p>
            </fieldset>
          </form>
          <footer>
            {loading ? <i class="fa fa-spinner fa-pulse fa-2x fa-fw"></i>
              : (
                <>
                  <p>Not a member? <span className="link">Sign up now</span><span className="fa fa-arrow-right"></span></p>
                  <p onClick={handleTrial}><span className="link">Free Trial</span><span className="fa fa-arrow-right"></span></p>
                  {error && <p>{error.toUpperCase()}</p>}
                </>
              )}
          </footer>
        </div>
      </div>
    );
}

export default App;
