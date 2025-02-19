const UserModel = require('../Model/User.model')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const Login = async ({email,password}) =>{
    try {
        const user = await UserModel.findOne({email});

        if (!user) {
            return{
                code:400,
                success:false,
                data:null,
                message:'Invalid Credentials'
            }
        }

        const validPassword = await user.isValidPassword(password)

        if (!validPassword) {
            return{
                code:400,
                success:false,
                data:null,
                message:"Invalid Credentials"
            }
        }

        const token = await jwt.sign({email},process.env.JWT_SECRET)
        return{
            code:200,
            success:true,
            data:{user,token},
           message:'Login Successful' 
        }
    } catch (error) {
        return{
            code:500,
            success:false,
            data:null,
            message:error.message || 'Server Error'
        }
    }
}

const SignUp = async ({first_name,last_name,email,phoneNumber,password}) =>{
    try {
        const newUser = await UserModel.create({
            first_name,
            last_name,
            password,
            email,
            phoneNumber
        })
        
        return{
            code:201,
            success:true,
            message:"User Signed Up successfully",
            data:{
                user:newUser
            }
        }
    } catch (error) {
        return{
            code:500,
            success:false,
            data:null,
            message:error.message
        }
    }
}

const GetAllUsers = async(req,res) =>{
    try {
        const users = await UserModel.findAll({})
        if (!users.length === 0) {
            return{
                code:404,
                success:false,
                message:'No User available',
                data:null
            }
        }

        return{
            code:200,
            success:true,
            message:'User available',
            data:{users}
        }
    } catch (error) {
        return{
            code:500,
            success:false,
            message:'An error occured while getting users',
            error:error.message
        }
    }
}

const addUserProfilePicture = async (userId, profilePictureUrl) => {
    try {
        const user = await UserModel.findByIdAndUpdate(
            userId,
            {profilePicture:profilePictureUrl},
            {new:true}
        );

        if(!user){
            throw new Error("User not found")
        }

        return user;
    } catch (error) {
        throw new Error(error.message)
    }
}

const GetSingleUser = async({userId}) =>{
    try {
        const user = await UserModel.findByPk(userId)
        if (!user) {
            const error = new Error('User not found')
            error.type = 'Not found'
        }

        return{
            code:200,
            success:true,
            message:'User found',
            data:{user}
        }
    } catch (error) { 
            return {
            code:500,
            success:false,
            message:error.message,
            data: null
        }
    }
}

const UpdateUser = async({userId,first_name,last_name,email,phoneNumber,role}) =>{
    try {
        const user = await UserModel.findByPk(userId)

        if (!user) {
            return{
                code:404,
                success:false,
                message:'User not found',
                data:null
            }
        }
       user.first_name = first_name || user.first_name
       user.last_name = last_name || user.last_name
       user.email = email || user.email
       user.phoneNumber = phoneNumber || user.phoneNumber
       user.role = role || user.role
       user.updatedAt = new Date()
    
       await user.save()
    
        return{
            code: 200,
            success:true,
            message:'User updated successfully',
            data:{
                user
            }
        }    
    } catch (error) {
        return{
            code:500,
            success:false,
            message:'An error occured while making an update',
            error:error.message
        }
    }
}

const DeleteUser = async({userId}) =>{
    try {
        const user = await UserModel.findByPk(userId)
        if (!user) {
            return{
                code:404,
                success:false,
                message:'User deleted successfully',
                data:null
            }    
        }
        await user.destroy()
        return{
            code:200,
            success:false,
            message:"User deleted successfully",
            data:{user}
        }
    } catch (error) {
        console.error("Error deleting user:", error);
        return {
            code: 500,
            success: false,
            message: "An error occurred while deleting the user",
            error: error.message
        };
    }
}
module.exports = {Login,SignUp,GetAllUsers,addUserProfilePicture,GetSingleUser,DeleteUser,UpdateUser}