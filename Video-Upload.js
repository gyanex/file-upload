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

// exports.thumbNail = function (filename) {
//     ffMpeg('Z:\\UploadContent\\Video\\' + filename).screenshots({
//         timestamps: ['00:01:00'],
//         filename: filename + '.jpeg',
//         folder: 'Z:\\UploadContent\\Screenshot\\',
//         size: '320x240'
//     }).on('error', function(err) {
//         console.log('An error occurred: ' + err.message);
//       }).on('end', ()=>{
//           console.log('taken')
//            return ('Z:\\UploadContent\\Screenshot'+filename+'.jpeg')
//       })
// }