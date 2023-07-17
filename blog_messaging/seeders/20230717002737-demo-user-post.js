'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const userId = await queryInterface.bulkInsert('Users', [
      { name: 'Sebastian Moran', email: 'smoran@example.com', createdAt: new Date(), updatedAt: new Date() },
    ]);
    const postId = await queryInterface.bulkInsert('Posts', [
      { title: 'Succession season 4 ranking', content: '4 > 2 > 3 > 1', userId: userId, createdAt: new Date(), updatedAt: new Date() },
    ]);
    await queryInterface.bulkInsert('Comments', [
      { content: 'Disagree', userId: userId, postId: postId, createdAt: new Date(), updatedAt: new Date() },
      { content: 'Season 1 was better than 4', userId: userId, postId: postId, createdAt: new Date(), updatedAt: new Date() }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Comments', null, {});
    await queryInterface.bulkDelete('Posts', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  }
};

