const db = require("../models");
const Budget = db.budgets;
const User = db.user;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
    console.log("logg:", req.body);
    // Create a Budget
    const budget = {
      title: req.body.title,
      budget: req.body.budget,
      tags: req.body.tags,
      userId: req.body.userId
    };
  
    // Save budget in the database
    Budget.create(budget)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the budget."
        });
      });
};

exports.findAll = (req, res) => {
    Budget.findAll({
     })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving budgets."
        });
      });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Budget.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving budget with id=" + id
        });
      });
};

exports.update = (req, res) => {
    const id = req.params.id;
  
    Budget.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Budget was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update budget with id=${id}. Either budget not found or req.body is empty.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating budget with id=" + id
        });
      });
};

exports.delete = (req, res) => {
    const id = req.params.id;
  
    Budget.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Budget was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete budget with id=${id}. Maybe budget was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete budget with id=" + id
        });
      });
};

exports.deleteAll = (req, res) => {
    Budget.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Budgets were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all budgets."
        });
      });
};

