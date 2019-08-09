// Allows access to Express for this controller
// http://expressjs.com/
var Express = require("express");

// Router middleware from Express
// http://expressjs.com/en/5x/api.html#router
var Router = Express.Router();

// Allows access to Sequelize for this controller
// https://sequelize.org/master/manual/getting-started.html
var sequelize = require("../db");

// Models imported for this controller
var User = sequelize.import("../models/User.js");

// Used to hash and salt password
var bcrypt = require("bcryptjs");

// Used to secure user information with requests
var jwt = require("jsonwebtoken");

Router.post("/register", (request, response) => {
    let username = request.body.user.username;
    let email = request.body.user.email;
    let password = request.body.user.password;

    User.create({
        Username: username,
        Email: email,
        PasswordHash: bcrypt.hashSync(password, 10)
    })
        .then(
            function createSuccess(user) {
                console.log(user);
                let token = jwt.sign(
                    { id: user.id },
                    process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 }
                );
                response.json({
                    user: user,
                    message: "Successfully Registered",
                    sessionToken: token
                });
            },
            function createError(error) {
                response.status(500).send(error.message);
            }
        );
});

Router.post("/login", (request, response) => {
    User.findOne({
        where:
        {
            Email: request.body.user.email
        }
    })
        .then((user) => {
            if (user) {
                bcrypt.compare(request.body.user.password, user.PasswordHash, (error, matches) => {
                    if (matches) {
                        let token = jwt.sign({ Id: user.id },
                            process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 });
                        response.json({
                            user: user,
                            message: `You are logged in ${user.Username}`,
                            sessionToken: token
                        });
                    } else {
                        response.status(502).send({ error: "Incorrect Password or Username" });
                    }
                });
            } else {
                response.status(500).send({ error: "Failed attempt " });
            }
        },
            (error) => {
                response.status(501).send({ error: "Failed " });
            }
        );
});

Express.use(require("../middleware/validate-session"));

Router.get("/userprofile", (request, response) => {
    let data = "just a sec";
});

module.exports = Router;