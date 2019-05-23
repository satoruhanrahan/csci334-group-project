<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="CustomersView.aspx.cs" Inherits="HobbyShop.VIEW.CustomersView" %>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
    <head runat="server">
        <meta content="text/html;charset=utf-8" http-equiv="Content-Type"/>
	    <meta content="utf-8" http-equiv="encoding"/>
        <title> Customers - Tim's Model Market </title>
	    <link rel="stylesheet" href="style/details.css"/>
        <link rel="stylesheet" href="style/list.css" />
        <script type="text/javascript" src="js/customers.js"></script>
    </head>
    <body>
        <div id="listContainer">
            <table id="searchHead">
                <tr>
                    <td>
                        <input type="text" id="searchbar" placeholder="Search customers..." />
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
                    <button type="button" class="dropdown-button" id="editCustomer">Edit Details</button>
                    <button type="button" class="dropdown-button" id="deleteCustomer">Delete Customer</button>
                </div> 
            </div>
            <div id="detailTabBar">
                <button type="button" class="tab detailtab active" id="detailsTab">Details</button>
                <button type="button" class="tab detailtab" id="interestsTab">Interests</button>
                <button type="button" class="tab detailtab" id="ordersTab">Orders</button>
            </div>
            <div id="details" class="detailTabContent">
                <div class="scrollable">
                    <table class="detailTable">
                        <tr> 
                            <td id="firstcell"> Customer Number </td> 
                            <td id="customerID"></td> 
                        </tr> 
                        <tr> 
                            <td> Name </td> 
                            <td id="customerName"><input type="text" id="customerNameInput" disabled/></td> 
                        </tr> 
                        <tr> 
                            <td> Address </td> 
                            <td id="customerAddress">
                                <input type="text" id="customerAddressInput" disabled/>
                            </td> 
                        </tr> 
                        <tr> 
                            <td> Phone Number </td> 
                            <td id="customerPhoneNo">
                                <input type="text" id="customerPhoneNoInput" disabled/>
                            </td> 
                        </tr>
                        <tr> 
                            <td> Credit Line </td> 
                            <td id="customerCreditLine">
                                <input type="number" id="customerCreditLineInput" disabled/>
                            </td> 
                        </tr>
                        <tr> 
                            <td> Current Balance </td> 
                            <td id="customerBal">
                                <input type="number" id="customerBalInput" disabled/>
                            </td> 
                        </tr>
                        <tr> 
                            <td> Membership Status </td> 
                            <td id="customerMemberStatus">
                                <select id="customerMemberStatusInput" disabled>
                                    <option value="member">Member</option>
                                    <option value="nonmember">Non-Member</option>
                                </select>
                            </td> 
                        </tr>
                        <tr> 
                            <td> Membership Join Date </td> 
                            <td id="customerJoinDate">
                                <input type="date" id="customerJoinDateInput" disabled/>
                            </td> 
                        </tr>
                        <tr> 
                            <td> Email </td> 
                            <td id="customerEmail">
                                <input type="text" id="customerEmailInput" disabled/>
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
                <div id="interests" class="scrollable">
                    <table class="detailTable">
                        <tr> 
                            <td> Model Type </td> 
                            <td id="itemType">
                                <input type="text" id="itemTypeInput" list="types" disabled/>
                                <datalist id="types">
                                </datalist>
                            </td> 
                        </tr> 
                        <tr> 
                            <td> Subject Area </td> 
                            <td id="itemSbjArea">
                                <input type="text" id="itemSbjAreaInput" list="subjects" disabled/>
                                <datalist id="subjects"></datalist>
                            </td> 
                        </tr>
                    </table>
                </div>
            </div>
            <div class ="detailTabContent">
                <div id="orders" class="scrollable">
                </div>
            </div>
		</div>
        <form id="form1" runat="server">
            <asp:scriptmanager runat="server">
                <Services>
                   <asp:ServiceReference Path="~/CONTROLLER/CustomerController.svc" />
                </Services>
            </asp:scriptmanager>
        </form>
    </body>
</html>