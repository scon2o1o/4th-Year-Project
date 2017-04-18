var totalCost = 0;
var fruitAndVegTotal = 0;
var bakeryTotal = 0;
var provisionsTotal = 0;
var meatTotal = 0;
var deliTotal = 0;
var specialityTotal = 0;
var teaAndCoffeeTotal = 0;
var healthFoodTotal = 0;
var juicesTotal = 0;
var biscuitsTotal = 0;
var cerealsTotal = 0;
var paperwareTotal = 0;
var homeBakingTotal = 0;
var nonFoodTotal = 0;
var mineralsTotal = 0;
var alcoholTotal = 0;

var $ = function(id) {
	return document.getElementById(id);
}

function CurrencyFormatted(amount) {
	var i = parseFloat(amount);
	if (isNaN(i)) {
		i = 0.00;
	}
	var minus = '';
	if (i < 0) {
		minus = '-';
	}
	i = Math.abs(i);
	i = parseInt((i + .005) * 100);
	i = i / 100;
	s = new String(i);
	if (s.indexOf('.') < 0) {
		s += '.00';
	}
	if (s.indexOf('.') == (s.length - 2)) {
		s += '0';
	}
	s = minus + s;
	return s;
}

var getHTTPObject = function() {
	var xhr = false;
	if (window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	} else if (window.ActiveXObject) {
		try {
			xhr = new ActiveXObject("Msxml12.XMLHTTP");
		} catch (e) {
			try {
				xhr = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e) {
				xhr = false;
			}
		}
	}
	return xhr;
}

var searchStock = function(url) {
	var request = getHTTPObject();
	if (request) {
		request.onreadystatechange = function() {
			parseResponse(request);
		}
		request.open("GET", url, true);
		request.setRequestHeader("Accept", "application/json");
		request.send(null);
	}
}

function deleteFunction(barCode) {
	if (barCode == "") {
		alert("Please enter a barcode");
	} else {
		window
				.confirm("You are about to delete all records relating to Barcode: "
						+ barCode + ". Do you wish to continue?");
		var deleteUrl = "http://localhost:8080/Final_Project/rest/stock/delete/"
				+ barCode;
		console.log(deleteUrl);
		var request = getHTTPObject();
		if (request) {
			request.onreadystatechange = function() {
				if (request.status == 200 || request.status == 304) {
				}
			};
			request.open("DELETE", deleteUrl, true);
			request.setRequestHeader("Accept", "text/html");
			request.send();
			alert(barCode + " deleted from database");
		}
	}
}

function updateFunction(barcodeToUpdate, option, newValue) {
	console.log(barcodeToUpdate);
	console.log(option);
	console.log(newValue);
	if (barcodeToUpdate == "") {
		alert("Please enter a barcode");
	} else if (newValue == "") {
		alert("Please enter the updated value");
	} else {
		var updateURL = "http://localhost:8080/Final_Project/rest/stock/update/"
				+ barcodeToUpdate + "+" + option + "+" + newValue;
		var request = getHTTPObject();
		if (request) {
			request.onreadystatechange = function() {
				if (request.status == 200 || request.status == 304) {
					console.log(request.response);
				}
			};
			request.open("PUT", updateURL, true);
			request.setRequestHeader("Accept", "text/html");
			request.send();
			alert("Item updated successfully");
		}
	}
}

