const { DataTypes,Model} = require("sequelize");
const sequelize = require("../Utils/Dbconnect/sqlConnect");

class Workout extends Model {}

Workout.init(
  {
    workoutId:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    title:{
        type:DataTypes.STRING,
        allowNull:false
    },
    description:{
        type:DataTypes.STRING
    },
    date:{
        type:DataTypes.DATE,
        allowNull:false
    },
    userId:{
      type:DataTypes.INTEGER,
      allowNull:false,
      references:{
        model:"Users",
        key:"userId",
      },
      onDelete:"CASCADE"
    }
  },
  {
    sequelize,
    modelName: "Workouts",
    timestamps: true,
  }
)

module.exports = Workout;