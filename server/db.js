// // https://sequelize.org/master/manual/getting-started.html
const Sequelize = require("sequelize");

const sequelize = new Sequelize("ElevenNote", "postgres", "Testing1!",
    {
        host: "localhost",
        dialect: "postgres"
    });

sequelize.authenticate()
    .then(
        () => {
            console.log("Connected to Eleven Note DB");
        },
        (error) => {
            console.log(error);
        }
    );

module.exports = sequelize;