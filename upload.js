const multer = require('multer');
const path = require('path');


// Set Storage engine
const storage = multer.diskStorage({
   destination: './public/images/',
   filename: function(req, file, callback){
       callback(null, file.field_name + '-' + Date.now() + path.extname(file.originalname));
   }
})

// Initialize upload
const upload = multer({
   storage: storage,
   limits: {fileSize: 1000000},
   fileFilter: function(req, file, callback) {
     // Allowed extensions
     let fileTypes = /jpg|jpeg|png|gif/;
     // check file extension
     let extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
     // check mime type
     let mimetype = fileTypes.test(file.mimetype);
    
     if (mimetype && extname){
         return callback(null, true);
     }else{
         callback('Error: Images Only!!')
     }
   }
}).single('image');



module.exports = upload;