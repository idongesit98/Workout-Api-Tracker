const WorkService = require("../Services/workout_service")

const CreateWorkout = async (req,res) =>{
    const payload = req.body
    const user = req.user

    const CreateResponse = await WorkService.CreateWorkout({
        title:payload.title,
        description:payload.description,
        user,
        date:payload.date
    })
    return res.status(CreateResponse.code).json(CreateResponse)
}

const GetAllWorkout = async(req,res) =>{
    const AllWorkout = await WorkService.GetAllWorkout({})
    return res.status(AllWorkout.code).json(AllWorkout)
}

const GetSingleWorkout = async(req,res) =>{
    const workoutId = req.params.workoutId

    const WorkoutResponse = await WorkService.GetWorkout({workoutId})
    return res.status(WorkoutResponse.code).json(WorkoutResponse)
}

const UpdateWorkout = async(req,res) =>{
    const workoutId = req.params.workoutId

    const {title,description,date} = req.body
    const WorkoutResponse = await WorkService.UpdateWorkout({
        workoutId,title,description,date
    })
    return res.status(WorkoutResponse.code).json(WorkoutResponse)
}

const DeleteWorkout = async(req,res) =>{
    const workoutId = req.params.workoutId

    const DeleteResponse = await WorkService.DeleteWorkout({
        workoutId
    });

    return res.status(DeleteResponse.code).json(DeleteResponse)
}

module.exports = {CreateWorkout,GetAllWorkout,GetSingleWorkout,UpdateWorkout,DeleteWorkout}


