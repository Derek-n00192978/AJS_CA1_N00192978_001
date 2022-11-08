const multer = require('multer');
const path = require('path');
//const image = multer({ dest: 'public/uploads/'});

const storage = multer.diskStorage({
    fileFilter: (req, file, cb) => {
        if (!file) {
            return cb(new Error('No image files found'), false);
        }
        else if (!file || !file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
            return cb(new Error('Only image files are allowed'), false);
        }
        //to accept make cb equal true
        cb(null, true);
    },
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