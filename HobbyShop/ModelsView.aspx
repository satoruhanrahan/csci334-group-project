<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ModelsView.aspx.cs" Inherits="HobbyShop.ModelsView" %>
﻿<!DOCTYPE>
<html>
    <head runat="server">
        <meta content="text/html;charset=utf-8" http-equiv="Content-Type"/>
	    <meta content="utf-8" http-equiv="encoding"/>
        <title> Models - Tim's Model Market </title>
	    <link rel="stylesheet" href="style/models.css"/>
        <link rel="stylesheet" href="style/list.css" />
        <script type="text/javascript" src="js/models.js"></script>
    </head>
    <body>
        <div id="listContainer">
            <table id="searchHead">
                <tr>
                    <td>
                        <input type="text" id="searchbar" placeholder="Search Models..." />
                    </td>
                    <td class="searchBarBtn">
                        <button type="button" id="searchBtn" class="smallbtn" title="Search"><img src="style/search.png" /></button>
                    </td>
                    <td class="searchBarBtn">
                        <button type="button" id="searchOpt" title="Advanced search" onclick='displayAdvSearch()' ; class="smallbtn"><img src="style/options.png" /></button>
                    </td>
                </tr>
            </table>
            <div class="scrollable" id="list"></div>
            <div id="addButtonContainer">
                <button type="button" id="addButton" class='smallbtn greenbtn' title="Add Model" onclick="displayAddModel();"><img src='style/add.png' /></button>
            </div>
        </div>
		<div id="rightcol">
            <div class="scrollable" style="width:100%;">
                <h3 id="detailHeading"></h3>
                <div id="details"></div>
            </div>
		</div>
        <form id="form1" runat="server">
            <asp:scriptmanager runat="server">
                <Services>
                   <asp:ServiceReference Path="~/CONTROLLER/ModelController.svc" />
                </Services>
            </asp:scriptmanager>
        </form>
    </body>
</html>
