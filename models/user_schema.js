const { Schema, model } = require('mongoose');

const userSchema = Schema(
    {
        fName:{
            type: String,
            required: [true, 'fName field is required'],
        },
        lName:{
            type: String,
            required: [true, 'lName field is required'],
        },
        phone:{
            type: String,
        },
        email:{
            type: String,
            required: [true, 'email field is required'],
        },
        image_id:{
            type: String,
        },
        restorer:{
            type: String,
        },
        modifier:{
            type: String,
        },
        enthusiast:{
            type: String,
        }

    },
    { timestamps: true }
);
module.exports = model('User', userSchema);