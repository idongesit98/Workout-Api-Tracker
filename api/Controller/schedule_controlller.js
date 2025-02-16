const ScheduleService = require("../Services/schedule_services")

const CreateSchedule = async(req,res) => {
    const payload = req.body
    const ScheduleResponse = await ScheduleService.CreateSchedule({
        scheduleDate:payload.scheduleDate,
        status:payload.status
    });
    return res.status(ScheduleResponse.code).json(ScheduleResponse)
}

const UpdateSchedule = async(req,res) =>{
    const scheduleId = req.params.scheduleId
    const{scheduleDate,status} = req.body
    const ScheduleResponse = await ScheduleService.UpdateSchedule({
        scheduleId,scheduleDate,status
    })
    return res.status(ScheduleResponse.code).json(ScheduleResponse)
}

const DeleteSchedule = async(req,res) =>{
    const scheduleId = req.params.scheduleId
    const scheduleResponse = await ScheduleService.DeleteSchedule({scheduleId})
    return res.status(scheduleResponse.code).json(scheduleResponse)
}

module.exports = {CreateSchedule,UpdateSchedule,DeleteSchedule}
