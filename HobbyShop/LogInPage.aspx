<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="LogInPage.aspx.cs" Inherits="HobbyShop.LogInPage" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
        <div>
            
            Username&nbsp;&nbsp;&nbsp; <asp:TextBox ID="eBox" runat="server"></asp:TextBox>
            <br />
            Password&nbsp;&nbsp;&nbsp; <asp:TextBox ID="pBox" runat="server"></asp:TextBox>
            <br />
            
            <br />
            <asp:Button ID="Go" runat="server" Text="LogIn" OnClick="Go_Click" style="height: 26px" />
            <br /> <br /> 

            
            <br />
            <br />
       
        </div>
    </form>
</body>
</html>