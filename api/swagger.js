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
            url:"http://localhost:4000",
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
const routes = ["./routes/*.js"];

swaggerAutogen(outputFile,routes,doc).then(()=>{
    require("./app.js")
})

// const specs = swaggerJsDocs(options);
// module.exports = specs;