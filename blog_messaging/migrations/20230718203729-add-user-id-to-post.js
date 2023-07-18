'use strict';

const { sequelize } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("Post", "userId", {
      type: Sequelize.INTEGER,
      references: {
        model: "User", //use table name that is being referenceed, check postgreSQL table
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("Post", "userId");
  }
};
