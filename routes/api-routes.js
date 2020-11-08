//Dependencies
const router = require("express").Router();
const db = require("../models");
// const Workout = require(("../models/workouts.js"))


//API Routes 

//gets all workouts
router.get("/api/workouts", (req, res) => {
    db.Workout.find()
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        })
});

//creates workout 
router.post("/api/workouts", ({ body }, res) => {
    db.Workout.create(body)
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
});

//gets all workouts in range
router.get("/api/workouts/range", (req, res) => {
    db.Workout.find()
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        })
});

//getting workout
router.get("/api/workouts/:id", (req, res) => {
    const { id } = req.params;
    db.Workout.findOne({
        _id: id,
    }).then(dbWorkout => {
        res.json(dbWorkout);
    })
        .catch(err => {
            res.status(400).json
        })
});

//posting workout
router.put("/api/workouts/:id", ({ body, params }, res) => {
    // console.log(body, params)
    const id = params.id;
    let savedExercises = [];
    // retrieves saved exercises
    db.Workout.find({ _id: id })
        .then(dbWorkout => {
            // console.log(dbWorkout)
            savedExercises = dbWorkout[0].exercises;

            res.json(savedExercises);
            // console.log('body', body);
            let allExercises = [...savedExercises, body];
            addWorkout(allExercises);
        })
        .catch(err => {
            res.json(err);
        });

    function addWorkout(exercises) {
        db.Workout.findByIdAndUpdate(id, { exercises: exercises }, function (err, doc) {
            if (err) {
                console.log(err)
            }
        })
    }
});


module.exports = router;