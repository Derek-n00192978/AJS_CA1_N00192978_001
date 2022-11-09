const { Schema, model } = require('mongoose');

const carSchema = Schema(
    {
        make:{
            type: String,
            required: [true, 'make field is required'],
        },
        model:{
            type: String,
            required: [true, 'model field is required'],
        },
        series:{
            type: String,
        },
        year:{
            type: String,
            required: [true, 'year field is required'],
        },
        reg_plate:{
            type: String,
        },
        engine_cap:{
            type: String,
            required: [true, 'engine_capicaty field is required'],
        },
        fuel:{
            type: String,
            required: [true, 'fuel field is required'],
        },
        colour:{
            type: String,
        },
        transmission:{
            type: String,
            required: [true, 'transion field is required'],
        },
        body_type:{
            type: String,
        },
        image_path:{
            type: String,
        }

    },
    { timestamps: true }
);

module.exports = model('Car', carSchema);