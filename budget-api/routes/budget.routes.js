module.exports = app => {
    const budget = require("../controllers/budget.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Budget
    router.post("/", budget.create);
  
    // Retrieve all Budget
    router.get("/", budget.findAll);
  
    // Retrieve a single Budget with id
    router.get("/:id", budget.findOne);
  
    // Update a Budget with id
    router.put("/:id", budget.update);
  
    // Delete a Budget with id
    router.delete("/:id", budget.delete);
  
    // Delete all Budget
    router.delete("/", budget.deleteAll);
  
    app.use('/api/budget', router);
  };