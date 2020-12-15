import React, { Component } from "react";
import BudgetDataService from "../../services/budget.service";
import AuthService from "../../services/auth.service";
export default class AddBudget extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeBudget = this.onChangeBudget.bind(this);
    this.onChangeTags = this.onChangeTags.bind(this);
    this.saveBudget = this.saveBudget.bind(this);
    this.newBudget = this.newBudget.bind(this);

    this.state = {
      id: null,
      title: "",
      budget: null, 
      tags: "",
      userId: null,

      submitted: false
    };
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  onChangeBudget(e) {
    this.setState({
      budget: e.target.value
    });
  }

  onChangeTags(e) {
    this.setState({
      tags: e.target.value
    });
  }

  saveBudget() {
    const currentUser = AuthService.getCurrentUser();
    var data = {
      title: this.state.title,
      budget: this.state.budget,
      tags: this.state.tags,
      userId: currentUser.id
    };

    BudgetDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          title: response.data.title,
          budget: response.data.budget,
          tags: response.data.tags,
          userId: currentUser.id,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newBudget() {
    this.setState({
      id: null,
      title: "",
      budget: null, 
      tags: "",

      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newBudget}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={this.state.title}
                onChange={this.onChangeTitle}
                name="title"
              />
            </div>

            <div className="form-group">
              <label htmlFor="budget">Budget</label>
              <input
                type="text"
                className="form-control"
                id="budget"
                required
                value={this.state.budget}
                onChange={this.onChangeBudget}
                name="budget"
              />
            </div>

            <div className="form-group">
              <label htmlFor="Tags">Tags</label>
              <input
                type="text"
                className="form-control"
                id="Tags"
                required
                value={this.state.Tags}
                onChange={this.onChangeTags}
                name="Tags"
              />
            </div>

            <button onClick={this.saveBudget} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}