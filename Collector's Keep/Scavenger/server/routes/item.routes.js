/** @format */

const ItemController = require('../controllers/item.controller');
const UserController = require('../controllers/user.controller');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
let path = require('path');

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'images');
	},
	filename: function (req, file, cb) {
		cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
	},
});

const fileFilter = (req, file, cb) => {
	const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
	if (allowedFileTypes.includes(file.mimetype)) {
		cb(null, true);
	} else {
		cb(null, false);
	}
};

let upload = multer({ storage, fileFilter });

module.exports = app => {
	app.get('/api/items', ItemController.findAllItems);
	app.post('/api/items', upload.single('photo'), ItemController.createItem);
	app.get('/api/items/:_id', ItemController.findOneItem);
	app.put('/api/items/:_id', ItemController.updateOneItem);
	app.delete('/api/items/:_id', ItemController.deleteItem);
	// admin routes for viewing all users in system and deleting user accounts
	app.get('/api/users', UserController.getAllUsers);
	app.post('/api/users/register', UserController.register);
	app.post('/api/users/login', UserController.login);
	app.get('/api/users/getloggedinuser', UserController.getLoggedInUser);
	app.get('/api/users/logout', UserController.logout);
};
