const express = require('express')
const routes = express.Router()
const authController = require('../Controller/auth_controller')
const AuthMiddleware = require("../middleware/auth_middleware")
const DataMiddleware = require("../middleware/data_middleware")
const { upload } = require('../Utils/Cloudinary/config')

/**
 * @swagger
 * /api/login:
 *  post:
 *      summary:SignIn as a user
 *      tags:
 *        -Login
 *     requestBody:
 *      required:true
 *      content:
 *          application/json:
 *             schema:
 *              type:object
 *      
 */
routes.get('/all-user',authController.GetAllUsers)
routes.get('/user/:userId',authController.GetUser)
routes.post('/login',authController.login)
routes.post('/sign-up',authController.SignUp)
routes.put('/update/:userId',AuthMiddleware.validateToken,AuthMiddleware.authorized,authController.UpdateUser)
routes.delete('/delete/:userId',AuthMiddleware.validateToken,AuthMiddleware.authorized,authController.DeleteUser)
routes.post('/upload/:userId',upload.single('profile_pictures'),authController.UploadProfilePicture)


module.exports = routes