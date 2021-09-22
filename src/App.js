import React from "react";
import Login from './pages/Login';
import UserEdit from './pages/UserEdit';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Questions from './pages/Questions';
import Users from './pages/Users';
import styled from 'styled-components'
import Page from './pages/Page';
import { AuthProvider } from './context';

require('dotenv').config()

function App() {
  const Styled = styled.div`
  .container {
      left: 50%;
      position: fixed;
      top: 50%;
      -webkit-transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
  }

  .separator {
      margin: 10px 0;
      height: 5px;
      width: 100%;
      background-color: #d44179;
  }

  footer {
    text-align: center;
    margin: 20px;
  }
`

  return (
    <Styled>
      <AuthProvider>
        <Router>
          <Switch>
            <Route path="/users">
              <Page key="profile" quiz component={<Users />} />
            </Route>
            <Route path="/questions">
              <Page key="questions" profile component={<Questions />} />
            </Route>
            <Route path="/edit">
              <div className="container">
                <UserEdit />
              </div>
            </Route>
            <Route path="/">
              <div className="container">
                <Login />
              </div>
            </Route>
          </Switch>
        </Router>
      </AuthProvider>
    </Styled>
  )
}

export default App;
