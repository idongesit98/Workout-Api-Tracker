const Joi = require("joi")

const validateUserDetails = async(req,res,next) =>{
    const bodyOfRequest = req.body
    const schema = Joi.object({
        first_name:Joi.string().required(),
        last_name:Joi.string().required(),
        email:Joi.string().required(),
        role:Joi.string().required(),
        passwords:Joi.string().required()
    })

    const valid = await schema.validate(bodyOfRequest)
    console.log({valid})

    if (valid.error) {
        return res.status(422).json({
            message:valid.error.message
        })
    }
    next()
}

module.exports = {validateUserDetails}