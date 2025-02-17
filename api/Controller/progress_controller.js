const ProService = require("../Services/progress_service")

const GetUserProgress = async(req,res) =>{
    const progressId = req.params.progressId

    const ProgressResponse = await ProService.GetUserProgress({
        progressId
    })
    return res.status(ProgressResponse.code).json(ProgressResponse)
}

const GetLatestProgress = async(req,res) =>{
    const progressId = req.params.progressId
    const LatestResponse = await ProService.GetLatestProgress({
        progressId
    });
    return res.status(LatestResponse.code).json(LatestResponse)
}

module.exports = {GetLatestProgress,GetUserProgress}