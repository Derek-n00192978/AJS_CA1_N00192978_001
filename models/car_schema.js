const { Schema, model } = require('mongoose');

const carSchema = Schema(
    {
        make:{
            type: String,
        },
        model:{
            type: String,
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
        fuel:{
            type: String,
        },
        colour:{
            type: String,
        },
        transmission:{
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