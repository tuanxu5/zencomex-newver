require("dotenv").config();

module.exports = {
    development: {
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        host: process.env.DATABASE_HOST,
        dialect: "mysql",
        define: {
            freezeTableName: true,
        },
        logging: false,
    },
    test: {
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        host: process.env.DATABASE_HOST,
        dialect: "mysql",
        define: {
            freezeTableName: true,
        },
        logging: false,
    },
    production: {
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        host: process.env.DATABASE_HOST,
        dialect: "mysql",
        define: {
            freezeTableName: true,
        },
        logging: false,
    },
};
