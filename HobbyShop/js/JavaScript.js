var items;

// display all items
$(document).ready(function () {
    getAllItems();
});

function getAllItems() {
    ModelController.ReturnFromDatabase(onGetItems);
}

function onGetItems(result) {
    items = JSON.parse(result);
    displayItemNames(items);
}

// Creates and displays a list of buttons used representing items in the inventory. 
function displayItemNames(items) {
    var text = " ";
    for (var i = items.length - 1; i >= 0; i--) {
       text += "<button class='listItem' onClick='displayItemDetails(" + i + ");'>" + items[i].Name + "</button><br />";
    }
    document.getElementById("list").innerHTML = text;
}

function loadPage(page) {
    document.getElementsByClassName('activeTab').className = 'tab'
    document.getElementById(page).className = 'activeTab';
    window.open(page+'UI.aspx', '_self');
}

// Displays an items details
function displayItemDetails(i) {
    document.getElementById("detailHeading").innerHTML = items[i].Name +
        "<div class='dropdown'>" +
        "<button class='dropbtn'>...</button>" +
        "<div class='dropdown-content'>" +
        "<input type='button' class='inputButton' value='Edit Details' onclick='editDetails(" + i + ");' />" +
        "<input type='button' class='inputButton' value='Delete Item' onclick='deleteItem(" + i + ");' />" +
        "</div> </div>";
    var inner = " ";
    var available = " ";
    if (items[i].Availability == true) {
        available = "Yes";
    }
    else {
        available = "No";
    }
    inner = "<table id='detailTable'> <tr> <td style='width:25%;'> Name </td> <td>" + items[i].Name + 
        "</td> </tr> <tr> <td> ID </td> <td>" + items[i].Id +
        "</td> </tr> <tr> <td> Type </td> <td>" + items[i].Type +
        "</td> </tr> <tr> <td> Subject Area </td> <td>" + items[i].SbjArea +
        "</td> </tr> <tr> <td> Price </td> <td>" + items[i].Price +
        "</td> </tr> <tr> <td> Description </td> <td>" + items[i].Description +
        "</td> </tr> <tr> <td> Availability </td> <td>" + available +
        "</td> </tr> <tr> <td> Stock Count </td> <td>" + items[i].StockCount +
        "</td> </tr>";
    document.getElementById("details").innerHTML = inner;
}

//Advanced search display
function displayAdvSearch() {
    document.getElementById("detailHeading").innerHTML = "Advanced Search";
    document.getElementById("details").innerHTML = "Here will be filter settings for an advanced search!";
}

//Add new item to model table
function displayAddItem() {
    document.getElementById("detailHeading").innerHTML = "Add New Item";
    document.getElementById("details").innerHTML = "Name <input type='text' id='modelName' /> <br />" +
        "Type <input type='text' id='modelType' /> <br />" +
        "Subject area <input type='text' id='modelArea' /> <br />" +
        "Current retail price <input type='number' id='modelPrice' /> <br />" +
        "Description <textarea id='modelDes'></textarea> <br />" +
        "<input type='button' value='Add New Item to Model' onclick='addNewItemModel();' />";
}

// Sends input to controller
function addNewItemModel() {
    var name = document.getElementById("modelName").value;
    var type = document.getElementById("modelType").value;
    var sbjarea = document.getElementById("modelArea").value;
    var price = document.getElementById("modelPrice").value;
    var des = document.getElementById("modelDes").value;
    var avail = false;
    var stockCount = 0;
    
    ModelController.AddNewModel(name, type, sbjarea, Number(price), des, avail, stockCount, onInputNewModel);
}

function onInputNewModel(result) {
    var results = document.getElementById("results");
    results.innerHTML = "Successfully added to the database";
    results.style.display = "block";
    setTimeout(function () {
        results.style.display = "none";
        getAllItems();
    }, 3000)
}
