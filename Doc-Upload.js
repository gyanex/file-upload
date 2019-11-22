const multer = require('multer');
const path = require('path');

const DOC_DIR = "Z:\\UploadContent\\Documents";

let docStorage = multer.diskStorage({
    destination:(res, file, cbDestination)=>{
        cbDestination(null, DOC_DIR)
    },
    filename:(req, file, cbFilename)=>{
        cbFilename(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
})

exports.docMulter = multer({
    storage:docStorage
})