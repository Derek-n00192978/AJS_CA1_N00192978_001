const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs'); 
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
        password:{
            type:String,
            required: [true, 'pword field is required']
        },
        phone:{
            type: String,
        },
        email:{
            type: String,
            required: [true, 'email field is required'],
            unique: true,
            lowercase: true,
            trim: true,
        },
        image_id:{
            type: String
        },
        restorer:{
            type: String
        },
        modifier:{
            type: String
        },
        enthusiast:{
            type: String
        }

    },
    { timestamps: true }
);
//password checker
userSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password, this.password, function(result){
        return result;
    });
};
module.exports = model('User', userSchema);