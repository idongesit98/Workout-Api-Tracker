const express = require("express")
const routes = express.Router()
const exerciseController = require('../Controller/exercise_controller')
const AuthMiddleware = require("../middleware/auth_middleware")

//done
routes.get('/all-exercise',exerciseController.GetAllExercise)
routes.get('/:exerciseId',exerciseController.GetSingleExercise)
routes.post('/create-exercise',AuthMiddleware.validateToken,AuthMiddleware.authorized("Admin"), exerciseController.CreateExercise)
routes.put('/update/:exerciseId',AuthMiddleware.validateToken,AuthMiddleware.authorized("Admin"),exerciseController.UpdateExercise)
routes.delete('/delete-exercise',AuthMiddleware.validateToken,AuthMiddleware.authorized("Admin"),exerciseController.DeleteExercise)

module.exports = routes;