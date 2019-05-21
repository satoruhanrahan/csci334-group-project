<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="LogInPage.aspx.cs" Inherits="HobbyShop.LogInPage" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <script type="text/javascript" src="js/user.js"></script>
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
        <div>
            
            Username&nbsp;&nbsp;&nbsp; <input type="text" id="eBox" />
            <br />
            Password&nbsp;&nbsp;&nbsp; <input type="text"  id="pBox" />
            <br />
            
            <br />
            <input type="button" id="loginButton" onclick="loginToAccount();" style="height: 26px; width: 102px;" />
            <br /> <br /> 

            <div id="noti"></div>
       
        </div>
        <asp:scriptmanager runat="server">
                <Services>
                   <asp:ServiceReference Path="~/CONTROLLER/UserController.svc" />
                </Services>
            </asp:scriptmanager>
    </form>
</body>
</html>