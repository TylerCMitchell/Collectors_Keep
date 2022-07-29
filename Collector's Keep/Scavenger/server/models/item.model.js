/** @format */

const mongoose = require('mongoose');

const ScavengerSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: [true, 'Item name is required'],
			minlength: [2, 'Item name must be at least 3 characters'],
		},
		price: {
			type: Number,
			required: [true, 'Price is required'],
			min: [2, 'Price must be greater than $2'],
		},
		description: {
			type: String,
			required: [true, 'Description is required'],
			minlength: [10, 'Description must be at least 10 characters'],
		},
		imgUrl: {
			type: String,
		},
		photo: {
			type: String,
		},
		dateAdded: {
			type: Date,
			// required: [true, 'Date is required'],
		},
		itemCondition: {
			type: String,
			// required: [true, 'Item condition is required'],
		},
		forSale: {
			type: Boolean,
		},
	},
	{ timestamps: true },
);

// module.exports.Product = mongoose.model("Product", BeltExamSchema);
const Item = mongoose.model('Item', ScavengerSchema);
module.exports = Item;
