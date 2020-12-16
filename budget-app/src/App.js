import React, { Component } from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

import AuthService from "./services/auth.service";

import HomePage from './components/HomePage/home.component';
import Hero from './components/Hero/hero.component';
import Login from './components/Auth/login.component'
import Footer from './components/Footer/footer.component';
import AboutPage from './components/About/about-page.component';
import Register from "./components/Auth/register.component";
import Profile from "./components/Auth/profile.component";
import BudgetsPage from "./components/Budget/budgets-page-component";
import AddBudget from "./components/Budget/add-budget.component"

import {
  Switch,
  Route,
  Link
} from "react-router-dom";
import Budget from './components/Budget/edit-budgets.component';

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser } = this.state;

    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            Personal Budget App
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/about"} className="nav-link">
                About
              </Link>
            </li>

            {currentUser && (
              <li className="nav-item">
                <Link to={"/budgetspage"} className="nav-link">
                  Budgets
                </Link>
              </li>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  Log Out
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>
        <Hero/>
        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={HomePage} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/budgetspage" component={BudgetsPage} />
            <Route exact path='/about' component={AboutPage} />
            <Route exact path='/add' component={AddBudget} />
            <Route path='/budgets/:id' component={Budget} />
          </Switch>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default App;