const imageService = require('../services/image-service');

const postImage = async (req, res, next) => {
	const tag = req.body.tag;
	const type = req.body.type;
	let name = '';
	if (type === 'file') name = req.files[0].originalname.replace(/ /g, '');
	else if (type === 'link') name = req.body.image;
	try {
		await imageService.setTag(tag, type, name);
	} catch (e) {
		console.log(e);
	}
	// redirect to upload file endpoint if file was uploaded
	if (type === 'file') res.redirect(307, '/image-file');
	else res.sendStatus(200);
	next();
};

const getImage = async (req, res, next) => {
	const tag = req.params.tag;
	try {
		let link = await imageService.getTag(tag);
		console.log(link);
		// redirect to actual image link
		res.redirect(link);
	} catch (e) {
		console.log(e);
	}
	next();
};

module.exports = { postImage, getImage };
