const sequelize = require('../Utils/Dbconnect/sqlConnect')

beforeAll(async () =>{
    try {
        await sequelize.authenticate();
        await sequelize.sync({force:true});
        console.log("Database connected for testing");
    } catch (error) {
        console.log("Unable to connect to the database:", error)
    }
});

afterAll(async () =>{
    try {
       await sequelize.close();
       console.log("Database connection closed after testing"); 
    } catch (error) {
        console.error("Error closing database connection:",error)
    }
});

module.exports = sequelize;