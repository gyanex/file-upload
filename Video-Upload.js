const multer = require('multer');
const path = require('path');


const VIDEO_DIR = "Z:\\UploadContent\\Video";

let videoExt = '.MP4.FLV.MKV.3GP.AVI.MOV.MPG.WMV.SWF.WEBM';
let videoStorage = multer.diskStorage({
    destination: (res, file, cbDestination) => {
        cbDestination(null, VIDEO_DIR)
    },
    filename: (req, file, cbFilename) => {
        cbFilename(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
})


exports.videoMulter = multer({
    storage: videoStorage
})




exports.newUpload = (req)=>{
    
}