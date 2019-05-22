<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="SalesView.aspx.cs" Inherits="HobbyShop.SalesView" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
        <meta content="text/html;charset=utf-8" http-equiv="Content-Type"/>
	    <meta content="utf-8" http-equiv="encoding"/>
        <title> Sales - Tim's Sale Records</title>
	    <link rel="stylesheet" href="style/details.css"/>
        <link rel="stylesheet" href="style/sales.css"/>
        <link rel="stylesheet" href="style/list.css" />
        <script type="text/javascript" src="js/sales.js"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
</head>
<body>
    <div id="listContainer">
        <table id="searchHead">
            <tr>
                <td>
                    <input type="text" id="searchbar" placeholder="Search Sales..." />
                </td>
                <td class="searchBarBtn">
                    <button type="button" id="advSearch" class="smallbtn" title="Advanced search">
                            <img src="style/options.png" /></button>
                </td>
            </tr>
        </table>
        <div class="scrollable" id="list"></div>
        <div id="addButtonContainer">
            <button type="button" id="addButton" class='smallbtn greenbtn' title="Add Sale" onclick="displayAddSaleRecord();"><img src='style/add.png' /></button>
        </div>
    </div>
	<div id="detailContainer">
        <div class="scrollable" style="width:100%;">
            <h3 id="detailHeading"></h3>
            <div id="detailOptions" class="dropdown">
                <button type="button" class="smallbtn"> <img src="style/options.png" /></button>
                 <div class="dropdown-content">
                     <button type="button" class="dropdown-button" id="editSale">Edit Details</button>
                     <button type="button" class="dropdown-button" id="deleteSale" onclick="displayConfirmDelete();">Delete Sale</button>
                 </div> 
             </div>
            <div id="details">
                <table id="detailTable">
                    <tr> 
                        <td id="firstcell"> Sale date: </td> 
                         <td id="saleDate"><input type="date" id="date" class="userInput" disabled/></td> 
                    </tr> 
                    <tr> 
                        <td> Sale ID </td> 
                        <td id="saleID"><input type="text" id="sale" class="userInput" disabled/></td> 
                    </tr>
                    <tr> 
                        <td> Store ID </td> 
                        <td id="storeID"><input type="text" id="store" class="userInput" disabled/></td> 
                    </tr>
                    <tr id="customerIDRow"> 
                        <td> Customer ID </td> 
                        <td id="customerID"><input type="text" id="customer" class="userInput" disabled/></td> 
                    </tr> 

                    <tr> 
                        <td> Items </td> 
                        <td>
                            <table id="itemTable">
                                <tr>
                                    <td>Name</td>
                                    <td>Quantity</td>
                                    <td>Unit Price</td>
                                    <td>Total Price</td>
                                </tr>
                                <tr>
                                    <td><input class="itemInput nameInput" list="itemName"/><datalist id="itemName"></datalist></td>
                                    <td><input class="itemInput quantityInput" /></td>
                                    <td><input class="itemInput priceInput" disabled/></td>
                                    <td><input class="itemInput totalInput" /></td>
                                </tr>
                            </table>
                        </td> 
                    </tr> 

                    <tr> 
                        <td> Total: </td> 
                        <td id="total"><input type="text" id="totalValue" class="userInput" disabled /></td>
                    </tr> 
                    <tr> 
                        <td> Discount: </td> 
                        <td id="discount"><input type="text" id="discountValue" class="userInput" disabled /></td> 
                    </tr>
                    <tr> 
                        <td> Final Total: </td> 
                        <td id="final"><input type="text" id="finalValue" class="userInput" disabled /></td> 
                    </tr> 
                </table>
                <button type="button" id="leftButton" title="Save changes" class="smallbtn greenbtn" onclick="saveSaleDetails()">
                    <img id="leftImage" src="style/save.png" />
                </button>

                <button type="button" id="addRecordButton" title="Add record" class="smallbtn greenbtn" onclick="addSaleRecord()">
                    <img id="image" src="style/add.png" />
                </button><%----%>

                <button type="button" id="rightButton" title="Discard changes" class="smallbtn redbtn" style="float:right;"> 
                    <img src="style/close.png" />
                </button> <br/><br/>
                <span id="error" style="color: red; font-style: italic;"></span>
            </div>
        </div>
	</div>
    <form id="form1" runat="server">
            <asp:scriptmanager runat="server">
                <Services>
                    <asp:ServiceReference Path="~/CONTROLLER/SaleController.svc" />
                    <asp:ServiceReference Path="~/CONTROLLER/ModelController.svc" />
                </Services>
            </asp:scriptmanager>
        </form>
</body>
</html>
