const multer = require('multer');
const path = require('path');
//const image = multer({ dest: 'public/uploads/'});
const fileFilter = (req, file, cb) => {
    console.log(`filename ${file.originalname}`);
    console.log(`filename match: ${file.originalname.match(/\.(jpg|jpeg|png|gif)$/)}`);

    //////////////////////////////////////////////////////////////
    if (!file ) {
        req.imageError = "Image not uploaded"
        return cb(null, false);
    }
    else if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        req.imageError = "image does not match"
         //to accept make cb equal true
        return cb(null, true);
    } 
    cb(null, true);   
};

const storage = multer.diskStorage({
  
    destination: (req, file, cb) => {
        cb(null, 'public' + process.env.STATIC_FILES_URL);
    },
    filename: (req, file, cb) => {
        console.log(file.path);
        console.log(file.originalname);

        cb(null, Date.now() + path.extname(file.originalname));
    }
})

module.exports = multer({ storage: storage });