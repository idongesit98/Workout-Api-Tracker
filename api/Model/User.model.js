const {DataTypes,Model} = require("sequelize");
const sequelize = require("../Utils/Dbconnect/sqlConnect");
const bcrypt = require('bcrypt')

class User extends Model {
  async isValidPassword(password) {
    return await bcrypt.compare(password, this.password)
  }
}

User.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("User", "Admin"),
      allowNull: false,
      defaultValue: "User",
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profilePicture: {
      type: DataTypes.STRING,
      allowNull: true 
    }
  },
  {
    sequelize,
    modelName: "Users",
    timestamps: true,
  }
);

User.beforeCreate(async (user) =>{
  user.password = await bcrypt.hash(user.password,10)
});

User.beforeUpdate(async (user) =>{
  if(user.changed("password")){
    user.password = await bcrypt.hash(user.password,10)
  }
})
 
 

module.exports = User;