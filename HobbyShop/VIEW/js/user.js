var user;

function loginToAccount() {
    console.log(document.getElementById("eBox").value, document.getElementById("pBox").value);
    var username = document.getElementById("eBox").value;
    var password = document.getElementById("pBox").value;
    UserController.ReturnUser(username, password, onReturnUser);

}
function onReturnUser(result) {
    console.log(result);
    var theUser = JSON.parse(result);
   
    if (theUser==null) {
        document.getElementById("noti").innerHTML = "Wrong UserName or Password";
    }
    else {
        document.getElementById("noti").innerHTML = "Correct";
        if (theUser.UserType == "admin") {
            window.location.href = 'MasterContent.aspx';
            
        }
        else {
            window.location.href = 'MasterPageStaff.aspx';
            
        }
        
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
    //clearDisplay();
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
    */
    $("#deleteUser")[0].addEventListener("click", function () {
        displayDeleteUser(user);
    });
    
    var format;
    if (user.LastLogged != null) {
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
        format = year + "-" + month + "-" + day;
    }
    

    activeItem(user.Id);
    $("#userNameInput")[0].value = user.UserName;
    $("#userID")[0].innerHTML = user.Id;
    $("#userPasswordInput")[0].value = user.PassWord;
    $("#userFirstNameInput")[0].value = user.FirstName;
    $("#userLastNameInput")[0].value = user.LastName;
    $("#userTypeInput")[0].value = user.UserType;
    $("#lastLogin")[0].innerHTML = format;
}


//Create new user account
function displayAddUser() {
    //reset detail display to have correct elements for this menu.
   // clearDisplay();
    $("#detailHeading")[0].innerHTML = "Create New Account";
    $("#detailHeading")[0].style.visibility = "visible";
    $("#details")[0].style.visibility = "visible";
    $("#detailTabBar")[0].style.visibility = "visible";
    $("#leftButton")[0].style.visibility = "visible";
    $("#rightButton")[0].style.visibility = "visible";
    $("#userID")[0].style.backgroundColor = "lightgrey";
    $("#lastLogin")[0].style.backgroundColor = "lightgrey";
    
    activeItem("");

    $("#userNameInput").removeAttr("disabled");
    $("#userPasswordInput").removeAttr("disabled");
    $("#userFirstNameInput").removeAttr("disabled");
    $("#userLastNameInput").removeAttr("disabled");
    $("#userTypeInput").removeAttr("disabled");

    // set details for left button
    var img1 = document.createElement("img");
    img1.src = "style/add.png";
    $("#leftButton")[0].innerHTML = "";
    $("#leftButton")[0].append(img1);
    $("body").on("click", "#leftButton", addNewUser);
    $("body").on("click", "#rightButton", clearDisplay);
}

function validateInput() {
    var userName = $("#userNameInput")[0].value;
    var passWord = $("#userPasswordInput")[0].value;
    var fName = $("#userFirstNameInput")[0].value;
    var lName = $("#userLastNameInput")[0].value;
    var type = $("#userTypeInput")[0].value;

    if (userName === '' || passWord === '' || fName === '' || lName === '' || type === '') {
        alert("Please input all fields!");
        return false;
    }
    else {
        return true;
    }
}

// Sends input to controller
function addNewUser() {
    if (validateInput()) {
        UserController.CreateNewAccount(
            $("#userNameInput")[0].value,
            $("#userPasswordInput")[0].value,
            $("#userFirstNameInput")[0].value,
            $("#userLastNameInput")[0].value,
            $("#userTypeInput")[0].value,
            onAddNewUser
        );
    }
}

function onAddNewUser(result) {
    console.log(result);
    //clearDisplay();
    getAllUsers();
    
    resultPopup(result, "green");
    
   
}
//displays the delete prompt
function displayDeleteUser(user) {
    $("#results")[0].style.borderColor = "red";
    $("#results")[0].style.display = "block";
    $("#results")[0].innerHTML = "";

    var br = document.createElement("br");

    var button1 = document.createElement("button");
    button1.setAttribute("type", "button");
    button1.setAttribute("title", "Delete");
    button1.style.cssFloat = "left";
    button1.setAttribute("class", "mediumbtn greenbtn");
    button1.addEventListener("click", function () {
        deleteUser(user.Id);
    });
    var img1 = document.createElement("img");
    img1.src = "style/delete.png";
    button1.append(img1);
    button1.append(br);
    button1.append("Delete");

    var button2 = document.createElement("button");
    button2.setAttribute("type", "button");
    button2.setAttribute("title", "Cancel");
    button2.style.cssFloat = "right";
    button2.setAttribute("class", "mediumbtn redbtn");
    button2.addEventListener("click", function () {
        closeDelete();
    });
    var img2 = document.createElement("img");
    img2.src = "style/close.png";
    button2.append(img2);
    button2.append(br.cloneNode());
    button2.append("Cancel");

    $("#results")[0].append("Are you sure you want to delete this account ");
    var span = document.createElement("span");
    span.style.fontWeight = "bold";
    span.append("permanently");
    $("#results")[0].append(span);
    $("#results")[0].append(" from the database?");
    $("#results")[0].append(br.cloneNode());
    $("#results")[0].append(br.cloneNode());
    $("#results")[0].append(button1);
    $("#results")[0].append(button2);
}

function deleteUser(id) {
    results.style.display = "none";
    UserController.DeleteUserAccount(id, onDeleteUser);
}

function onDeleteUser(id) {
    //clearDisplay();
    //activeItem("");
    
    $("#" + id)[0].remove();
    resultPopup("Account was successfully removed.", "green");
}

// closes the delete prompt
function closeDelete() {
    results.style.display = "none";
}