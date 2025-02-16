const ExeService = require("../Services/exercise_service")

const CreateExercise = async(req,res) =>{
    const payload = req.body

    const CreateResponse = await ExeService.CreateExercise({
        name:payload.name,
        sets:payload.sets,
        reps:payload.reps,
        weight:payload.weight
    })

    return res.status(CreateResponse.code).json(CreateResponse)
}

const GetAllExercise = async(req,res) =>{
    const AllExercise = await ExeService.GetAllExercise({})
    return res.status(AllExercise.code).json(AllExercise)
}

const GetSingleExercise = async(req,res)=>{
    const exerciseId = req.params.exerciseId

    const ExerciseResponse = await ExeService.GetExercise({
        exerciseId
    })
    return res.status(ExerciseResponse.code).json(ExerciseResponse)
}

const UpdateExercise = async(req,res) =>{
    const exerciseId = req.params.exerciseId

    const {name,sets,reps,weight} = req.body
    const UpdateResponse = await ExeService.UpdateExercise({
        exerciseId,name,sets,reps,weight
    });
    return res.status(UpdateResponse.code).json(UpdateResponse)
}

const DeleteExercise = async(req,res) =>{
    const exerciseId = req.params.exerciseId

    const DeleteResponse = await ExeService.DeleteExercise({
        exerciseId
    });
    return res.status(DeleteResponse.code).json(DeleteResponse)
}

module.exports = {CreateExercise,GetAllExercise,GetSingleExercise,UpdateExercise,DeleteExercise}

