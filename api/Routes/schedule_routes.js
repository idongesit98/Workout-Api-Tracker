const express = require("express")
const routes = express.Router()
const scheduleController = require("../Controller/schedule_controlller")
const AuthMiddleware = require("../middleware/auth_middleware")

routes.post("/schedule",AuthMiddleware.validateToken,AuthMiddleware.authorized("Admin"),scheduleController.CreateSchedule)
routes.put("/update/:scheduleId",AuthMiddleware.validateToken,AuthMiddleware.authorized("Admin"),scheduleController.UpdateSchedule)
routes.delete("/delete/:scheduleId",AuthMiddleware.validateToken,AuthMiddleware.authorized("Admin"),scheduleController.DeleteSchedule)

module.exports = routes