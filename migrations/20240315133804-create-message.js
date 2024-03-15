'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Messages', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      context: {
        type: Sequelize.TEXT
      },
      user_id: {
        type: Sequelize.UUID,
        references: { model: 'Users', key: 'id' },
        
      },
      room_id: {
        type: Sequelize.UUID,
        references: { model: 'Rooms', key: 'id' },

      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Messages');
  }
};