const Car = require('../models/car_schema');

const readData = (req, res) => {
    Car.find()
            .then((data) => {
                console.log(data);
                if(data){
                    res.status(200).json(data);
                }
                else{
                    res.status(404).json("None found");
                }
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    // res.status(200).json({
    //     "msg" : "All Cars retrieved"
    // });
};

const readOne = (req, res) => {

    let id = req.params.id;

    // connect to db and retrieve Car with :id
    Car.findById(id)
    .then((data) => {
        if(data){
            res.status(200).json(data);
        }
        else{
            res.status(404).json({
                "msg": `Car with id: ${id} not found`
            })
        }
        // res.status(200).json({
        //     "msg": "Sucess",
        //     "data": data
        // })
    })
    .catch((err) => {
        console.error(err);
        if(err.name === 'CastError') {
            res.status(404).json({
                "msg": `Bad Request, ${id} is not a valid id`
            })
        }
        else{
            res.status(500).json(err)
        }       

    });
    
};

const createData = (req, res) => {
    //console.log(req.body);
    let carData = req.body;
    // connect to db, check if email exists, if yes respond with error
    // if some Car info is missing, respond with error
    Car.create(carData)
            .then((data) => {
                console.log('New Car created',data);
                res.status(201).json(data);
            })
            .catch((err) => {
                if(err.name === 'ValidationError'){
                    console.error('Validation Error!!', err);
                    res.status(422).json({
                        "msg": "Validation Error",
                        "err": err.message
                    })
                }
                else{
                console.error(err);
                res.status(500).json(err);
                }
            })
   
};

const updateData = (req, res) => {

    let id = req.params.id;
    let body = req.body;

    Car.findByIdAndUpdate(id, body, {
        new: true
    })
        .then((data) => {
            if(data){
                res.status(201).json(data);
            }
            else{
                res.status(404).json({
                    "msg": `Car with id: ${id} not found`
                })
            }
            res.status(200).json({
                "msg": "Sucess",
                "data": data
            })
        })
        .catch((err) => {
            if(err.name === 'ValidationError'){
                console.error('Validation Error!!', err);
                res.status(422).json({
                    "msg": "Validation Error",
                    "err": err.message
                })
            }
            else if(err.name === 'CastError') {
                res.status(404).json({
                    "msg": `Bad Request, ${id} is not a valid id`
                })
            }            
            else{
            console.error(err);
            res.status(500).json(err);
            }
        });   
    
};

const deleteData = (req, res) => {

    let id = req.params.id;

    Car.deleteOne({_id: id })
    .then((data) => {
        if(data.deletedCount){
            res.status(200).json({
                "msg": `Car with id: ${id} deleted succussfully`
            });
        }
        else{
            res.status(404).json({
                "msg": `Car with id: ${id} is deleted`
            })
        }
        res.status(200).json({
            "msg": "Sucess",
            "data": data
        })
    })
    .catch((err) => {
        console.error(err);
        if(err.name === 'CastError') {
            res.status(404).json({
                "msg": `Bad Request, ${id} is not a valid id`
            })
        }
        else{
            res.status(500).json(err)
        }       

    })
};

module.exports = {
    readData,
    readOne,
    createData,
    updateData,
    deleteData
};
