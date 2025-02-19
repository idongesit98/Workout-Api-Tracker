require("dotenv").config()
const swaggerJsDocs = require("swagger-jsdoc");
const swaggerAutogen = require("swagger-autogen")({openapi:"3.0.0",})

const doc = {
    info:{
        title:"Workout Tracker Api",
        version:"1.0.O",
        description:"Api for Tracking workouts and progress",
    },
    servers:[
        {
            url:process.env.SWAGGER_URL,
            description:"localserver",
        },
    ],
    tags:[],
    components:{
        securitySchemes:{
            bearerAuth:{
                type:"http",
                scheme:"bearer",
                bearerFormat:"JWT",
            },
        },
    },
}

const outputFile = "./swagger-output.json";
const routes = ["./app.js","./routes/*.js"];

swaggerAutogen(outputFile,routes,doc).then(()=>{
    require("./server.js")
})
