module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Users', [{
        email: "khahotravinh2002@gmail.com",
        password: "khaho",
        firstName: "kha",
        lastName: "ho",
        address: "Ho Chi Minh city",
        gender: 1,
        typeRole: "ROLE",
        keyRole:"R1",
        createdAt: new Date(),
        updatedAt: new Date()
      }]);
    },
    down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Users', null, {});
    }
  };