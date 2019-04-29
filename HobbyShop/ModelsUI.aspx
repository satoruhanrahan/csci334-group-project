<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ModelsUI.aspx.cs" Inherits="HobbyShop.ModelsUI" %>
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
	        <input type="button" class="activeTab" id="Models" value="Models" onclick="loadPage('Models');"/>
	        <input type="button" class="tab" id="Orders" value="Orders" onclick="loadPage('Orders');"/>
	        <input type="button" class="tab" id="Suppliers" value="Suppliers" onclick="loadPage('Suppliers');"/>
	        <input type="button" class="tab" id="Contacts" value="Contacts" onclick="loadPage('Contacts');"/>
	        <input type="button" class="tab" id="Customers" value="Customers" onclick="loadPage('Customers');"/>
	        <input type="button" class="tab" id="Stores" value="Stores" onclick="loadPage('Stores');"/>
	        <input type="button" class="tab" id="Users" value="Users" onclick="loadPage('Users');"/>
	        <input type="button" class="tab" id="Settings" value="Settings" onclick="loadPage('Settings');"/>
		</div>
		<table id="mainContent">
            <tr>
                <td id="leftcol"> 
                    <div id="listhead">
                        <table id="searchHead">
                            <tr>
                                <td>
                                    <input type="text" id="searchbar" placeholder="Search Models..."/> 
                                </td>
                                <td class="searchBarBtn">
                                    <button id="searchBtn" class="smallbtn" title="Search"><img src="style/search.png"/></button>
                                </td>
                                <td class="searchBarBtn">
                                    <button id="searchOpt" title="Advanced search" onclick='displayAdvSearch()'; class="smallbtn"><img src="style/options.png"/></button>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div class="scrollable" id="list"></div>
                    <div>
                        <button class='smallbtn greenbtn' style="width:100%;" title='Add model' onclick='displayAddItem();'><img src='style/add.png' /></button>
                    </div>
                </td>
				<td id="rightcol">
                    <div class="scrollable" style="width:100%;">
                        <h3 id="detailHeading"></h3>
                        <div id="details"></div>
                    </div>
				</td>
            </tr>
		</table>
        <div id="results"></div>
        <form id="form1" runat="server">
            <asp:scriptmanager runat="server">
                <Services>
                   <asp:ServiceReference Path="~/CONTROLLER/ModelController.svc" />
                </Services>
            </asp:scriptmanager>
        </form>
    </body>
</html>
