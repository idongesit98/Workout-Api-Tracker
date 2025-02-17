const ProgressModel = require("../Model/Progress.model")
const WorkoutModel = require("../Model/Workout.model")

const GetUserProgress = async({progressId}) =>{
    try {
        const progress = await ProgressModel.findAll({
        where: {progressId},
        include: [{ model: WorkoutModel }],
        order: [["date", "DESC"]],
        })

        if(!progress){
            return{
                code:400,
                success:false,
                message:"No progress found",
                data:null
            }
        }

        return{
            code:200,
            success:true,
            message:"Progress available",
            data:{progress}
        }
    } catch (error) {
        return{
            code:500,
            success:false,
            message:"An error occured while getting progress",
            error:error.message
        }
    }
}

const GetLatestProgress = async({userId}) =>{
    try {
        const progress = await ProgressModel.findOne({
            where:{userId},
            include: [{model:WorkoutModel}],
            order:[["date","DESC"]],
        });
        
        if (!progress) {
            return{
                code:404,
                success:false,
                message:"No progress available",
                data:null
            }
        }
        return{
            code:200,
            success:true,
            message:"Progress available",
            data:{progress}
        }
    } catch (error) {
        return{
            code:500,
            success:false,
            message:"An error occured while getting progress",
            error:error.message
        }
    }
}

module.exports = {GetLatestProgress,GetUserProgress}