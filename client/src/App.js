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
import QuizInfo from "./components/QuizInfo";
import QuizMaker from "./components/QuizMaker";
import EditQuiz from "./components/EditQuiz";
function App() {
  return (
    <div className="App">
      <Router>
        <NavigationBar />
        <div className="container">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/quizzes" component={QuizList} />
            <Route exact path="/quizzes/:_id" component={QuizInfo} />
            <Route exact path="/new_quiz" component={QuizMaker} />
            <Route exact path="/edit_quiz/:_id" component={EditQuiz} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

function NavigationBar() {
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
      </div>
    </nav>
  );
}
export default App;
