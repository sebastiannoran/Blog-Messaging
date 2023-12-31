'use strict';
const bcrypt = require('bcryptjs');

const user = require('../models/user');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert (
      "users", //name of the table in postgreSQL
      [
        {
          name: "Sebastian",
          email: "s@example.com",
          createdAt: new Date(),
          updatedAt: new Date(),
          password: await bcrypt.hash("password", 10)
        }
      ],
      {}
    );
    const users = await queryInterface.sequelize.query('SELECT id FROM users');
    const userId = users[0][0].id;

    await queryInterface.bulkInsert(
      'posts', //name of table in postgreSQL
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

    const posts = await queryInterface.sequelize.query('SELECT id FROM posts');
    const postId = posts[0][0].id;

    await queryInterface.bulkInsert(
      'comments', // name of the table
      [
        {
          content: "I agree! Season 4 brought the dramatics",
          createdAt: new Date(),
          updatedAt: new Date(),
          postId: postId,
          userId:userId,
        }
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('posts', null, {});
    await queryInterface.bulkDelete('users', null, {});
    await queryInterface.bulkDelete('comments', null, {});
  }
};

