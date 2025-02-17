const express = require("express")
const routes = express.Router()
const ProgressController = require("../Controller/progress_controller")

routes.get("/user/:progressId",ProgressController.GetUserProgress)
routes.get("/latest/:userId",ProgressController.GetLatestProgress)

module.exports = routes;