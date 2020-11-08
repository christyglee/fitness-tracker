const router = require("express").Router();
const db = require("../models");
// const Workout = require(("../models/workouts.js"))

router.get("/api/workouts", (req, res) => {
    db.Workout.find()
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.status(400).json(err);
    })
});

router.post("/api/workouts", ({ body }, res) => {
    db.Workout.create(body)
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.json(err);
    });
});
router.get("/api/workouts/range", (req, res) => {
    db.Workout.find()
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.status(400).json(err);
    })
});
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
router.put("/api/workouts/:id", ({body, params}, res) => {
    // console.log(body, params)
    const id = params.id;
    let savedExercises = [];
    // retrieves saved exercises in current workouts
    db.Workout.find({_id: id})
        .then(dbWorkout => {
            // console.log(dbWorkout)
            savedExercises = dbWorkout[0].exercises;

            res.json(savedExercises);
            // console.log('body', body);
            let allExercises = [...savedExercises, body];
            // console.log('allExercises', allExercises);
            updateWorkout(allExercises);
        })
        .catch(err => {
            res.json(err);
        });
    function updateWorkout(exercises){
        db.Workout.findByIdAndUpdate(id, {exercises: exercises}, function(err, doc){
        if(err){
            console.log(err)
        }
        })
    }        
});

module.exports = router;