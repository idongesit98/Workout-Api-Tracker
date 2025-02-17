 const ExerciseModel = require('../Model/Exercise.model')

 const CreateExercise = async({name,sets,reps,weight}) =>{
    try {
        const newExercise = await ExerciseModel.create({
            name,sets,reps,weight,createdAt:new Date()
        })
        
        const savedExercise = await newExercise.save();
        return{
            code:201,
            success:true,
            message:"Exercise created successfully",
            data:{savedExercise}
        }
    } catch (error) {
        return{
            code:500,
            success:false,
            message:"Error creating exercise",
            error:error.message
        };
    }
 }

 const GetExercise = async({exerciseId}) =>{
    try {
        const exercise = await ExerciseModel.findByPk({
            where:{exerciseId}
        })
        if (!exercise) {
            const error = new Error("Exercise not found")
            error.type = "Not found"
        }

        return{
            code:200,
            success:true,
            message:"Exercise found",
            data:{exercise}
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

 const GetAllExercise = async() =>{
    try {
        const exercise = await ExerciseModel.findAll({})
        if(!exercise.length === 0){
            return{
                code:404,
                success:false,
                message:"No exercise available",
                data:null
            }
        }

        return{
            code:200,
            success:true,
            message:"Exercise available",
            data:{exercise}
        }
    } catch (error) {
        return{
            code:500,
            success:false,
            message:"An error occured while getting exercise",
            error:error.message
        }
    }
}

const UpdateExercise = async({exerciseId,name,sets,reps,weight}) =>{
    const update = await ExerciseModel.findByPk(exerciseId)
    try {
        if (!update) {
            return{
                code:404,
                success:false,
                message:"Exercise not found",
                data:null
            }
        }
        update.name = name || update.name
        update.sets = sets || update.sets
        update.reps = reps || update.reps
        update.weight = weight || update.weight
        update.updatedAt = new Date()

        await update.save()
        return{
            code:200,
            success:true,
            message:"Exercise updated successfully",
            data:{update}
        }
    } catch (error) {
        return{
            code:500,
            success:false,
            message:"An error while Making an update",
            error:error.message
        }
    }
}

const DeleteExercise = async({exerciseId}) =>{
    const exercise = ExerciseModel.findOne(exerciseId)

    if (!exercise) {
        return{
            code:404,
            success:false,
            message:"Exercise not found",
            data:null
        }
    }
    (await exercise).destroy()

    return{
        code:200,
        success:false,
        message:"Exercise deleted successfully",
        data:{exercise}
    }
}

module.exports = {CreateExercise,GetAllExercise,GetExercise,UpdateExercise,DeleteExercise}
