import React, { Component } from "react";
import BudgetDataService from "../../services/budget.service";
import { Link } from "react-router-dom";
import UserService from "../../services/user.service";
import AuthService from "../../services/auth.service";
import Chart from 'chart.js';

export default class BudgetsPage extends Component {
  constructor(props) {
    super(props);
    this.retrieveBudgets = this.retrieveBudgets.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveBudget = this.setActiveBudget.bind(this);

    this.state = {
      budgets: [],
      currentBudget: null,
      currentIndex: -1
    };
  }

  componentDidMount() {
    this.retrieveBudgets();
    UserService.getUserBoard().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  retrieveBudgets() {
    const currentUser = AuthService.getCurrentUser();
    BudgetDataService.getAll()
      .then(response => {
        this.setState({
          budgets: response.data.filter((obj) => obj.userId === currentUser.id)
        });
        console.log(response.data.filter((obj) => obj.userId === currentUser.id));
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



render() {
    if(this.state.content === "No token provided!"){
        return (
            <div className="container">
                <header className="jumbotron">
                <h3>Please log in to view or add budgets</h3>
                </header>
            </div> ); 
    }
    else {
      const { budgets, currentBudget, currentIndex } = this.state;
      const budgetTitles = [];
      const budgetValues  = [];
      budgets.map((budget) => (
          budgetTitles.push(budget.title)
      ));
      budgets.map((budget) => (
        budgetValues.push(budget.budget)
    ));
        console.log("LOGGGGGGG: ", budgets)
      if(budgets.length !== 0) {
        var ctx = document.getElementById('myChart').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: budgetTitles,
                datasets: [{
                    data: budgetValues,
                    backgroundColor: [
                      '#ffcd56',
                      '#ff6384',
                      '#36a2eb',
                      '#ff00bb',
                      '#fd6b19',
                      '#13bf19',
                      '#d000ff',
                      '#912c47',
                  ]
                }]
            },
            options: {
              animation: {
                duration: 0
              }
            }
        });
      };

      myChart ? console.log("Chart Working Correctly") : console.log("Chart Failed to Load");

        return (
        <div className="list row">
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
            <Link
                to={"/add/"}
                className="m-3 btn btn-sm btn-success"
            >
                Add New Entry
            </Link>
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
            <div className="col-md-6">
              <canvas id="myChart" width="50" height="50"></canvas>
            </div>
        </div>
        );
    }
  }
}