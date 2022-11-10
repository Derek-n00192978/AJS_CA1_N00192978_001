const auto_parts = require('../models/auto_parts_schema');
const fs = require('fs');
const deleteImage = (fileName) => {
    let path = `public${process.env.STATIC_FILES_URL}${fileName}`;
fs.access(path, fs.F_OK, (err) => {
    if(err){
        console.error(err);
        return;
    }
    //actually delete image here
    fs.unlink(path, () => {
        if(err) throw err;
        console.log(`${fileName}} was deleted`)
    });
})
};

const readData = (req, res) => {
    auto_parts.find()
            .then((data) => {
                console.log(data);
                if(data.length > 0){
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
    //     "msg" : "All auto_partss retrieved"
    // });
};

const readOne = (req, res) => {

    let id = req.params.id;

    // connect to db and retrieve auto_parts with :id
    auto_parts.findById(id)
    .then((data) => {
        if(data){
            let img = `${process.env.STATIC_FILES_URL}${data.image_path}`;
            data.image_path = img;
            res.status(200).json(data);
        }
        else{
            res.status(404).json({
                "msg": `auto_parts with id: ${id} not found`
            });
        }
        
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
    let auto_partsData = req.body;
    if(req.file){
        auto_partsData.image_path = req.file.filename;
    }
    else {
        return res.status(422).json({
            message: req.imageError || "image not uploaded"
        })
    }
    // connect to db, check if email exists, if yes respond with error
    // if some auto_parts info is missing, respond with error
    auto_parts.create(auto_partsData)
            .then((data) => {
                console.log('New auto_parts created',data);
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
    let file = req.file;

    if(file){
        body.image_path = file.filename;
    }
    else {
        return res.status(422).json({
            message: req.imageError || "image not uploaded"
        })
    }

    auto_parts.findByIdAndUpdate(id, body, {
        new: false
    })
        .then((data) => {
            if(data){
                 //old image delete//
                ///////////////////
                deleteImage(data.image_path)
                ////////////////////
                res.status(201).json(data);
            }
            else{
                res.status(404).json({
                    "msg": `auto_parts with id: ${id} not found`
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
    let imagePath = '';

    auto_parts.findById(id)
       .then((data) => {
            if(data){
                imagePath = data.image_path;
                return data.remove();
            }
            else{
                res.status(400).json({
                    "message": `Bad request, ${id} is not a valid id`
                });
            }
       })
       //changed promise
       .then((data) => {
            console.log('auto_parts removed');
            //////Delete Image/////////
            deleteImage(imagePath);
            ///////////////////////////
            res.status(200).json({
                "message": `auto_parts with id: ${id} deleted sucussfully`
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