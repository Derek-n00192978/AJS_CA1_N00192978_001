const { Schema, model } = require('mongoose');

const auto_partsSchema = Schema(
    {
        name:{
            type: String,
            required: [true, 'make field is required'],
        },
        location:{
            type: String,
            required: [true, 'model field is required'],
        },
        phone:{
            type: String,
        },
        web_address:{
            typr: String,
        },
        image_path:{
            type: String,
        }

    },
    { timestamps: true }
);

module.exports = model('auto_parts', auto_partsSchema);