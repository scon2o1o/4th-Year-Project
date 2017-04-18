<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Stock Management System</title>
<script src="script.js" type="text/javascript"></script>

<style>
html {
	font-family: delicious;
}

body {
	background-color: #ccc;
}

input {
	border-radius: 15px;
	padding: 15px;
	margin: 2px;
	width: 230px;
}

.buttonClass {
	border-radius: 15px;
	padding: 15px;
	margin: 2px;
	width: 230px;
}

#header {
	text-align: center;
	height: auto;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0
		rgba(0, 0, 0, 0.19);
	border-radius: 25px;
	padding: 10px;
	margin-bottom: 30px;
	margin-left: 50px;
	margin-right: 50px;
	margin-top: 20px;
}

#stockArea {
	border-radius: 25px;
	height: 1210px;
	float: left;
	width: 55%;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0
		rgba(0, 0, 0, 0.19);
	background-color: #fff;
	margin-left: 50px;
	padding: 20px;
	margin-bottom: 50px;
}

#totalsArea {
	border-radius: 25px;
	height: auto;
	float: right;
	width: 25%;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0
		rgba(0, 0, 0, 0.19);
	background-color: #fff;
	margin-right: 50px;
	padding: 10px 10px 10px 50px;
	margin-bottom: 50px;
}

#menu {
	background-color: #ccc;
	height: auto;
	margin: 30px 50px 30px 50px;
	padding: 10px;
	text-align: center;
}

#stockTable {
	margin: 40px 10px 30px 10px;
	height: 1070px;
	width: auto;
	padding: 5px;
	overflow-y: auto;
}

#topHeading {
	width: auto;
	height: 80px;
}

th, td {
	border-bottom: 1px solid #ddd;
	padding: 15px;
	text-align: left;
}

th {
	background-color: gray;
	color: white;
}

.tab1 {
	padding-left: 4em;
}

.tab2 {
	padding-left: 8em;
}

.tab3 {
	padding-left: 12em;
}

.rounded {
	border-radius: 15px;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0
		rgba(0, 0, 0, 0.19);
}

.floatLeft {
	float: left;
}

.floatRight {
	float: right;
}

.buttonFloatRight {
	float: right;
	border-radius: 15px;
	padding: 15px;
	margin: 2px;
	width: 230px;
}
</style>

</head>
<body>
	<div id="header">
		<h1>Stock Management System</h1>
		Logged in as: ${sessionScope.user.getFirstName()}
		${sessionScope.user.getSurname()}<br> <a href="LogoutServlet">
			Logout</a><br>
		<br>
	</div>
	<div id="body">
		<div id="menu" class="rounded">
			<input type="button" id="viewTableButton" value="View All Stock">
			<input type="button" id="addButton" value="Add Stock Item"> 
			<input type="button" id="deleteButton" value="Delete Stock Item"> 
			<input type="button" id="updateButton" value="Update Stock Item"> 
			<input type="button" id="orderButton" value="View Order Screen">
		</div>
		<div id="stockArea">
			<div id="topHeading">
				<h2 id="divHeading" class="floatLeft">Stock List</h2>
				<input id="refreshButton" type="button" value="Refresh"
					class="floatRight"><br>
				<br>
				<br>
				<p>Hit 'Refresh' to view stock table and total stock costs</p>
			</div>
			<div id="stockTable" class="rounded"></div>
		</div>
		<div id="totalsArea">
			<h3>Quick Stock Update</h3>
			<p>Enter the barcode, the quantity added or removed (+/-) and hit
				submit</p>
			<form action="http://localhost:8080/Final_Project/rest/stock/quickupdate/" method="post">
				<input type="text" name="barcode" placeholder="Enter Barcode ...">
				<input type="hidden" name="option" value="quantity"> 
				<input type="text" name="newValue" placeholder="Enter Quantity (+/-) ...">
				<input type="submit" id="quickUpdateButton" value="Submit">
			</form>
			<br>
			<h2 id="totalCost">Total Stock Cost: &euro;0.00</h2>
			<h3>Stock cost by department:</h3>
			<table style="width: 100%">
				<tr>
					<td>Fruit and Veg</td>
					<td id="f&v">&euro;0.00</td>
				</tr>
				<tr>
					<td>Bakery</td>
					<td id="bakery">&euro;0.00</td>
				</tr>
				<tr>
					<td>Provisions</td>
					<td id="provisions">&euro;0.00</td>
				</tr>
				<tr>
					<td>Meat</td>
					<td id="meat">&euro;0.00</td>
				</tr>
				<tr>
					<td>Deli</td>
					<td id="deli">&euro;0.00</td>
				</tr>
				<tr>
					<td>Speciality</td>
					<td id="special">&euro;0.00</td>
				</tr>
				<tr>
					<td>Tea and Coffee</td>
					<td id="teaandcoffee">&euro;0.00</td>
				</tr>
				<tr>
					<td>Health Food</td>
					<td id="healthfood">&euro;0.00</td>
				</tr>
				<tr>
					<td>Juices</td>
					<td id="juices">&euro;0.00</td>
				</tr>
				<tr>
					<td>Biscuits</td>
					<td id="biscuits">&euro;0.00</td>
				</tr>
				<tr>
					<td>Cereals</td>
					<td id="cereals">&euro;0.00</td>
				</tr>
				<tr>
					<td>Paperware</td>
					<td id="paperware">&euro;0.00</td>
				</tr>
				<tr>
					<td>Home Baking</td>
					<td id="homeBaking">&euro;0.00</td>
				</tr>
				<tr>
					<td>Non-Food</td>
					<td id="nonfood">&euro;0.00</td>
				</tr>
				<tr>
					<td>Minerals</td>
					<td id="minerals">&euro;0.00</td>
				</tr>
				<tr>
					<td>Alcohol</td>
					<td id="alcohol">&euro;0.00</td>
				</tr>
			</table>
			<br>
		</div>
	</div>
</body>
</html>