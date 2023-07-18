'use strict';

const user = require('../models/user');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert (
      "user", //name of the table in postgreSQL
      [
        {
          name: "Sebastian",
          email: "s@example.com",
          password: "123",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
    const User = await queryInterface.sequelize.query('SELECT id FROM user');
    const userId = User[0][0].userId;

    await queryInterface.bulkInsert(
      'post', //name of table in postgreSQL
      [
        {
          title: "Succession seasons ranked",
          content: "4 > 2 > 3 > 1",
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: userId,
        }
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('post', null, {});
    await queryInterface.bulkDelete('user', null, {});
  }
};

