var user;
function loginToAccount() {
    console.log(document.getElementById("eBox").value, document.getElementById("pBox").value);
    var username = document.getElementById("eBox").value;
    var password = document.getElementById("pBox").value;
    UserController.ReturnUser(username, password, onReturnUser);

}
function onReturnUser(result) {
    console.log(result);
    var userList = JSON.parse(result);
    console.log(userList.length);
    if (userList.length == 0) {
        document.getElementById("noti").innerHTML = "Wrong UserName or Password";
    }
    else {
        document.getElementById("noti").innerHTML = "Correct";
        window.location.href = 'MasterContent.aspx';
        user = userList[0];
    }
}