const config = require('./config.json');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    config[process.env.NODE_ENV || 'development'].database,
    config[process.env.NODE_ENV || 'development'].username,
    config[process.env.NODE_ENV || 'development'].password,
    config[process.env.NODE_ENV || 'development'].options
);

sequelize.authenticate().then((data) => {
    console.log("Database connected.");
}).catch((err) => {
    console.log(err)
});

module.exports = {
    sequelize
};