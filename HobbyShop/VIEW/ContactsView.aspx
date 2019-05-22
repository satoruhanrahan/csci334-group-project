<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ContactsView.aspx.cs" Inherits="HobbyShop.VIEW.ContactsView" %>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
    <head runat="server">
        <meta content="text/html;charset=utf-8" http-equiv="Content-Type"/>
	    <meta content="utf-8" http-equiv="encoding"/>
        <title> Suppliers - Tim's Model Market </title>
    <script type="text/javascript" src="js/jquery.js"></script>
    <link rel="stylesheet" href="style/global.css" />  
	    <link rel="stylesheet" href="style/details.css"/>
        <link rel="stylesheet" href="style/list.css" />
        <script type="text/javascript" src="js/contacts.js"></script>
    </head>
    <body>
        <div id="listContainer">
            <table id="searchHead">
                <tr>
                    <td>
                        <input type="text" id="searchbar" placeholder="Search contacts..." />
                    </td>
                    <td class="searchBarBtn">
                        <button type="button" id="advSearch" class="smallbtn" title="Advanced search"><img src="style/options.png" /></button>
                    </td>
                </tr>
            </table>
            <div class="scrollable" id="list"></div>
            <div id="addButtonContainer">
                <button type="button" id="addButton" class='smallbtn greenbtn' title="Add Supplier"><img src='style/add.png' /></button>
            </div>
        </div>
		<div id="detailContainer">
            <h3 id="detailHeading"></h3>
            <div id="detailOptions" class="dropdown">
                <button type="button" class="smallbtn"> <img src="style/options.png" /></button>
                <div class="dropdown-content">
                    <button type="button" class="dropdown-button" id="editContact">Edit Details</button>
                    <button type="button" class="dropdown-button" id="deleteContact">Delete Contact</button>
                </div> 
            </div>
            <div id="details" class="detailTabContent">
                <div class="scrollable">
                    <table id="detailTable">
                        <tr> 
                            <td id="firstcell"> Name </td> 
                            <td id="supplierName"><input type="text" id="supplierNameInput" disabled/></td> 
                        </tr> 
                        <tr> 
                            <td> ID </td> 
                            <td id="supplierID"></td> 
                        </tr> 
                        <tr> 
                            <td> Address </td> 
                            <td id="supplierAddress">
                                <input type="text" id="supplierAddressInput" disabled/>
                            </td> 
                        </tr> 
                        <tr> 
                            <td> Credit Line </td> 
                            <td id="supplierCreditLine">
                                <input type="text" id="supplierCreditLineInput" disabled/>
                            </td> 
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
                <div id="items" class="scrollable">
                </div>
            </div>
            <div class ="detailTabContent">
                <div id="contacts" class="scrollable">
                </div>
            </div>
		</div>
        <form id="form1" runat="server">
            <asp:scriptmanager runat="server">
                <Services>
                   <asp:ServiceReference Path="~/CONTROLLER/SupplierController.svc" />
                </Services>
            </asp:scriptmanager>
        </form>
    </body>
</html>

