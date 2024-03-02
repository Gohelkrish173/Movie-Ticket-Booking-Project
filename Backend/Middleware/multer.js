const multer = require('multer');

const storage = multer.diskStorage({
  destination:function(req,file,cb){
    cb(null,'public/assets');
  },
  filename:function(req,file,cb){
    const uniqueSuffix = Date.now();
    cb(null, file.originalname + '-' + uniqueSuffix)
  }
})

const upload = multer({storage});
module.exports = upload;