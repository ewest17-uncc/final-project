import React, { Component } from "react";
import BudgetDataService from "../../services/budget.service";

export default class Budget extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeBudget = this.onChangeBudget.bind(this);
    this.onChangeTags = this.onChangeTags.bind(this);
    this.getBudget = this.getBudget.bind(this);
    this.updateBudget = this.updateBudget.bind(this);
    this.deleteBudget = this.deleteBudget.bind(this);

    this.state = {
      currentBudget: {
        id: null,
        title: "",
        budget: 0,
        tags: "",
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getBudget(this.props.match.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentBudget: {
          ...prevState.currentBudget,
          title: title
        }
      };
    });
  }

  onChangeBudget(e) {
    const budget = e.target.value;
    
    this.setState(prevState => ({
      currentBudget: {
        ...prevState.currentBudget,
        budget: budget
      }
    }));
  }

  onChangeTags(e) {
    const tags = e.target.value;
    
    this.setState(prevState => ({
      currentBudget: {
        ...prevState.currentBudget,
        tags: tags
      }
    }));
  }

  getBudget(id) {
    BudgetDataService.get(id)
      .then(response => {
        this.setState({
          currentBudget: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateBudget() {
    BudgetDataService.update(
      this.state.currentBudget.id,
      this.state.currentBudget
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The budget was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteBudget() {    
    BudgetDataService.delete(this.state.currentBudget.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/budgets')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentBudget } = this.state;

    return (
      <div>
        {currentBudget ? (
          <div className="edit-form">
            <h4>Budget</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentBudget.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="budget">Budget</label>
                <input
                  type="text"
                  className="form-control"
                  id="budget"
                  value={currentBudget.budget}
                  onChange={this.onChangeBudget}
                />
              </div>

              <div className="form-group">
                <label htmlFor="tags">Tags</label>
                <input
                  type="text"
                  className="form-control"
                  id="tags"
                  value={currentBudget.tags}
                  onChange={this.onChangeTags}
                />
              </div>
            </form>

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteBudget}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateBudget}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Budget...</p>
          </div>
        )}
      </div>
    );
  }
}