const ScheduleModel = require("../Model/Schedule.model")

const CreateSchedule = async ({scheduleDate,status}) => {
    try {
        const newSchedule = await ScheduleModel.create({
            scheduleDate,status
        })

        const savedSchedule = await newSchedule.save()
        return{
            code:201,
            success:true,
            message:"Schedule created successfully",
            data:{savedSchedule}
        }
    } catch (error) {
        return{
            code:500,
            success:false,
            message:"Error creating schedule"
        }
    }
}

const UpdateSchedule = async({scheduleId,scheduleDate,status}) =>{
    const update = await ScheduleModel.findByPk(scheduleId)
    try {
        if (!update) {
            return{
                code:404,
                success:false,
                message:"Schedule not found",
                data:null
            }
        }
        update.scheduleDate = scheduleDate || update.scheduleDate,
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
    const deleteSchedule = WorkoutModel.findOne(scheduleId)

    if (!deleteSchedule) {
        return{
            code:404,
            success:false,
            message:"No workout found",
            data:null
        }
    }
    (await deleteSchedule).destroy()
    return{
        code:200,
        success:false,
        message:"Workout deleted successfully",
        data:{deleteSchedule}
    }
}

module.exports = {CreateSchedule,UpdateSchedule,DeleteSchedule}