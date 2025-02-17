require('dotenv').config();
const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    process.env.DATABASE_NAME,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    {
        host:process.env.TEST_DATABASE_HOST,
        dialect:'mysql',
        logging:false
    }
);

sequelize.authenticate()
    .then(() => {
        console.log("Database connected successsfully")
    })
    .catch(err => {
        console.error("Error connecting to the database")
    })

module.exports = sequelize;