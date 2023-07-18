'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("post", "userId", {
      type: Sequelize.INTEGER,
      references: {
        model: "user", 
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("post", "userId");
  }
};
