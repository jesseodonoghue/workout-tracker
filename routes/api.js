const router = require("express").Router();
const Workout = require("../models/workout");

router.post("/api/workouts", (req, res) => {
    Workout.create({
        exercises: []
    })
    .then(dbWorkout => {
        res.json(dbWorkout)
    })
    .catch((err) => {
        res.json(err);
    })
});

router.put("/api/workouts/:id", ({
    body,
    params
}, res) => {
    Workout.findByIdAndUpdate({ _id: params.id }, {
        $push: {
            exercises: {
                type: body.type,
                name: body.name,
                duration: body.duration,
                weight: body.weight,
                reps: body.reps,
                sets: body.sets,
                distance: body.distance
            }
        }
    })
    .then(res => {
        console.log("result", res)
    })
    .catch((err) => {
        res.json(err);
    })
});

router.get("/api/workouts", (req, res) => {
    Workout.find()
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.json(err);
    });
});

router.get("/api/workouts/range", (req, res) => {
    Workout.find({}).limit(7)
    .then(function (data) {
        res.json(data)
    });
});

router.delete("/api/workouts", ({ body }, res) => {
    Workout.findByIdAndDelete({
        _id: body.id
    })
    .then(res => {
        console.log(res)
    })
    .catch(err => {
        console.log(err)
    });
});

module.exports = router;