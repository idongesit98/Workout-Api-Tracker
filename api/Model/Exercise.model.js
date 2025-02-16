const { DataTypes,Model} = require("sequelize");
const sequelize = require("../Utils/Dbconnect/sqlConnect");

class Exercise extends Model {}

Exercise.init(
  {
    exerciseId:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    sets:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    reps:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    weight:{
        type:DataTypes.FLOAT,
        allowNull:true
    },
    workoutId:{
      type:DataTypes.INTEGER,
      allowNull:false,
      references:{
        model:"Workouts",
        key:"workoutId",
      },
      onDelete:"CASCADE"
    }
  },
  {
    sequelize,
    modelName: "Exercise",
    timestamps: true,
  }
);

module.exports = Exercise