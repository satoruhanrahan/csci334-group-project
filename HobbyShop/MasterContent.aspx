<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage.Master" AutoEventWireup="true" CodeBehind="MasterContent.aspx.cs" Inherits="HobbyShop.WebForm1" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script type="text/javascript" src="js/jquery.js"></script>
    <script type="text/javascript" src="js/global.js"></script>
    <link rel="stylesheet" href="style/global.css" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MenuBar" runat="server">
    <div id="header">
        <button type="button" class="tab active" id="Models" onclick="loadPage('Models');">Models</button>
        <button type="button" class="tab" id="Orders" onclick="loadPage('Orders');">Orders</button>
        <button type="button" class="tab" id="Suppliers" onclick="loadPage('Suppliers');">Suppliers</button>
        <button type="button" class="tab" id="Contacts" onclick="loadPage('Contacts');">Contacts</button>
        <button type="button" class="tab" id="Customers" onclick="loadPage('Customers');">Customers</button>
        <button type="button" class="tab" id="Stores" onclick="loadPage('Stores');">Stores</button>
        <button type="button" class="tab" id="Users" onclick="loadPage('Users');">Users</button>
        <button type="button" class="tab" id="Settings" onclick="loadPage('Settings');">Settings</button>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <div id="content"></div>
    <div id="results"></div>
</asp:Content>

