module.exports = (sequelize, Sequelize) => {
    const Budget = sequelize.define("budget", {
      title: {
        type: Sequelize.STRING
      },
      budget: {
        type: Sequelize.FLOAT
      },
      tags: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        }
      }
    });
  
    return Budget;
  };