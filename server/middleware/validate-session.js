var jwt = require("jsonwebtoken");
var Sequelize = require("../db");
var User = Sequelize.import("../models/User.js");

module.exports = (request, response, next) => {
    if (request.method == "OPTIONS") {
        next();
    } else {
        let sessionToken = request.headers.authorization;
        if (!sessionToken) {
            return response.status(403).send({
                auth: false, message: "No Token Provided"
            });
        } else {
            jwt.verify(sessionToken, process.env.JWT_SECRET, (error, decoded) => {
                if (decoded) {
                    User.findOne({ where: { id: decoded.id } })
                        .then(user => {
                            request.user = user;
                            next();
                        },
                            () => {
                                response.status(401).send({ error: "Not Authorized" });
                            });
                } else {
                    response.status(400).send({ error: "Not authorized or bad request."});
                }
            });
        }
    }
};