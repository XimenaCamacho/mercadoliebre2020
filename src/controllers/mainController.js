const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, {encoding: 'utf-8'}));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
		let offers = products.filter( (product) => product.category == "in-sale");
		let visited = products.filter( (product) => product.category == "visited");

		res.render("index", { offers, visited, toThousand });
	},
	search: (req, res) => {
		let userSearch = req.query.keywords;
        let userResults = [];
        for (let i=0; i<products.length; i++) {
			/* no distingue entre mayusculas y minusculas*/
			let tolowercase = products[i].name;
			let compare = tolowercase.toLowerCase();/*<--- con esto de aca no hay distincion */
            if (compare.includes(userSearch)) {
                userResults.push(products[i]);
			};
        };
        res.render('results', {userResults : userResults, toThousand} )
	}
};

module.exports = controller;
