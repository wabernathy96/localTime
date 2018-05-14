'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   
    return queryInterface.bulkInsert('Users', [{
      fullName: 'Jane Doe',
      email: 'jDoe@test.com',
      password: 'crazyHorse'
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
    
      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */return queryInterface.bulkDelete('Users', null, {});
  }
};
