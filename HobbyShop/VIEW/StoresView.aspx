<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="StoresView.aspx.cs" Inherits="HobbyShop.VIEW.StoresView" %>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
    <head runat="server">
        <meta content="text/html;charset=utf-8" http-equiv="Content-Type"/>
	    <meta content="utf-8" http-equiv="encoding"/>
        <title> Stores - Tim's Model Market </title>
	    <link rel="stylesheet" href="style/details.css"/>
        <link rel="stylesheet" href="style/list.css" />
        <link rel="stylesheet" href="style/stores.css" />
        <script type="text/javascript" src="js/stores.js"></script>
    </head>
    <body>
        <div id="listContainer">
            <table id="searchHead">
                <tr>
                    <td>
                        <input type="text" id="searchbar" placeholder="Search stores..." />
                    </td>
                    <td class="searchBarBtn">
                        <button type="button" id="advSearch" class="smallbtn" title="Advanced search"><img src="style/options.png" /></button>
                    </td>
                </tr>
            </table>
            <div class="scrollable" id="list"></div>
            <div id="addButtonContainer">
                <button type="button" id="addButton" class='smallbtn greenbtn' title="Add Customer"><img src='style/add.png' /></button>
            </div>
        </div>
		<div id="detailContainer">
            <h3 id="detailHeading"></h3>
            <div id="detailOptions" class="dropdown">
                <button type="button" class="smallbtn"> <img src="style/options.png" /></button>
                <div class="dropdown-content">
                    <button type="button" class="dropdown-button" id="editStore">Edit Details</button>
                    <button type="button" class="dropdown-button" id="deleteStore">Delete</button>
                </div> 
            </div>
            <div id="detailTabBar">
                <button type="button" class="tab detailtab active" id="detailsTab">Details</button>
                <button type="button" class="tab detailtab" id="inventoryTab">Inventory</button>
            </div>
            <div id="details" class="detailTabContent">
                <div class="scrollable">
                    <table class="detailTable">
                        <tr> 
                            <td id="firstcell"> Store ID </td> 
                            <td id="storeID"></td> 
                        </tr> 
                        <tr> 
                            <td> Address </td> 
                            <td id="storeAddress">
                                <input type="text" id="storeAddressInput" disabled/>
                            </td> 
                        </tr> 
                    </table>
                </div>
            </div>
            <div class ="detailTabContent">
                <div id="inventory" class="scrollable" style="width:100%">
                    <table class="detailTable">
                        <tr> 
                            <td class="firstcell"> Item Name </td> 
                            <td id="itemID">
                                <input type="text" id="itemIDInput" disabled/>
                            </td> 
                        </tr> 
                        <tr> 
                            <td> Stock Count </td> 
                            <td id="itemStockCount">
                                <input type="number" id="itemStockCountInput" disabled/>
                            </td> 
                        </tr> 
                        <tr> 
                            <td> Location in Shop </td> 
                            <td id="itemLocation">
                                <input type="text" id="itemLocationInput" disabled/>
                            </td> 
                        </tr> 
                        <tr> 
                            <td> Date added </td> 
                            <td id="itemDateAdded">
                                <input type="date" id="itemDateAddedInput" disabled/>
                            </td> 
                        </tr> 
                    </table>
                    <button type="button" id="leftButton" title="Save changes" class="smallbtn greenbtn"> 
                    </button>
                    <button type="button" id="rightButton" title="Discard changes" class="smallbtn redbtn" style="float:right;"> 
                        <img src="style/close.png" />
                    </button>
                    <div id="inventoryList" class="scrollable">
                    </div>
                    <div>
                        <button type="button" id="addInventory" class='smallbtn greenbtn' title="Add Inventory Item"><img src='style/add.png' /></button>
                    </div>
                </div>
            </div>
		</div>
        <form id="form1" runat="server">
            <asp:scriptmanager runat="server">
                <Services>
                   <asp:ServiceReference Path="~/CONTROLLER/StoreController.svc" />
                </Services>
            </asp:scriptmanager>
        </form>
    </body>
</html>