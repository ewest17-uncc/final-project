import React, { Component } from "react";
import BudgetDataService from "../../services/budget.service";
import { Link } from "react-router-dom";
import AuthService from "../../services/auth.service";

export default class BudgetList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveBudgets = this.retrieveBudgets.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveBudget = this.setActiveBudget.bind(this);
    this.removeAllBudgets = this.removeAllBudgets.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      budgets: [],
      currentBudget: null,
      currentIndex: -1,
      searchTitle: "",
      userId: null
    };
  }

  componentDidMount() {
    this.retrieveBudgets();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveBudgets() {
    const currentUser = AuthService.getCurrentUser().id;
    var data = {
        userId: currentUser.id
    };
    BudgetDataService.getAll(data)
      .then(response => {
        response.data.filter(obj => {
            return obj.userId === currentUser.id
        })
        console.log("Filltered: ", response.data)
        this.setState({
          budgets: response.data,
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveBudgets();
    this.setState({
      currentBudget: null,
      currentIndex: -1
    });
  }

  setActiveBudget(budget, index) {
    this.setState({
      currentBudget: budget,
      currentIndex: index
    });
  }

  removeAllBudgets() {
    BudgetDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchTitle() {
    BudgetDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          budgets: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const currentUser = AuthService.getCurrentUser();
    const { searchTitle, budgets, currentBudget, currentIndex } = this.state;
    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Budget List</h4>

          <ul className="list-group">
            {budgets &&
              budgets.map((budget, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveBudget(budget, index)}
                  key={index}
                >
                  {budget.title}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllBudgets}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentBudget ? (
            <div>
              <h4>Budget</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentBudget.title}
              </div>
              <div>
                <label>
                  <strong>Budget:</strong>
                </label>{" "}
                {currentBudget.budget}
              </div>
              <div>
                <label>
                  <strong>Tags:</strong>
                </label>{" "}
                {currentBudget.tags}
              </div>

              <Link
                to={"/budgets/" + currentBudget.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Budget...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}