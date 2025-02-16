 const express = require("express")
 const app = express();
 const morgan = require("morgan");
 const AuthRoutes = require('./Routes/auth_routes')
 const ExerciseRoutes = require('./Routes/exercise_routes')
 const WorkoutRoutes = require('./Routes/workout_routes')
 const ScheduleRoute = require("./Routes/schedule_routes")

 app.use(express.json())
 app.use(express.urlencoded({extended:false}))
 app.use(morgan("tiny"))


//
app.use('/auth',AuthRoutes)
app.use('/exercise',ExerciseRoutes)
app.use('/workout',WorkoutRoutes)
app.use("/schedule",ScheduleRoute)

app.get('/', (req, res) => {
    res.json({ message: "Welcome to Workout Tracker Api"}); // Remove extra space
});


 app.use((error,req,res,next) => {
    console.log("Error Handling Middleware called")
    console.log('Path',req.path)
    console.log('Error: ',error)

    if (error.type == 'NOT_FOUND') {
        res.status(500).send(error)
    }else if (error.type == 'NOT_FOUND') {
        res.status(404).send(error)
    }else{
        res.status(500).send(error)
    }

    next()
})

module.exports = app;
