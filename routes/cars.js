const express = require('express');
const router = express.Router();
const imageUpload = require('../utils/image_upload')
const { loginRequired } = require('../controllers/auth_controller');


const { 
    readData, 
    readOne,
    createData,
    updateData,
    deleteData
  } = require('../controllers/car_controller');

router
    .get('/', readData)
    .get('/:id', loginRequired, readOne)
    .post('/', loginRequired, imageUpload.single('image'), createData)
    .put('/:id', loginRequired, imageUpload.single('image'), updateData)
    .delete('/:id', loginRequired, deleteData);

module.exports = router;