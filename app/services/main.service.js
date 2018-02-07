app.service("mainService", function() {

	var inventory = [
		{"name":"Cocoa", "units": 10, "cost": 0.90},
		{"name":"Coffee","units": 10, "cost": 0.75},
		{"name":"Whipped Cream","units": 10, "cost": 1.00},
		{"name":"Cream","units": 10, "cost": 0.25},
		{"name":"Decaf Coffee","units": 10, "cost": 0.75},
		{"name":"Espresso","units": 10, "cost": 1.10},
		{"name":"Foamed Milk","units": 10, "cost": 0.35},
		{"name":"Steamed Milk","units": 10, "cost": 0.35},
		{"name":"Sugar","units": 10, "cost": 0.25}
	];

	var menu = [
		{
			"name": "Coffee",
			"outOfStock": false,
			"cost": 0.0,
			"ingredients" : [
				{"name": "Coffee", "units": 3},
				{"name": "Sugar", "units": 1},
				{"name": "Cream", "units": 1}
			]
		},
		{
			"name": "Decaf Coffee",
			"outOfStock": false,
			"cost": 0.0,
			"ingredients" : [
				{"name": "Decaf Coffee", "units": 3},
				{"name": "Sugar", "units": 1},
				{"name": "Cream", "units": 1}
			]
		},
		 {
		 	"name": "Caffe Latte",
			"outOfStock": false,
			"cost": 0.0,
			"ingredients" : [
				{"name": "Espresso", "units": 2},
				{"name": "Steamed Milk", "units": 1}
			]
		},
		{
			"name": "Cafe Americano",
			"outOfStock": false,
			"cost": 0.0,
			"ingredients" : [
				{"name": "Espresso", "units": 3}
			]
		},
		{
			"name": "Caffe Mocha",
			"outOfStock": false,
			"cost": 0.0,
			"ingredients" : [
				{"name": "Espresso", "units": 1},
				{"name": "Cocoa", "units": 1},
				{"name": "Steamed Milk", "units": 1},
				{"name": "Whipped Cream", "units": 1}
			]
		},
		{
			"name": "Cappuccino",
			"outOfStock": false,
			"cost": 0.0,
			"ingredients" : [
				{"name": "Espresso", "units": 2},
				{"name": "Steamed Milk", "units": 1},
				{"name": "Foamed Milk", "units": 1}
			]
		}
	];

	/*
	 * Verifies if inventory is sufficient
	 * to dispense product and decrements units
	 * upon successful verification.
	 */
	function purchase(index) {

		// Get product and ingredients
		var product = getMenu()[index];
		var ings = product.ingredients.sort(sortIngreds);

		for (var i in ings) {
			var invItem = findInvItem(ings[i].name);
			
			if (invItem[0].units >= ings[i].units) {
				invItem[0].units -= ings[i].units;
			} else {
				product.outOfStock = true;	
				return "Out of stock: " + product.name;
			}
		}
		return "Dispensing: " + product.name;
	}

	// Calculate menu item costs
	function calcCost() {
		menu.forEach(item => {
			item.ingredients.forEach(ing => {
				var invItem = findInvItem(ing.name);
				item.cost += (invItem[0].cost * ing.units);
			});
		});
	}

	// Find inventory item which corresponds to ingredient
	function findInvItem(ing) {
		return getInventory().filter(inv => {
			return inv.name == ing; 
		});
	}

	// Restock inventory
	function restock() {
		inventory.forEach(item => {
			item.units = 10;
		});

		menu.forEach(item => {
			item.outOfStock = false;
		});
	}

	/* 
	 * Sort ingredients array based on 
	 * units required in descending order
	 */
	function sortIngreds(a, b) {
		return b.units - a.units;
	}

	// Sort inventory and menu alphabetically
	function sortAlpha(a, b) {
		return a.name > b.name;
	}

	// Get sorted inventory items
	function getInventory() {
		return inventory.sort(sortAlpha);
	}

	// Get sorted menu items
	function getMenu() {
		return menu.sort(sortAlpha);
	}

	return {
		getInventory: getInventory,
		purchase: purchase,
		getMenu: getMenu,
		restock: restock,
		calcCost: calcCost
	};
	
});