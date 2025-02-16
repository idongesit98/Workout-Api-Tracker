const { DataTypes,Model} = require("sequelize");
const sequelize = require("../Utils/Dbconnect/sqlConnect");

class Progress extends Model {}

Progress.init(
  {
    progressId:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    date:{
        type:DataTypes.DATE,
        allowNull:false
    },
    weight:{
        type:DataTypes.FLOAT
    },
    caloriesBurned:{
        type:DataTypes.FLOAT,
        allowNull:true
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
    modelName: "Progress",
    timestamps: true,
  }
)

module.exports = Progress;