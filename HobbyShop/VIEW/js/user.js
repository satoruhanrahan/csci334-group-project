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

$(document).ready(function () {
    //console.log(user.UserType);
    // display all users
    var users;
    getAllUsers();
   
    // prevent form submission on enter
    $('form').keypress(function (event) {
        return event.keyCode != 13;
    });
    // Search as the user types
    var searchbar = $("#searchbar")[0];
    searchbar.addEventListener("keyup", function (event) {
        event.preventDefault();
        getAllUsers();
    });
   
    $("#advSearch")[0].addEventListener("click", function () {
        displayAdvSearch();
    });
    $("#addButton")[0].addEventListener("click", function () {
        displayAddUser();
    });
});

// Display suppliers in list based on search
function getAllUsers() {
    var searchInput = document.getElementById("searchbar").value;
    UserController.ReturnAll(searchInput, onGetAllUsers);
}

function onGetAllUsers(result) {
    console.log(result);
    users = JSON.parse(result);
    
    displayUserNames(users);
}

//Advanced search display
function displayAdvSearch() {
    clearDisplay();
    $("#detailHeading")[0].style.visibility = "visible";
    $("#detailHeading")[0].innerHTML = "Advanced Search";
}

// Creates and displays a list of buttons representing suppliers in the inventory. 
function displayUserNames(users) {
    console.log(users[0]); //test
    $("#list")[0].innerHTML = "";
    var button;
    for (var i = users.length - 1; i >= 0; i--) {
        console.log(users[i].FirstName);//test

        button = document.createElement("button");
        button.append(users[i].FirstName);
        button.setAttribute("id", users[i].Id);
        button.setAttribute("type", "button");
        button.setAttribute("class", "listItem");
        let anuser = users[i];
        button.addEventListener("click", function () {
            displayUserDetails(anuser);
        });
        $("#list")[0].append(button);
    }
}

// Displays details
function displayUserDetails(user) {
    console.log(user);
    // set display
   // clearDisplay();
    switchTabs("detailTabBar", "detailsTab");
    $("#detailHeading")[0].innerHTML = user.FirstName + user.LastName;
    $("#detailHeading")[0].style.visibility = "visible";
    $("#detailOptions")[0].style.visibility = "visible";
    $("#details")[0].style.visibility = "visible";
    $("#detailTabBar")[0].style.visibility = "visible";

    /*
    $("#editUser")[0].addEventListener("click", function () {
        editUserDetails(user);
    });
    $("#deleteUser")[0].addEventListener("click", function () {
        displayDeleteUser(user);
    });
    */

    var date = new Date(parseInt((user.LastLogged).substr(6)));

    var month = date.getMonth() + 1;
    var day = date.getDate();
    var year = date.getFullYear();
    if (month.toString().length == 1) {
        month = "0" + month;
    }
    if (day.toString().length == 1) {
        day = "0" + day;
    }
    var format = year + "-" + month + "-" + day;

    activeItem(user.Id);
    $("#userNameInput")[0].value = user.UserName;
    $("#userID")[0].innerHTML = user.Id;
    $("#userPasswordInput")[0].value = user.PassWord;
    $("#userFirstNameInput")[0].value = user.FirstName;
    $("#userLastNameInput")[0].value = user.LastName;
    $("#userTypeInput")[0].value = user.UserType;
    $("#lastLogin")[0].innerHTML = format;
}
