const WorkoutModel = require('../Model/Workout.model')

const CreateWorkout = async({user,title,description,date}) =>{
    try {
        const newWorkout = await WorkoutModel.create({
            title,description,date,userId:user.userId
        })
        const savedWorkout = await newWorkout.save()
        return{
            code:201,
            success:true,
            message:"Workout created successfully",
            data:{savedWorkout}
        }
    } catch (error) {
        return{
            code:500,
            success:false,
            message:"Error creating workout",
            error:error.message
        }
    }
}

const GetWorkout = async({workoutId}) =>{
    try {
        const workout = await WorkoutModel.findByPk(workoutId)
        if (!workout) {
            return{
                code:400,
                success:false,
                data:null,
                message:'Workout not found'
            }
        }
        return{
            code:200,
            success:true,
            message:'Workout found',
            data:{workout}
        }
    } catch (error) {
        return{
            code:500,
            success:false,
            data:null, 
            message:error.message,
        }
    }
}

const GetAllWorkout = async() =>{
    try {
        const allWorkout = await WorkoutModel.findAll({})
        if (!allWorkout.length === 0) {
            return{
                code:404,
                success:false,
                message:"No workout found",
                data:null
            }
        }
        return{
            code:200,
            success:true,
            message:"Workout found",
            data:{allWorkout}
        }
    } catch (error) {
        return{
            code:500,
            success:false,
            message:"An error occured while getting workout",
            error:error.message
        }
    }
}

const UpdateWorkout = async({workoutId,title,description,date}) =>{
    const update = await WorkoutModel.findByPk(workoutId)
    try {
        if (!update) {
            return{
                code:404,
                success:false,
                message:"Workout not found",
                data:null
            }
        }

        update.title = title || update.title,
        update.description = description || update.description
        update.date = date || update.date
        update.updatedAt = new Date()

        await update.save()
        return{
            code:200,
            success:true,
            message:"Workout updated successfully",
            data:{update}
        }
    } catch (error) {
        return{
            code:500,
            success:false,
            message:"An error occured while making an update",
            error:error.message
        }
    }
}

const DeleteWorkout = async({workoutId}) =>{
    try {
        const deleteWorkout = await WorkoutModel.findByPk(workoutId)

        if (!deleteWorkout) {
            return{
                code:404,
                success:false,
                message:"No workout found",
                data:null
            }
        }
        await deleteWorkout.destroy()
        return{
            code:200,
            success:false,
            message:"Workout deleted successfully",
            data:{deleteWorkout}
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

module.exports = {CreateWorkout,GetWorkout,GetAllWorkout,UpdateWorkout,DeleteWorkout}