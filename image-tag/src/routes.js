// required libs
const express = require('express');
const multer = require('multer');

// define multer storage behavior
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, '/media/image-tag/images');
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname.replace(/ /g, ''));
	},
});

// set multer storage destination
const upload = multer({ storage: storage });

// create router object
const router = express.Router();

// home page
router.route('').get((req, res) => res.send('Welcome to the image-tag service'));

// get image controller
const imageController = require('./controllers/image-controller.js');

// image routes

// route to upload image files
router.route('/image-file').post(upload.single('image'), (req, res) => res.end('file uploaded'));

// route to handle image form data (both files and external links)
router.route('/image').post(upload.any(), imageController.postImage);

// route to serve static image files
router.route('/image/:tag').get(imageController.getImage);

// export router objects
module.exports = router;
