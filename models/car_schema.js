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
        },
        reg_plate:{
            type: String,
        },
        engine_cap:{
            type: String,
        },
        body_type:{
            type: String,
        },
        user_id:{
            type: String,
        },
        image_id:{
            type: String,
        }

    },
    { timestamps: true }
);
module.exports = model('Car', carSchema);