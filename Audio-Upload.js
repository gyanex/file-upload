const multer = require('multer');
const path = require('path');

const AUDIO_DIR = "Z:\\UploadContent\\Audio";

let audioStorage = multer.diskStorage({
    destination:(res, file, cbDestination)=>{
        cbDestination(null, AUDIO_DIR)
    },
    filename:(req, file, cbFilename)=>{
        cbFilename(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
})

exports.audioMulter = multer({
    storage:audioStorage
})