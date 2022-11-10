const express = require('express');
const router = express.Router();
const imageUpload = require('../utils/image_Upload')
const { loginRequired } = require('../controllers/auth_controller');


const { 
    readData, 
    readOne,
    createData,
    updateData,
    deleteData
  } = require('../controllers/auto_parts_controller');

router
    .get('/', readData)
    .get('/:id', loginRequired, readOne)
    .post('/', loginRequired, imageUpload.single('image'), createData)
    .put('/:id', loginRequired, imageUpload.single('image'), updateData)
    .delete('/:id', loginRequired, deleteData);

module.exports = router;