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

// Displays an items details
function displayItemDetails(id) {
    document.getElementById("detailHeading").innerHTML = items[id].Name +
        "<div class='dropdown'>" +
        "<button class='dropbtn'>...</button>" +
        "<div class='dropdown-content'>" +
        "<input type='button' class='inputButton' value='Edit Details' onclick='editDetails(id);' />" +
        "<input type='button' class='inputButton' value='Delete Item' onclick='deleteItem(id);' />" +
        "</div> </div>";
    var inner = " ";
    var available = " ";
    if (items[id].Availability == true) {
        available = "Yes";
    }
    else {
        available = "No";
    }
    inner = "<table id='detailTable'> <tr> <td style='width:25%;'> Name </td> <td> " + items[id].Name + 
        "</td> </tr> <tr> <td> ID </td> <td>" + items[id].Id +
        "</td> </tr> <tr> <td> Type </td> <td>" + items[id].Type +
        "</td> </tr> <tr> <td> Subject Area </td> <td>" + items[id].SbjArea +
        "</td> </tr> <tr> <td> Price </td> <td>" + items[id].Price +
        "</td> </tr> <tr> <td> Description </td> <td>" + items[id].Description +
        "</td> </tr> <tr> <td> Availability </td> <td>" + available +
        "</td> </tr> <tr> <td> Stock Count </td> <td>" + items[id].StockCount +
        "</td> </tr>";
    document.getElementById("details").innerHTML = inner;
}

//Add new item to model table
function displayAddItem() {
    document.getElementById("detailHeading").innerHTML = "Add New Item";
    document.getElementById("details").innerHTML = "Name <input type='text' id='modelName' /> <br />" +
        "Type <input type='text' id='modelType' /> <br />" +
        "Subject area <input type='text' id='modelArea' /> <br />" +
        "Current retail price <input type='number' id='modelPrice' /> <br />" +
        "Description <textarea id='modelDes'></textarea> <br />" +
        // I believe avilability and stock will be defined by the system, and not here. 
        // If stock is to be modified manually, you can do this is the "edit item" menu.
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
