<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<head>

<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">

<title>Stock Management System</title>

<style>
html {
	font-family: delicious;
}

body {
	background-color: #ccc;
}

input
{
 	border-radius: 15px;
    padding:15px;
    margin:2px;
}
#header{
	text-align: center;
	height:auto;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
	border-radius: 25px;
	padding: 10px;
	margin-bottom: 50px;
	margin-left:50px;
	margin-right:50px;
	margin-top:20px;
}

#loginArea {
	border-radius: 25px;
	text-align: center;
	height: auto;
	float: left;
	width: 45%;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
	background-color: #fff;
	margin-left:50px;
	padding-bottom:10px;
}

#registerArea {
	border-radius: 25px;
	text-align: center;
	height: auto;
	float: right;
	width: 45%;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
	background-color: #fff;
	margin-right:50px;
	padding-bottom:10px;
}
#footer{
	position : absolute;
    bottom : 0;
    height : 50px;
    margin-top : 100px;
}
#footerLeft{
	float:left;
}
#footerRight{
	margin-left:920px;
	float:right;
}
</style>

<script>

	function registerFunction(){
		alert("Registration successful! Please login to continue");
	}

</script>

</head>
<body>
	<div id="header">
	<h1>Stock Management System</h1>
	<h2>Please Login or Register to continue</h2>
	</div>

	<div id="loginArea">
		<form method="post" action="LoginServlet">

			<h3>Login</h3><br><br><br>

			<input type="text" required placeholder="Username..." name="username" size="30"><br>

			<input type="password" required placeholder="Password..." name="password" size="30" 
			pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" 
			title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"><br>

			<br><br><br><br><input type="submit" value="Login">
		</form>
	</div>
	
	<div id="registerArea">

		<h3>Register</h3>

		<form method="post" action="RegisterServlet" onsubmit="registerFunction()">

			<input type="text" required placeholder="First Name..." name="firstName" size="30"><br>

			<input type="text" required placeholder="Surname..." name="surname" size="30"><br>

			<input type="text" required placeholder="Username..." name="username" size="30"><br>

			<input type="password" required placeholder="Password..." name="password" size="30" 
			pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" 
			title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"><br>

			<br><input type="submit" value="Register">

		</form>

	</div>
	
	<div id="footer">
		<div id="footerLeft">
			<p> &copy | Shane Concannon A00237789 | 2017
		</div>
		
		<div id="footerRight">
			<a href=https://www.facebook.com/ target="_blank"><img src="images/facebook.png" target="_blank"></a>
			<a href=https://ie.linkedin.com/ target="_blank"><img src="images/linkedin.png" target="_blank"></a>
			<a href=https://twitter.com/?lang=en target="_blank"><img src="images/twitter.png" target="_blank"></a>
			<a href=https://www.youtube.com/ target="_blank"><img src="images/youtube.png"></a>
		</div>
	</div>
</body>
</html>