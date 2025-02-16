const { DataTypes,Model} = require("sequelize");
const sequelize = require("../Utils/Dbconnect/sqlConnect");

class Schedule extends Model {}

Schedule.init(
  {
    scheduleId:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    scheduledDate:{
        type:DataTypes.DATE,
        allowNull:false
    },
    status:{
        type: DataTypes.ENUM("scheduled","completed","cancelled","pending"),
        defaultValue:"pending"
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
    modelName: "Schedule",
    timestamps: true,
  }
)

module.exports = Schedule