const express = require("express")
const routes = express.Router()
const workoutController = require("../Controller/work_controller")
const AuthMiddleware = require("../middleware/auth_middleware")

//Done
routes.get('/all-workout',workoutController.GetAllWorkout)
routes.get('/:workoutId',AuthMiddleware.validateToken,AuthMiddleware.authorized("Admin"),workoutController.GetSingleWorkout)
routes.post('/create',AuthMiddleware.validateToken,AuthMiddleware.authorized("Admin"),workoutController.CreateWorkout)
routes.put('/:workoutId',AuthMiddleware.validateToken,AuthMiddleware.authorized("Admin"),workoutController.UpdateWorkout)
routes.delete('/:deleteId',AuthMiddleware.validateToken,AuthMiddleware.authorized("Admin"),workoutController.DeleteWorkout)

module.exports = routes;