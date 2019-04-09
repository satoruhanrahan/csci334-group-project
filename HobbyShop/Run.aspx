<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Run.aspx.cs" Inherits="HobbyShop.WebForm1" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Store Inventory</title>
    <script type="text/javascript" src="JavaScript.js"></script>
</head>
<body>
        <div>
             DISPLAY NAME OF ALL ITEMS ON SALE <br />
            <input type="button" class="inputButton" value="Display Store Inventory" onclick="getInventoryName();" />
        </div>
           
         <div id="test"></div>
    <br /><br />
           ADD NEW MODEL <br />
           Name:  <input type="text"  id="modelName"/> <br />
           Type:  <input type="text"   id="modelType" /> <br />
           Subject area:  <input type="text"   id="modelArea" /> <br />
           Current retail price:  <input type="text"  id="modelPrice"/> <br />
           Description:  <input type="text" id="modelDes"/> <br />
           Availability:  <input type="text"  id="modelAvail"/> <br />
           <input type="button" value="Add New Item to Model" onclick="addNewItemModel();" />

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
