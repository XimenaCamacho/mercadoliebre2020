const fs = require('fs');
const path = require('path');
const multer = require('multer');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, {encoding: 'utf-8'}));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		res.render('products', {'products': products, toThousand});
	},
	// Detail - Detail from one product
	detail: (req, res) => {
		let productId = req.params.id;
		let userSelection = products.find(product => product.id==req.params.id);
		res.render('detail', {'userSelection':userSelection, toThousand});
	},
	// Create - Form to create
	create: (req, res) => {
		res.render('product-create-form');
	},
	// Create -  Method to store
	store: (req, res, next) => {
		let maxId = 0; 
		for (let i =0; i<products.length; i++) {
			if (maxId<products[i].id) {
				maxId= products[i].id;
			};
		};
		console.log(req)
		let newProduct = {
		id: (maxId+1),
		...req.body,
		image: req.file.filename
		};
		products.push(newProduct);
		let productsJSON = JSON.stringify(products, null, ' ');
		fs.writeFileSync(productsFilePath , productsJSON);
		console.log(newProduct)
		res.redirect('/products');
	},
	// Update - Form to edit
	edit: (req, res) => {
		let editProduct = products.find(product => product.id==req.params.id);
		res.render('product-edit-form', {'editProduct' :editProduct});
	},
	// Update - Method to update
	update: (req, res) => {
		let productToEdit = [];
		for (let i=0; i<products.length; i++) {
			if (products[i].id == req.params.id) {
				productToEdit = {
					id: products[i].id,
					...req.body,
					image: products[i].image
				};
				products[i]= productToEdit;
			};
		};
		console.log(products)
		let productsJSON = JSON.stringify(products, null, ' ')
		fs.writeFileSync(productsFilePath , productsJSON);
		res.redirect('/products');
	},
	// Delete - Delete one product from DB
	destroy : (req, res) => {
		let productId = req.params.id;
		let newProducts = products;
		newProducts = products.filter (product => product.id!=req.params.id);
		let newProductsJSON = JSON.stringify(newProducts, null, ' ')
		fs.writeFileSync(productsFilePath , newProductsJSON);
		res.redirect('/products');
	}
};

module.exports = controller;