var addStockItem = function() {
	var myNode = document.getElementById("stockArea");
	myNode.innerHTML = '';

	heading = document.createElement("H2");
	heading.textContent = "Add Stock Item";
	myNode.appendChild(heading);

	updateText = document.createElement("p");
	updateText.textContent = "Enter all the required fields and click 'Submit' to add a new stock item";
	myNode.appendChild(updateText);

	var f = document.createElement("form");
	f.setAttribute('name', "addItemForm");
	f.setAttribute('method', "post");
	f.setAttribute('action',
			"http://localhost:8080/Final_Project/rest/stock/create/");

	var i1 = document.createElement("input");
	i1.setAttribute('type', "text");
	i1.setAttribute('name', "barcode");
	i1.setAttribute("required", "");
	i1.placeholder = "Barcode ... ";

	var br = document.createElement("br");

	var i2 = document.createElement("input");
	i2.setAttribute('type', "text");
	i2.setAttribute('name', "quantity");
	i2.setAttribute("required", "");
	i2.placeholder = "Quantity ... ";

	var br2 = document.createElement("br");

	var i3 = document.createElement("input");
	i3.setAttribute('type', "text");
	i3.setAttribute('name', "name");
	i3.setAttribute("required", "");
	i3.placeholder = "Product Name ... ";

	var br3 = document.createElement("br");

	var i4 = document.createElement("input");
	i4.setAttribute('type', "text");
	i4.setAttribute('name', "price");
	i4.setAttribute("required", "");
	i4.placeholder = "Product Price ... ";

	var br4 = document.createElement("br");

	var i5 = document.createElement("input");
	i5.setAttribute('type', "text");
	i5.setAttribute('name', "description");
	i5.setAttribute("required", "");
	i5.placeholder = "Description ... ";

	var br5 = document.createElement("br");

	var i6 = document.createElement("input");
	i6.setAttribute('type', "text");
	i6.setAttribute('name', "department");
	i6.setAttribute("required", "");
	i6.placeholder = "Department ... ";

	var br6 = document.createElement("br");

	var i7 = document.createElement("input");
	i7.setAttribute('type', "text");
	i7.setAttribute('name', "min_level");
	i7.setAttribute("required", "");
	i7.placeholder = "Minimum Level ... ";

	var br7 = document.createElement("br");

	var s = document.createElement("input");
	s.setAttribute('type', "submit");
	s.setAttribute('value', "Submit");

	f.appendChild(i1);
	f.appendChild(br);
	f.appendChild(i2);
	f.appendChild(br2);
	f.appendChild(i3);
	f.appendChild(br3);
	f.appendChild(i4);
	f.appendChild(br4);
	f.appendChild(i5);
	f.appendChild(br5);
	f.appendChild(i6);
	f.appendChild(br6);
	f.appendChild(i7);
	f.appendChild(br7);
	f.appendChild(s);

	document.getElementById("stockArea").appendChild(f);
}

var deleteStockItem = function() {
	var myNode = document.getElementById("stockArea");
	myNode.innerHTML = '';

	heading = document.createElement("H2");
	heading.textContent = "Delete Stock Item";
	myNode.appendChild(heading);

	deleteText = document.createElement("p");
	deleteText.textContent = "Enter the barcode of the product you would like to delete from the system. WARNING!! All content related to this product will be erased";
	myNode.appendChild(deleteText);

	var input = document.createElement("input");
	input.setAttribute('type', "text");
	input.setAttribute('name', "barcode");
	input.setAttribute('id', "barcodeText");
	input.setAttribute("required", "");
	input.placeholder = "Enter Barcode to Delete ... ";

	var submit = document.createElement("button");
	submit.setAttribute('id', "barcodeToDeleteButton");
	submit.setAttribute('class', "buttonClass");
	var t = document.createTextNode("Delete");
	submit.appendChild(t);

	var br = document.createElement("br");

	myNode.appendChild(input);
	myNode.appendChild(br);
	myNode.appendChild(submit);

	barcodeToDeleteButton.onclick = function() {
		var barcodeToDelete = $("barcodeText").value;
		deleteFunction(barcodeToDelete);
		deleteStockItem();
	}
}

