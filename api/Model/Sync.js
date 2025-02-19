const sequelize = require("../Utils/Dbconnect/sqlConnect")
const UserModel = require("./User.model")
const ExerciseModel = require("./Exercise.model")
const WorkoutModel = require("./Workout.model")
const ProgressModel = require("./Progress.model")
const ScheduleModel = require("./Schedule.model")

WorkoutModel.belongsTo(UserModel, {foreignKey:"userId", onDelete:"CASCADE"});
UserModel.hasMany(WorkoutModel, {foreignKey:"userId"});

ExerciseModel.belongsTo(WorkoutModel, {foreignKey:"workoutId", onDelete:"CASCADE"});
WorkoutModel.hasMany(ExerciseModel, {foreignKey:"workoutId"})

ProgressModel.belongsTo(UserModel, {foreignKey: "userId", onDelete: "CASCADE"})
UserModel.hasMany(ProgressModel, {foreignKey: "userId"})

ScheduleModel.belongsTo(UserModel, {foreignKey:"userId", onDelete:"CASCADE"})
UserModel.hasMany(ScheduleModel, {foreignKey:"userId"})

ScheduleModel.belongsTo(WorkoutModel, {foreignKey: "workoutId", onDelete:"CASCADE"});
WorkoutModel.hasMany(ScheduleModel, {foreignKey: "workoutId"})

ProgressModel.belongsTo(WorkoutModel,{foreignKey: "workoutId",onDelete:"CASCADE"})
WorkoutModel.hasMany(ProgressModel, {foreignKey:"workoutId"})

const syncDatabase = async () =>{
    try {
        sequelize.sync({ alter: false }).then(() => {
            console.log("Database structure updated!");
            console.log("Database synced successfully")
          });          
    } catch (error) {
        console.error("Error syncing database:", error)
    }
}


module.exports = {
    UserModel,
    ExerciseModel,
    ProgressModel,
    ScheduleModel,
    WorkoutModel,
    syncDatabase
};
