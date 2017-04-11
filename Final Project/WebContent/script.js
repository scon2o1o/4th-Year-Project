var $ = function(id){
	return document.getElementById(id);
}

var getHTTPObject = function(){
	var xhr = false;
	if (window.XMLHttpRequest){	//test for exsistance
		xhr = new XMLHttpRequest();
	} else if (window.ActiveXObject){ //test for ActiveX
		try{
			xhr = new ActiveXObject("Msxml12.XMLHTTP");
		} catch (e){
			try{
				xhr = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e){
				xhr = false;
			}
		}
	}
	return xhr;
}

var searchStock = function(url){
	var request = getHTTPObject();
	if (request){
		request.onreadystatechange = function(){
			parseResponse(request);
		}
		request.open("GET", url, true);
		request.setRequestHeader("Accept", "application/json");
		request.send(null);
	}
}

function deleteFunction(barCode){
	var deleteUrl = "http://localhost:8080/Final_Project/rest/stock/delete/"+barCode;
	console.log(deleteUrl);
	var request = getHTTPObject();
	if (request) {
		request.onreadystatechange = function() {
			
		};
		request.open("DELETE", deleteUrl, true);
		request.setRequestHeader("Accept", "text/html");
		request.send();
		alert(barCode + " deleted from database");
	}
}

var addStockItem = function(){
	var myNode = document.getElementById("stockArea");
	myNode.innerHTML = '';
	
	heading = document.createElement("H2");
	heading.textContent = "Add New Item";
	myNode.appendChild(heading);
	
	var f = document.createElement("form");
	f.setAttribute('method',"post");
	f.setAttribute('action',"http://localhost:8080/Final_Project/rest/stock/create/");
	
	var i1 = document.createElement("input"); //input element, text
	i1.setAttribute('type',"text");
	i1.setAttribute('name',"barcode");
	i1.placeholder = "Barcode ... ";
	
	var br = document.createElement("br");

	var i2 = document.createElement("input"); //input element, text
	i2.setAttribute('type',"text");
	i2.setAttribute('name',"quantity");
	i2.placeholder = "Quantity ... ";
	
	var br2 = document.createElement("br");
	
	var i3 = document.createElement("input"); //input element, text
	i3.setAttribute('type',"text");
	i3.setAttribute('name',"name");
	i3.placeholder = "Product Name ... ";
	
	var br3 = document.createElement("br");
	
	var i4 = document.createElement("input"); //input element, text
	i4.setAttribute('type',"text");
	i4.setAttribute('name',"price");
	i4.placeholder = "Product Price ... ";
	
	var br4 = document.createElement("br");
	
	var i5 = document.createElement("input"); //input element, text
	i5.setAttribute('type',"text");
	i5.setAttribute('name',"description");
	i5.placeholder = "Description ... ";
	
	var br5 = document.createElement("br");
	
	var i6 = document.createElement("input"); //input element, text
	i6.setAttribute('type',"text");
	i6.setAttribute('name',"department");
	i6.placeholder = "Department ... ";
	
	var br6 = document.createElement("br");
	
	var i7 = document.createElement("input"); //input element, text
	i7.setAttribute('type',"text");
	i7.setAttribute('name',"min_level");
	i7.placeholder = "Minimum Level ... ";
	
	var br7 = document.createElement("br");

	var s = document.createElement("input"); //input element, Submit button
	s.setAttribute('type',"submit");
	s.setAttribute('value',"Submit");
	
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
	
	s.onclick = function(){
		alert("Item added to database");
	}

}

var deleteStockItem = function(){
	var myNode = document.getElementById("stockArea");
	myNode.innerHTML = '';
	
	heading = document.createElement("H2");
	heading.textContent = "Delete Stock Item";
	myNode.appendChild(heading);
	
	var input = document.createElement("input"); //input element, text
	input.setAttribute('type',"text");
	input.setAttribute('name',"barcode");
	input.setAttribute('id',"barcodeText");
	input.placeholder = "Enter Barcode to Delete ... ";
	
	var submit = document.createElement("button"); //input element, Submit button
	submit.setAttribute('id',"barcodeToDeleteButton");
	submit.setAttribute('class',"buttonClass");
	var t = document.createTextNode("Delete");       // Create a text node
	submit.appendChild(t);
	
	var br = document.createElement("br");
	
	myNode.appendChild(input);
	myNode.appendChild(br);
	myNode.appendChild(submit);
	
	
	barcodeToDeleteButton.onclick = function(){
		var barcodeToDelete = $("barcodeText").value;
		console.log(barcodeToDelete);
		deleteFunction(barcodeToDelete);
		deleteStockItem();
	}
}
	

var parseResponse = function(request){
	if (request.readyState == 4)
		if (request.status == 200 || request.status == 304){
			var data = JSON.parse(request.responseText);
			var arraySize = Object.keys( data.stock ).length;

			var myNode = document.getElementById("stockTable");
			myNode.innerHTML = '';
			
			var table = document.getElementById("stockTable");
			var startTable = document.createElement("TABLE");
			startTable.setAttribute('id', "myStockTable");
			startTable.setAttribute('style',"overflow-x:auto");
			
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
			
			var tr = [];
			var td = [];

				 for(j=0; j<arraySize; j++){
					 
					 var y = document.createElement("TR");
					 y.setAttribute("id", "myTr"+[j]);
					 document.getElementById("myStockTable").appendChild(y);
					 
					td[j] = document.createElement("td");
					td[j].textContent = data.stock[j].barcode;
					td[j].appendChild(text);
					document.getElementById("myTr"+[j]).appendChild(td[j]);
					
					td[j] = document.createElement("td");
					td[j].textContent = data.stock[j].quantity;
					td[j].appendChild(text);
					document.getElementById("myTr"+[j]).appendChild(td[j]);
					
					td[j] = document.createElement("td");
					td[j].textContent = data.stock[j].name;
					td[j].appendChild(text);
					document.getElementById("myTr"+[j]).appendChild(td[j]);
					
					td[j] = document.createElement("td");
					td[j].textContent = data.stock[j].price;
					td[j].appendChild(text);
					document.getElementById("myTr"+[j]).appendChild(td[j]);
					
					td[j] = document.createElement("td");
					td[j].textContent = data.stock[j].description;
					td[j].appendChild(text);
					document.getElementById("myTr"+[j]).appendChild(td[j]);
					
					td[j] = document.createElement("td");
					td[j].textContent = data.stock[j].department;
					td[j].appendChild(text);
					document.getElementById("myTr"+[j]).appendChild(td[j]);
					
					td[j] = document.createElement("td");
					td[j].textContent = data.stock[j].min_level;
					td[j].appendChild(text);
					document.getElementById("myTr"+[j]).appendChild(td[j]);
		}
	}
}
 
window.onload = function(){
	
	var url = "http://localhost:8080/Final_Project/rest/stock";

	$("viewTableButton").onclick = function(){
		location.reload();
	}
	
	$("addButton").onclick = function(){
		addStockItem();
	}
	
	$("deleteButton").onclick = function(){
		deleteStockItem();
	}
	
	$("refreshButton").onclick = function(){
		searchStock(url);
	}
}