var updateStockItem = function() {
	var myNode = document.getElementById("stockArea");
	myNode.innerHTML = '';

	heading = document.createElement("H2");
	heading.textContent = "Update Stock Item";
	myNode.appendChild(heading);

	updateText = document.createElement("p");
	updateText.textContent = "Enter the barcode of the product you would like to update and choose an option";
	myNode.appendChild(updateText);

	var f = document.createElement("form");
	f.setAttribute('method', "post");
	f.setAttribute('action',
			"http://localhost:8080/Final_Project/rest/stock/update/");

	var input = document.createElement("input");
	input.setAttribute('type', "text");
	input.setAttribute('name', "barcode");
	input.setAttribute('id', "updateText");
	input.setAttribute("required", "");
	input.placeholder = "Enter Barcode to Update ... ";

	var br = document.createElement("br");

	var x = document.createElement("SELECT");
	x.setAttribute('id', "option");
	x.setAttribute('name', "option");
	x.setAttribute('class', "buttonClass");

	var z = document.createElement("option");
	z.setAttribute("value", "barcode");
	var t = document.createTextNode("Barcode");
	z.appendChild(t);
	x.appendChild(z);

	var z1 = document.createElement("option");
	z1.setAttribute("value", "quantity");
	var t1 = document.createTextNode("Quantity");
	z1.appendChild(t1);
	x.appendChild(z1);

	var z2 = document.createElement("option");
	z2.setAttribute("value", "name");
	var t2 = document.createTextNode("Product Name");
	z2.appendChild(t2);
	x.appendChild(z2);

	var z3 = document.createElement("option");
	z3.setAttribute("value", "price");
	var t3 = document.createTextNode("Price");
	z3.appendChild(t3);
	x.appendChild(z3);

	var z4 = document.createElement("option");
	z4.setAttribute("value", "description");
	var t4 = document.createTextNode("Description");
	z4.appendChild(t4);
	x.appendChild(z4);

	var z5 = document.createElement("option");
	z5.setAttribute("value", "department");
	var t5 = document.createTextNode("Department");
	z5.appendChild(t5);
	x.appendChild(z5);

	var z6 = document.createElement("option");
	z6.setAttribute("value", "min_level");
	var t6 = document.createTextNode("Minimum Level");
	z6.appendChild(t6);
	x.appendChild(z6);

	var br2 = document.createElement("br");

	var input2 = document.createElement("input");
	input2.setAttribute('type', "text");
	input2.setAttribute('name', "newValue");
	input2.setAttribute('id', "newUpdatedValue");
	input2.setAttribute("required", "");
	input2.placeholder = "New Value ... ";

	var br3 = document.createElement("br");

	var submit = document.createElement("button");
	submit.setAttribute('id', "barcodeToUpdateButton");
	submit.setAttribute('class', "buttonClass");
	var t = document.createTextNode("Update");
	submit.appendChild(t);

	f.appendChild(input);
	f.appendChild(br);
	f.appendChild(x);
	f.appendChild(br2);
	f.appendChild(input2);
	f.appendChild(br3);
	f.appendChild(submit);

	document.getElementById("stockArea").appendChild(f);

	submit.onclick = function() {
		alert("Item updated successfully");
	}
}

var orderScreen = function(url2) {
	var request = getHTTPObject();
	if (request) {
		request.onreadystatechange = function() {
			parseResponseOrder(request);
		}
		request.open("GET", url2, true);
		request.setRequestHeader("Accept", "application/json");
		request.send(null);
	}
}

