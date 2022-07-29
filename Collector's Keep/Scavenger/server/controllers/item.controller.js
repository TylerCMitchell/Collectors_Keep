/** @format */

const Item = require('../models/item.model');

(module.exports.findAllItems = (req, res) => {
	Item.find()
		.then(allItems => {
			res.json({ results: allItems });
		})
		.catch(err => {
			res.json(err);
		});
}),
	(module.exports.findOneItem = (req, res) => {
		Item.findOne({ _id: req.params._id })
			.then(item => {
				res.json({ results: item });
			})
			.catch(err => {
				res.json(err);
			});
	}),
	(module.exports.findOneItem = (req, res) => {
		Item.findOne({ _id: req.params._id })
			.then(item => {
				res.json({ results: item });
			})
			.catch(err => {
				res.json(err);
			});
	}),
	(module.exports.createItem = (req, res) => {
		console.log('REQ FILE is THIS:', req.file);
		const newItemData = {
			...req.body,
			photo: req.file.filename,
		};
		Item.create(newItemData)
			.then(newItem => {
				res.json({ results: newItem });
			})
			.catch(err => {
				res.json(err);
			});
	}),
	(module.exports.updateOneItem = (req, res) => {
		Item.findOneAndUpdate({ _id: req.params._id }, req.body, { new: true, runValidators: true })
			.then(updatedItem => {
				res.json({ results: updatedItem });
			})
			.catch(err => {
				res.json(err);
			});
	});
module.exports.deleteItem = (req, res) => {
	Item.deleteOne({ _id: req.params._id })
		.then(item => {
			res.json({ results: item });
		})
		.catch(err => {
			res.json(err);
		});
};
