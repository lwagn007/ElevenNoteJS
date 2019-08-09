let uuid = require("uuid/V4");

module.exports = (sequelize, sequelizeDataTypes) => {
    // 1    // 2
    return sequelize.define("User", {
        // 3
        Id: {
            type: sequelizeDataTypes.UUID,
            defaultValue: () => uuid(),
            primaryKey: true,
            allowNull: false,
            unique: true
        },

        // 4
        Username: sequelizeDataTypes.STRING,

        Email: sequelizeDataTypes.STRING,

        PasswordHash: sequelizeDataTypes.STRING
    });
};

// 1 = Sequelize method to define/create model of pg table

// 2 = Name of Model

// 3 = Order of model properties will be mimicked in column order

// 4 = Column in the table with type declared after name of column