<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Run.aspx.cs" Inherits="HobbyShop.WebForm1" %>
﻿<!DOCTYPE html>
<html>
    <head>
		
    </head>
<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta content="text/html;charset=utf-8" http-equiv="Content-Type">
	<meta content="utf-8" http-equiv="encoding">
    <title> Inventory - Tim's Model Market </title>
	<link rel="stylesheet" href="style/styles.css">
    <script type="text/javascript" src="jquery.js"></script>
    <script type="text/javascript" src="JavaScript.js"></script>
</head>
<body>
		<div id="header">
			<img id="logo" src="style/logo.png"/>
			Tim's Model Market
	        <input type="button" class="tab" id="invBut" value="Inventory" onclick="window.open('Inventory.aspx', '_self');"/>
		</div>
		<table id="mainContent">
            <tr style="height:30px;">
                <td> <span class="heading1"> Inventory </span> </td>
            </tr>
            <tr style="background-color:white; height:30px;">
                <td> 
                    <span class="heading2"> Items </span> 
           
                    <div class="dropdown" style="margin: -3px 0px -3px 0px">
                      <button class="dropbtn">...</button>
                      <div class="dropdown-content">
                        <input type='button' class='inputButton' value='Add New Item' onclick='displayAddItem();' />
                      </div>
                    </div> 
                </td>
                <td> <span class="heading2" id="detailHeading">  </span> </td>
            </tr>
            <tr valign="top" id="leftcol" style="background-color:white;">
				<td>
                    <div class="scrollable" id="list">
                    </div>
				</td>
				<td id="details"></td>
			</tr>
		</table>
		<footer>
			&copy; Team Group 1
		</footer>

    <div id="results"></div>
    <form id="form1" runat="server">
        <asp:scriptmanager runat="server">
            <Services>
               <asp:ServiceReference Path="~/Service1.svc" />
            </Services>
        </asp:scriptmanager>
    </form>
</body>
</html>
