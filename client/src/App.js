import React from "react";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch,
} from "react-router-dom";

import "./App.scss";
import DarkModeToggle from "./components/DarkModeToggle";
import Home from "./components/Home";
import QuizList from "./components/QuizList";
import QuizMaker from "./components/QuizMaker";
import EditQuiz from "./components/EditQuiz";
import TakeQuiz from "./components/TakeQuiz";
import PrivateRoute from "./components/PrivateRoute";
import { useAuth0 } from "./react-auth0-spa";

function App() {
  return (
    <div className="App">
      <Router>
        <NavigationBar />
        <div className="container">
          <Switch>
            <Route exact path="/" component={Home} />
            <PrivateRoute exact path="/quizzes" component={QuizList} />
            <PrivateRoute exact path="/new_quiz" component={QuizMaker} />
            <PrivateRoute exact path="/edit_quiz/:_id" component={EditQuiz} />
            <PrivateRoute exact path="/quiz/:_id" component={TakeQuiz} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

function NavigationBar() {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div className="container">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <NavLink exact className="nav-link" activeClassName="active" to="/">
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              exact
              className="nav-link"
              activeClassName="active"
              to="/quizzes"
            >
              Quizzes
            </NavLink>
          </li>
        </ul>
        <DarkModeToggle />
        {!isAuthenticated && (
          <button onClick={() => loginWithRedirect({})}>Log in</button>
        )}
        {isAuthenticated && <button onClick={() => logout()}>Log out</button>}
      </div>
    </nav>
  );
}
export default App;