var parseResponseOrder = function(request) {
	if (request.readyState == 4) {
		if (request.status == 200 || request.status == 304) {
			var data = JSON.parse(request.responseText);
			if (data == null) {
				alert("No items in Order Table");
			} else {
				var arraySize = Object.keys(data.order).length;

				var myNode = document.getElementById("stockArea");
				myNode.innerHTML = '';

				heading = document.createElement("H2");
				heading.textContent = "Order Screen";
				heading.setAttribute('class', "floatLeft");
				myNode.appendChild(heading);

				var f = document.createElement("form");
				f.setAttribute('method', "post");
				f.setAttribute('action', "SendOrderServlet");

				sendButton = document.createElement("button");
				sendButton.textContent = "Send Order";
				sendButton.setAttribute('class', "buttonFloatRight");
				f.appendChild(sendButton);

				myNode.appendChild(f);

				var br = document.createElement("br");
				myNode.appendChild(br);

				var br2 = document.createElement("br");
				myNode.appendChild(br2);

				var br3 = document.createElement("br");
				myNode.appendChild(br3);

				updateText = document.createElement("p");
				updateText.textContent = "In this table are the items due to be ordered, click 'Send Order' to forward the table to the supplier";
				myNode.appendChild(updateText);

				var startTable = document.createElement("TABLE");
				startTable.setAttribute('id', "myOrderTable");
				startTable.setAttribute('style', "overflow-x:auto");

				myNode.appendChild(startTable);

				var tr = document.createElement("tr");
				tr.setAttribute('id', "myTr");
				document.getElementById("myOrderTable").appendChild(tr);

				var td1 = document.createElement("th");
				var text = document.createTextNode("Barcode");
				td1.appendChild(text);
				document.getElementById("myTr").appendChild(td1);

				var td2 = document.createElement("th");
				var text = document.createTextNode("Name");
				td2.appendChild(text);
				document.getElementById("myTr").appendChild(td2);

				var td3 = document.createElement("th");
				var text = document.createTextNode("Quantity");
				td3.appendChild(text);
				document.getElementById("myTr").appendChild(td3);

				var td4 = document.createElement("th");
				var text = document.createTextNode("");
				td4.appendChild(text);
				document.getElementById("myTr").appendChild(td4);

				var td = [];
				for (j = 0; j < arraySize; j++) {

					var y = document.createElement("TR");
					y.setAttribute("id", "myTr" + [ j ]);
					document.getElementById("myOrderTable").appendChild(y);

					td[j] = document.createElement("td");
					td[j].textContent = data.order[j].barcode;
					td[j].appendChild(text);
					document.getElementById("myTr" + [ j ]).appendChild(td[j]);

					td[j] = document.createElement("td");
					td[j].textContent = data.order[j].name;
					td[j].appendChild(text);
					document.getElementById("myTr" + [ j ]).appendChild(td[j]);

					td[j] = document.createElement("td");
					td[j].textContent = data.order[j].quantity;
					td[j].appendChild(text);
					document.getElementById("myTr" + [ j ]).appendChild(td[j]);
				}
				sendButton.onclick = function() {
					confirm("You are about to send the order to the supplier. All entries in the order table will be removed and you will not be able to make any more changes. *Please Sign In to Continue*");
				}
			}
		}
	}
}

