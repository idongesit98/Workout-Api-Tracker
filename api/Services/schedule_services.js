const ScheduleModel = require("../Model/Schedule.model")

const CreateSchedule = async ({scheduledDate,status,workoutId}) => {
    try {
        const newSchedule = await ScheduleModel.create({
            scheduledDate,status,workoutId
        })

        //const savedSchedule = await newSchedule.save()
        //Unnecessary cause .create, already saves an instance of the database

        return{
            code:201,
            success:true,
            message:"Schedule created successfully",
            data:{newSchedule}
        }
    } catch (error) {
        return{
            code:500,
            success:false,
            message:"Error creating schedule"
        }
    }
}

const UpdateSchedule = async({scheduleId,scheduledDate,status,workoutId}) =>{
    try {
        const update = await ScheduleModel.findByPk(scheduleId)

        if (!update) {
            return{
                code:404,
                success:false,
                message:"Schedule not found",
                data:null
            }
        }
        update.scheduledDate = scheduledDate || update.scheduledate,
        update.status = status || update.status
        update.updatedAt = new Date()

        await update.save()
        return{
            code:200,
            success:true,
            message:"Schedule Updated successfully",
            data:{ update}
        }
    } catch (error) {
        return{
            code:500,
            success:false,
            message:"An error occured while updating schedule",
            error:error.message
        }
    }
}

const DeleteSchedule = async({scheduleId}) =>{
    try {
        const deleteSchedule = await WorkoutModel.findOne(scheduleId)

        if (!deleteSchedule) {
            return{
                code:404,
                success:false,
                message:"No workout found",
                data:null
            }
        }
        await deleteSchedule.destroy()
        return{
            code:200,
            success:false,
            message:"Workout deleted successfully",
            data:{deleteSchedule}
        }
    } catch (error) {
        console.error("Error deleting user:", error);
        return {
            code: 500,
            success: false,
            message: "An error occurred while deleting the schedule",
            error: error.message
        };
    }
    
}

module.exports = {CreateSchedule,UpdateSchedule,DeleteSchedule}