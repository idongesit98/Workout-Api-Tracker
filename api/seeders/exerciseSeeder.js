const {Exercise} = require("../Model/Exercise.model")
const sequelize = require("../Utils/Dbconnect/sqlConnect");

const seedExercises = async () => {
    try {
      await sequelize.sync(); // Ensure database is synced before seeding
  
      const exercises = [
        {
          name: "Push-ups",
          sets: 3,
          reps: 15,
          weight: null,
          workoutId: 1},
        {
          name: "Bench Press",
          sets: 4,
          reps: 12,
          weight: 60, // In kg
          workoutId: 2, // Ensure a valid workout ID exists
        },
        {
          name: "Squats",
          sets: 4,
          reps: 10,
          weight: 806,
          workoutId: 1
        },
           { name: "Jumping Jacks", description: "A cardio exercise for warm-up",sets: 5, reps: 9,workoutId: 1 },
            { name: "Deadlifts", description: "A compound exercise for overall strength",sets: 7, reps:10,workoutId: 1 },
            { name: "Bicep Curls", description: "An isolation exercise for biceps",sets: 3, reps: 2,workoutId: 1 },
            { name: "Tricep Dips", description: "An isolation exercise for triceps",sets: 9, reps: 1,workoutId: 1 },
            { name: "Push-ups", description: "A bodyweight exercise for chest and triceps",sets: 8, reps: 0,workoutId: 1 },
            { name: "Lunges", description: "A compound exercise for legs",sets: 3, reps: 1, workoutId: 2 },
            { name: "Planks", description: "A core exercise for stability and strength",sets: 4, reps: 8, workoutId: 1},
            { name: "Rowing Machine", description: "A cardio exercise for cardiovascular fitness",sets: 3, reps: 1, workoutId:1},
            { name: "Shoulder Press", description: "A compound exercise for shoulders",sets: 4, reps: 1, workoutId:1},
            { name: "Leg Press", description: "A compound exercise for legs",sets: 6, reps: 2, workoutId:1 },
            { name: "Chest Flys", description: "An isolation exercise for chest",sets:6, reps: 7, workoutId:1 },
            { name: "Russian Twists", description: "A core exercise for obliques",sets: 3, reps:1, workoutId:1 }  
      ];
  
      await Exercise.bulkCreate(exercises);
      console.log("Exercise data seeded successfully!");
    } catch (error) {
      console.error("Error seeding exercise data:", error);
    } finally {
      await sequelize.close(); // Close the connection after seeding
    }
  };
  
  seedExercises();

