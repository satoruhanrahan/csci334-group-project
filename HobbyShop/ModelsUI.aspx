<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ModelsUI.aspx.cs" Inherits="HobbyShop.InventoryInterface" %>
﻿<!DOCTYPE>


<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta content="text/html;charset=utf-8" http-equiv="Content-Type"/>
	<meta content="utf-8" http-equiv="encoding"/>
    <title> Inventory - Tim's Model Market </title>

	<link rel="stylesheet" href="style/styles.css"/>
    <script type="text/javascript" src="js/jquery.js"></script>
    <script type="text/javascript" src="js/JavaScript.js"></script>
</head>
<body>
		<div id="header">
			<img id="logo" src="style/logo.png"/>
		    Tim's Model Market
	        <input type="button" class="tab" id="models" value="Models" onclick="window.open('ModelsUI.aspx', '_self');"/>
	        <input type="button" class="tab" id="orders" value="Orders" onclick="window.open('OrdersUI.aspx', '_self');"/>
	        <input type="button" class="tab" id="suppliers" value="Suppliers" onclick="window.open('SuppliersUI.aspx', '_self');"/>
	        <input type="button" class="tab" id="contacts" value="Contacts" onclick="window.open('ContactsUI.aspx', '_self');"/>
	        <input type="button" class="tab" id="customers" value="Customers" onclick="window.open('CustomersUI.aspx', '_self');"/>
	        <input type="button" class="tab" id="stores" value="Stores" onclick="window.open('StoresUI.aspx', '_self');"/>
	        <input type="button" class="tab" id="users" value="Users" onclick="window.open('UsersUI.aspx', '_self');"/>
	        <input type="button" class="tab" id="settings" value="Settings" onclick="window.open('SettingsUI.aspx', '_self');"/>
		</div>
		<table id="mainContent">
            <tr style="height:30px;">
                <td> 
                    <span class="heading1"> Models </span>
                </td>
            </tr>
            <tr style="background-color:white;">
                <td > 
                    <table id="searchHead">
                        <tr>
                            <td>
                                <input type="text" id="searchbar"/> 
                            </td>
                            <td style="width:20px;">
                                <button id="searchBtn"><img src="style/search.png" width="20" height="20"/></button>
                            </td>
                            <td style="width:20px;">
                                <div class="dropdown">
                                    <button class="dropbtn" style="width:30px;padding:5px 0 5px 0;"><img src="style/sort.png" width="20" height="20"/></button>
                                    <div class="dropdown-content">
                                        <input type='button' class='inputButton' value='Sort by x' onclick='sort(x);' />
                                        <input type='button' class='inputButton' value='Sort by y' onclick='sort(y);' />
                                    </div>
                                </div> 
                            </td>
                            <td style="width:20px;">
                                <div class="dropdown" style="margin: -3px 0px -3px 0px">
                                    <button class="dropbtn" style="padding: 0px 7px 11px 7px;">...</button>
                                    <div class="dropdown-content">
                                        <input type='button' class='inputButton' value='Advanced Search' onclick='displayAdvSearch();' />
                                        <input type='button' class='inputButton' value='Add New Item' onclick='displayAddItem();' />
                                    </div>
                                </div> 
                            </td>
                        </tr>
                    </table>
                </td>
                <td> <span class="heading2" id="detailHeading">  </span> </td>
            </tr>
            <tr valign="top" id="leftcol" style="background-color:white;">
				<td>
                    <div class="scrollable" id="list"></div>
				</td>
				<td id="details">
				</td>
			</tr>
		</table>
        <div id="results"></div>
		<footer>
			&copy; Team Group 1
		</footer>
        <form id="form1" runat="server">
            <asp:scriptmanager runat="server">
                <Services>
                   <asp:ServiceReference Path="~/CONTROLLER/ModelController.svc" />
                </Services>
            </asp:scriptmanager>
        </form>
    </body>
</html>