var parseResponse = function(request) {
	if (request.readyState == 4)
		if (request.status == 200 || request.status == 304) {
			totalCost = 0;
			fruitAndVegTotal = 0;
			bakeryTotal = 0;
			provisionsTotal = 0;
			meatTotal = 0;
			deliTotal = 0;
			specialityTotal = 0;
			teaAndCoffeeTotal = 0;
			healthFoodTotal = 0;
			juicesTotal = 0;
			biscuitsTotal = 0;
			cerealsTotal = 0;
			paperwareTotal = 0;
			homeBakingTotal = 0;
			nonFoodTotal = 0;
			mineralsTotal = 0;
			alcoholTotal = 0;

			var data = JSON.parse(request.responseText);
			var arraySize = Object.keys(data.stock).length;

			var myNode = document.getElementById("stockTable");
			myNode.innerHTML = '';

			var table = document.getElementById("stockTable");
			var startTable = document.createElement("TABLE");
			startTable.setAttribute('id', "myStockTable");
			startTable.setAttribute('style', "overflow-x:auto");

			table.appendChild(startTable);

			var tr = document.createElement("tr");
			tr.setAttribute('id', "myTr");
			document.getElementById("myStockTable").appendChild(tr);

			var td1 = document.createElement("th");
			var text = document.createTextNode("Barcode");
			td1.appendChild(text);
			document.getElementById("myTr").appendChild(td1);

			var td2 = document.createElement("th");
			var text = document.createTextNode("Quantity");
			td2.appendChild(text);
			document.getElementById("myTr").appendChild(td2);

			var td3 = document.createElement("th");
			var text = document.createTextNode("Name");
			td3.appendChild(text);
			document.getElementById("myTr").appendChild(td3);

			var td4 = document.createElement("th");
			var text = document.createTextNode("Price");
			td4.appendChild(text);
			document.getElementById("myTr").appendChild(td4);

			var td5 = document.createElement("th");
			var text = document.createTextNode("Description");
			td5.appendChild(text);
			document.getElementById("myTr").appendChild(td5);

			var td6 = document.createElement("th");
			var text = document.createTextNode("Department");
			td6.appendChild(text);
			document.getElementById("myTr").appendChild(td6);

			var td7 = document.createElement("th");
			var text = document.createTextNode("Minimum Level");
			td7.appendChild(text);
			document.getElementById("myTr").appendChild(td7);

			var td8 = document.createElement("th");
			var text = document.createTextNode("");
			td8.appendChild(text);
			document.getElementById("myTr").appendChild(td8);

			var tr = [];
			var td = [];

			for (j = 0; j < arraySize; j++) {

				var y = document.createElement("TR");
				y.setAttribute("id", "myTr" + [ j ]);
				document.getElementById("myStockTable").appendChild(y);

				td[j] = document.createElement("td");
				td[j].textContent = data.stock[j].barcode;
				td[j].appendChild(text);
				document.getElementById("myTr" + [ j ]).appendChild(td[j]);

				td[j] = document.createElement("td");
				td[j].textContent = data.stock[j].quantity;
				td[j].appendChild(text);
				document.getElementById("myTr" + [ j ]).appendChild(td[j]);

				td[j] = document.createElement("td");
				td[j].textContent = data.stock[j].name;
				td[j].appendChild(text);
				document.getElementById("myTr" + [ j ]).appendChild(td[j]);

				td[j] = document.createElement("td");
				var figure = "€" + CurrencyFormatted(data.stock[j].price);
				td[j].textContent = figure;
				td[j].appendChild(text);
				document.getElementById("myTr" + [ j ]).appendChild(td[j]);

				td[j] = document.createElement("td");
				td[j].textContent = data.stock[j].description;
				td[j].appendChild(text);
				document.getElementById("myTr" + [ j ]).appendChild(td[j]);

				td[j] = document.createElement("td");
				td[j].textContent = data.stock[j].department;
				td[j].appendChild(text);
				document.getElementById("myTr" + [ j ]).appendChild(td[j]);

				td[j] = document.createElement("td");
				td[j].textContent = data.stock[j].min_level;
				td[j].appendChild(text);
				document.getElementById("myTr" + [ j ]).appendChild(td[j]);

				if (data.stock[j].department == "Fruit & Veg") {
					fruitAndVegTotal = Number(fruitAndVegTotal)
							+ (Number(CurrencyFormatted(data.stock[j].price)) * Number(data.stock[j].quantity));
				} else if (data.stock[j].department == "Bakery") {
					bakeryTotal = Number(bakeryTotal)
							+ (Number(CurrencyFormatted(data.stock[j].price)) * Number(data.stock[j].quantity));
				} else if (data.stock[j].department == "Provisions") {
					provisionsTotal = Number(provisionsTotal)
							+ (Number(CurrencyFormatted(data.stock[j].price)) * Number(data.stock[j].quantity));
				} else if (data.stock[j].department == "Meat") {
					meatTotal = Number(meatTotal)
							+ (Number(CurrencyFormatted(data.stock[j].price)) * Number(data.stock[j].quantity));
				} else if (data.stock[j].department == "Speciality") {
					specialityTotal = Number(specialityTotal)
							+ (Number(CurrencyFormatted(data.stock[j].price)) * Number(data.stock[j].quantity));
				} else if (data.stock[j].department == "Tea and Coffee") {
					teaAndCoffeeTotal = Number(teaAndCoffeeTotal)
							+ (Number(CurrencyFormatted(data.stock[j].price)) * Number(data.stock[j].quantity));
				} else if (data.stock[j].department == "Health Food") {
					healthFoodTotal = Number(healthFoodTotal)
							+ (Number(CurrencyFormatted(data.stock[j].price)) * Number(data.stock[j].quantity));
				} else if (data.stock[j].department == "Juices") {
					juicesTotal = Number(juicesTotal)
							+ (Number(CurrencyFormatted(data.stock[j].price)) * Number(data.stock[j].quantity));
				} else if (data.stock[j].department == "Biscuits") {
					biscuitsTotal = Number(biscuitsTotal)
							+ (Number(CurrencyFormatted(data.stock[j].price)) * Number(data.stock[j].quantity));
				} else if (data.stock[j].department == "Cereals") {
					cerealsTotal = Number(cerealsTotal)
							+ (Number(CurrencyFormatted(data.stock[j].price)) * Number(data.stock[j].quantity));
				} else if (data.stock[j].department == "Paperware") {
					paperwareTotal = Number(paperwareTotal)
							+ (Number(CurrencyFormatted(data.stock[j].price)) * Number(data.stock[j].quantity));
				} else if (data.stock[j].department == "Home Baking") {
					homeBakingTotal = Number(homeBakingTotal)
							+ (Number(CurrencyFormatted(data.stock[j].price)) * Number(data.stock[j].quantity));
				} else if (data.stock[j].department == "Non Food") {
					nonFoodTotal = Number(nonFoodTotal)
							+ (Number(CurrencyFormatted(data.stock[j].price)) * Number(data.stock[j].quantity));
				} else if (data.stock[j].department == "Minerals") {
					mineralsTotal = Number(mineralsTotal)
							+ (Number(CurrencyFormatted(data.stock[j].price)) * Number(data.stock[j].quantity));
				} else if (data.stock[j].department == "Alcohol") {
					alcoholTotal = Number(alcoholTotal)
							+ (Number(CurrencyFormatted(data.stock[j].price)) * Number(data.stock[j].quantity));
				} else if (data.stock[j].department == "Deli") {
					deliTotal = Number(deliTotal)
					+ (Number(CurrencyFormatted(data.stock[j].price)) * Number(data.stock[j].quantity));
				}
				totalCost = Number(totalCost)
						+ (Number(CurrencyFormatted(data.stock[j].price)) * Number(data.stock[j].quantity));
			}
			document.getElementById("totalCost").innerHTML = "Total Stock Cost: €"
					+ CurrencyFormatted(totalCost);
			document.getElementById("f&v").innerHTML = "€"
					+ CurrencyFormatted(fruitAndVegTotal);
			document.getElementById("bakery").innerHTML = "€"
					+ CurrencyFormatted(bakeryTotal);
			document.getElementById("provisions").innerHTML = "€"
					+ CurrencyFormatted(provisionsTotal);
			document.getElementById("meat").innerHTML = "€"
					+ CurrencyFormatted(meatTotal);
			document.getElementById("deli").innerHTML = "€"
					+ CurrencyFormatted(deliTotal);
			document.getElementById("special").innerHTML = "€"
					+ CurrencyFormatted(specialityTotal);
			document.getElementById("teaandcoffee").innerHTML = "€"
					+ CurrencyFormatted(teaAndCoffeeTotal);
			document.getElementById("healthfood").innerHTML = "€"
					+ CurrencyFormatted(healthFoodTotal);
			document.getElementById("juices").innerHTML = "€"
					+ CurrencyFormatted(juicesTotal);
			document.getElementById("biscuits").innerHTML = "€"
					+ CurrencyFormatted(biscuitsTotal);
			document.getElementById("cereals").innerHTML = "€"
					+ CurrencyFormatted(cerealsTotal);
			document.getElementById("paperware").innerHTML = "€"
					+ CurrencyFormatted(paperwareTotal);
			document.getElementById("homeBaking").innerHTML = "€"
					+ CurrencyFormatted(homeBakingTotal);
			document.getElementById("nonfood").innerHTML = "€"
					+ CurrencyFormatted(nonFoodTotal);
			document.getElementById("minerals").innerHTML = "€"
					+ CurrencyFormatted(mineralsTotal);
			document.getElementById("alcohol").innerHTML = "€"
					+ CurrencyFormatted(alcoholTotal);
		}
}

window.onload = function() {

	var url = "http://localhost:8080/Final_Project/rest/stock";
	var url2 = "http://localhost:8080/Final_Project/rest/stock/order";

	$("viewTableButton").onclick = function() {
		location.reload();
	}

	$("addButton").onclick = function() {
		addStockItem();
	}

	$("deleteButton").onclick = function() {
		deleteStockItem();
	}

	$("refreshButton").onclick = function() {
		searchStock(url);
	}

	$("updateButton").onclick = function() {
		updateStockItem();
	}

	$("orderButton").onclick = function() {
		orderScreen(url2);
	}

	$("quickUpdateButton").onclick = function() {
		alert("Product Updated, Hit 'Refresh' to view changes");
	}
}