const AuthService = require('../Services/auth_services')

const SignUp = async(req,res) =>{
    const payload = req.body
    const SignUpResponse = await AuthService.SignUp({
        first_name:payload.first_name,
        last_name:payload.last_name,
        email:payload.email,
        password:payload.password,
        phoneNumber:payload.phoneNumber
    })

    res.status(SignUpResponse.code).json(SignUpResponse)
}

const login = async(req,res) =>{
    const payload = req.body;

    const loginResponse = await AuthService.Login({
        email:payload.email,
        password:payload.password
    })

    res.status(loginResponse.code).json(loginResponse)
}

const GetAllUsers = async(req,res) =>{
    const allUsersResponse = await AuthService.GetAllUsers({})
    res.status(allUsersResponse.code).json(allUsersResponse)
}

const GetUser = async(req,res) =>{ 
    const userId = req.params.userId

    const userResponse = await AuthService.GetSingleUser({
        userId
    })
    return res.status(userResponse.code).json(userResponse)
}

const UpdateUser = async(req,res) =>{
    const userId = req.params.userId
    const {first_name,last_name,email,phoneNumber,role} = req.body

    const UpdateResponse = await AuthService.UpdateUser({
        userId,
        first_name,last_name,email,phoneNumber,role
    })
    return res.status(UpdateResponse.code).json(UpdateResponse)
}

const DeleteUser = async(req,res) =>{
    const userId = req.params.userId
    
    const userResponse = await AuthService.DeleteUser({
        userId
    }); 

    return res.status(userResponse.code).json(userResponse)
}

const UploadProfilePicture = async(req,res) =>{
    const {userId} = req.params;

    try {
        if (!req.file) {
            return res.status(400).json({message:'No file Uploaded'})
        }

        const profilePicture = req.file.path
        const user = await AuthService.addUserProfilePicture(userId,profilePicture)

        res.status(200).json({
            message:'Profile picture added successfully',
            user
        });
    } catch (error) {
        res.status(500).json({message:'Server error', error:error.message})
    }
}

module.exports = {
    SignUp,login,GetAllUsers,UploadProfilePicture,GetUser,DeleteUser,UpdateUser
}