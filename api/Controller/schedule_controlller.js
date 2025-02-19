const ScheduleService = require("../Services/schedule_services")

const CreateSchedule = async(req,res) => {
    const payload = req.body
    const ScheduleResponse = await ScheduleService.CreateSchedule({
        scheduledDate:payload.scheduledDate,
        status:payload.status,
        workoutId:payload.workoutId
    });
    return res.status(ScheduleResponse.code).json(ScheduleResponse)
}

const UpdateSchedule = async(req,res) =>{
    const scheduleId = req.params.scheduleId
    const{scheduledDate,status,workoutId} = req.body
     
    const ScheduleResponse = await ScheduleService.UpdateSchedule({
        scheduleId,scheduledDate,status,workoutId
    })
    return res.status(ScheduleResponse.code).json(ScheduleResponse)
}

const DeleteSchedule = async(req,res) =>{
    const scheduleId = req.params.scheduleId
    const scheduleResponse = await ScheduleService.DeleteSchedule({scheduleId})
    return res.status(scheduleResponse.code).json(scheduleResponse)
}

module.exports = {CreateSchedule,UpdateSchedule,DeleteSchedule}
