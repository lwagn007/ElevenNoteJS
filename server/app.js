// https://appdividend.com/2019/06/06/what-is-process-env-in-node-js-environment-variables-in-node-js/
require("dotenv").config();

// // http://expressjs.com/
var Express = require("express");
var expressApp = Express();

// // https://sequelize.org/master/manual/getting-started.html
var Sequelize = require("./db");

Sequelize.sync(); // to reset tables pass in {force: true}

expressApp.use(require("body-parser").json());
expressApp.use(require("../server/middleware/headers"));

expressApp.use("/api/user", require("./controllers/usercontroller"));
// Every Route listed underneath the validate session are authorized routes
expressApp.use(require("./middleware/validate-session"));

// This is the port the app runs on
expressApp.listen(3000, () => console.log("testing"));