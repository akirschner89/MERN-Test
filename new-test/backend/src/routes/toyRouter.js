const express = require('express');
const app = express();
const toyRouter = express.Router();
const Toy = require('../models/toy');


//post route
toyRouter.route('/add/post').post(function (req, res) {
    const toy = new Toy(req.body);
    toy.save()
        .then(toy => {
            res.json('Toy Added!');
        })
        .catch(err => {
            res.status(400).send('Unable to save toy. :(');
        });
});


//get route
toyRouter.route('/').get(function (req, res) {
    Toy.find(function (err, theToys) {
        if (err) {
            console.log(err);
        }
        else {
            res.json(theToys);
        }
    });
});

//update route find the toy first then post the update
toyRouter.route('/edit/:id').get(function (req, res) {
    const id = req.params.id;
    Toy.findById(id, function(err, toy) {
        res.json(toy);
    });
});

toyRouter.route('/update/:id').post(function (req, res) {
    Toy.findById(req.params.id, function(err, toy) {
        if (!toy)
        return next(new Error('Could not load doc'));
        else {
            toy.toy = req.body.toy;
            toy.save().then(toy => {
                res.json('Update complete');
            })
            .catch(err => {
                res.status(400).send("Unable to update the database");
            })
        }
    });
});

//delete/destroy route
toyRouter.route('/delete/:id').get(function (res, req) {
    Toy.findByIdAndremove({_id: req.params.id}, 
    function(err, toy) {
        if (err) res.json(err);
        else res.json("Successful Destory");
    })
})


module.exports = toyRouter;