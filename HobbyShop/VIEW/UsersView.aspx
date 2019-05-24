<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="UsersView.aspx.cs" Inherits="HobbyShop.ModelsView" %>
﻿<!DOCTYPE>
<html xmlns="http://www.w3.org/1999/xhtml">
    <head runat="server">
        <meta content="text/html;charset=utf-8" http-equiv="Content-Type"/>
	    <meta content="utf-8" http-equiv="encoding"/>
        <title> Users - Tim's Model Market </title>
	    <link rel="stylesheet" href="style/details.css"/>
        <link rel="stylesheet" href="style/list.css" />
        <script type="text/javascript" src="js/user.js"></script>
    </head>
    <body>
        <div id="listContainer">
            <table id="searchHead">
                <tr>
                    <td>
                        <input type="text" id="searchbar" placeholder="Search Users..." />
                    </td>
                    <td class="searchBarBtn">
                        <button type="button" id="advSearch" class="smallbtn" title="Advanced search"><img src="style/options.png" /></button>
                    </td>
                </tr>
            </table>
            <div class="scrollable" id="list"></div>
            <div id="addButtonContainer">
                <button type="button" id="addButton" class='smallbtn greenbtn' title="Create new accounts"><img src='style/add.png' /></button>
            </div>
        </div>
		<div id="detailContainer">
            <h3 id="detailHeading"></h3>
            <div id="detailOptions" class="dropdown">
                <button type="button" class="smallbtn"> <img src="style/options.png" /></button>
                <div class="dropdown-content">
                    <button type="button" class="dropdown-button" id="editUser">Edit Details</button>
                    <button type="button" class="dropdown-button" id="deleteUser">Delete Accounts</button>
                </div> 
            </div>
            <div id="detailTabBar">
                <button type="button" class="tab detailtab active" id="detailsTab">Details</button>
                <button type="button" class="tab detailtab" id="storesTab">Stores</button>
               
            </div>
            <div id="details" class="detailTabContent">
                <div class="scrollable">
                    <table id="detailTable">
                        <tr> 
                            <td id="firstcell"> Name </td> 
                            <td id="userName"><input type="text" id="userNameInput" disabled/></td> 
                        </tr> 
                        <tr> 
                            <td> ID </td> 
                            <td id="userID"></td> 
                        </tr> 
                        <tr>
                            <td> Password </td> 
                            <td id="userPassword"><input type="text" id="userPasswordInput" disabled/></td> 
                        </tr>
                         <tr>
                            <td> First Name </td> 
                            <td id="userFirstName"><input type="text" id="userFirstNameInput" disabled/></td> 
                        </tr>
                         <tr>
                            <td> Last Name </td> 
                            <td id="userLastName"><input type="text" id="userLastNameInput" disabled/></td> 
                        </tr>
                        <tr>
                            <td> Type </td> 
                            <td id="userType"><input type="text" id="userTypeInput" disabled/></td> 
                        </tr> 
                        <tr> 
                            <td> LastLogin </td> 
                            <td id="lastLogin"></td> 
                        </tr> 
                        
                    </table>
                    <button type="button" id="leftButton" title="Save changes" class="smallbtn greenbtn"> 
                    </button>
                    <button type="button" id="rightButton" title="Discard changes" class="smallbtn redbtn" style="float:right;"> 
                        <img src="style/close.png" />
                    </button>
                </div>
            </div>
            <div class ="detailTabContent">
                <div id="stores" class="scrollable">
                </div>
            </div>
            <div class ="detailTabContent">
                <div id="suppliers" class="scrollable">
                </div>
            </div>
		</div>
        <form id="form1" runat="server">
            <asp:scriptmanager runat="server">
                <Services>
                   <asp:ServiceReference Path="~/CONTROLLER/UserController.svc" />
                </Services>
            </asp:scriptmanager>
        </form>
    </body>
</html>
