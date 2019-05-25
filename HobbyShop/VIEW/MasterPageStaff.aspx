<%@ Page Language="C#" MasterPageFile="~/VIEW/MasterPage.Master" AutoEventWireup="true" CodeBehind="MasterPageStaff.aspx.cs" Inherits="HobbyShop.MasterPageStaff" %>


<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script type="text/javascript" src="js/jquery.js"></script>
    <script type="text/javascript" src="js/global.js"></script>
    <link rel="stylesheet" href="style/global.css" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MenuBar" runat="server">
    <div id="header">
        <button type="button" class="tab active" id="Models">Models</button>
        <button type="button" class="tab" id="Sales">Sales</button>
        <button type="button" class="tab" id="Deliveries">Deliveries</button>
        <button type="button" class="tab" id="Suppliers">Suppliers</button>
        <button type="button" class="tab" id="Contacts">Contacts</button>
        <button type="button" class="tab" id="Customers">Customers</button>
        <button type="button" class="tab" id="Stores">Stores</button>
        <button type="button" class="tab" id="Settings">Settings</button>
        <button type="button" class="tab" id="LogOut">Log Out</button>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <div id="content"></div>
    <div id="results"></div>
</asp:Content>