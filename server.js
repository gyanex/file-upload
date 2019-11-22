const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');
const ffMpeg = require('fluent-ffmpeg');
const getSize = require('get-folder-size');

let video = require('./Video-Upload.js');
let audio = require('./Audio-Upload.js');
let doc = require('./Doc-Upload.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('E:\\UploadContent'));

app.use(function (req, res, next) {
	res.setHeader('access-control-allow-origin', 'http://localhost:4200');
	res.setHeader('access-control-allow-methods', 'get,put,post,delete');
	res.setHeader('access-control-allow-headers', 'x-requested-with,content-type');
	res.setHeader('access-control-allow-credentials',true);
	next();
});

app.post('/api/video_upload',function(req, res){
	(video.videoMulter.single)('video')(req, res, function(err){
		if(err instanceof multer.MulterError){
			console.log('multer'+err)
		}
		else if(err){
			console.log('normal'+err)
		}
		else{
			ffMpeg('Z:\\UploadContent\\Video\\' + req.file.filename).screenshots({
				timestamps: ['00:01:00'],
				filename: req.file.filename + '.jpeg',
				folder: 'Z:\\UploadContent\\Screenshot\\',
				size: '320x240'
			}).on('error', function(err) {
				console.log('An error occurred: ' + err.message);
			  }).on('end', ()=>{
				  console.log('taken')
				  res.send({"file":req.file, "sspath":'Z:\\UploadContent\\Screenshot'+req.file.filename+'.jpeg'});
			  })
		}
	})
});

app.post('/api/audio_upload', function(req, res){
	(audio.audioMulter.single)('audio')(req, res, function(err){
		if(err instanceof multer.MulterError){
			console.log('multer'+err)
		}
		else if(err){
			console.log('normal'+err)
		}
		res.send(req.file);
	})
});

app.post('/api/doc_upload', function(req, res){
	(doc.docMulter.single)('doc')(req, res, function(err){
		if(err instanceof multer.MulterError){
			console.log('multer'+err)
		}
		else if(err){
			console.log('normal'+err)
		}
		res.send(req.file);
	})
});


app.get('/api/vSize', (req, res)=>{
	getSize('Z:\\UploadContent\\Video', (err, size)=>{
		if(err){
			res.send({"error":err});
		}
		else{
			res.json({"size":(size/1024/1024).toFixed(2)+' MB'});
		}
	})
});

port = 3000;
app.listen(port);
console.log('UploadServer: ' + port);

// for(i=1;i<=7;i++){
// 	let a='#';
// 	for(j=1;j<i;j++){
// 		a=a+'#';
// 	}
// 	console.log(a)
// 	}

// for(i=0;i<8;i++){
// 	let a='';
// 	for(j=0;j<8;j++){
// 		if(i%2==0){
// 		if(j%2==0){
// 			a=a+' '
// 		}
// 		else{
// 			a=a+'#'
// 		}
// 	}
// 	else{
// 		if(j%2==0){
// 			a=a+'#'
// 		}
// 		else{
// 			a=a+' '
// 		}
// 	}
// 	}
// 	console.log(a)
// }