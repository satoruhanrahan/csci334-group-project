var items;
var searchedItems;

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
       text += "<button class='listItem' onClick='displayModel(" + i + ");'>" + items[i].Name + "</button><br />";
    }
    document.getElementById("list").innerHTML = text;
}

function loadPage(page) {
    document.getElementsByClassName('activeTab').className = 'tab'
    document.getElementById(page).className = 'activeTab';
    window.open(page+'UI.aspx', '_self');
}

// Displays an items details
function displayModel(i) {
    document.getElementById("detailHeading").innerHTML = items[i].Name +
        "<div id='detailOptions' class='dropdown'>" +
        "<button class='smallbtn'> <img src='style/options.png' /></button>" +
        "<div class='dropdown-content'>" +
        "<input type='button' class='inputButton' value='Edit Details' onclick='editModel(" + i + ");' />" +
        "<input type='button' class='inputButton' value='Delete Item' onclick='displayDeleteModel(" + i + ");' />" +
        "</div> </div>";
    var inner = " ";
    var available = " ";
    if (items[i].Availability == "checked") {
        available = "Yes";
    }
    else {
        available = "No";
    }
    inner = "<table id='detailTable'> <tr> <td style='width:25%;'> Name </td> <td>" + items[i].Name + 
        "</td > </tr > <tr> <td> ID </td> <td>" + items[i].Id +
        "</td> </tr> <tr> <td> Type </td> <td>" + items[i].Type +
        "</td> </tr> <tr> <td> Subject Area </td> <td>" + items[i].SbjArea +
        "</td> </tr> <tr> <td> Price </td> <td>" + items[i].Price +
        "</td> </tr> <tr> <td> Description </td> <td>" + items[i].Description +
        "</td> </tr> <tr> <td> Availability </td> <td>" + available +
        "</td> </tr> <tr> <td> Stock Count </td> <td>" + items[i].StockCount +
        "</td> </tr> </table>";
    document.getElementById("details").innerHTML = inner;
}


//Display search ( can be fixed to reusable elements)
function getAllSearchedItems() {
    var searchInput = document.getElementById("searchBar").value;
    ModelController.SearchDatabase(searchInput, onSearchItems);
}

function onSearchItems(result) {
    items = JSON.parse(result);
    displaySearch(items);
}

function displaySearch(items) {
    var text = " ";

    for (var i = items.length - 1; i >= 0; i--) {
        text += "<button class='listItem' onClick='displayModel(" + i + ");'>" + items[i].Name + "</button><br />";
    }
    document.getElementById("list").innerHTML = text;
}



// Edit details
function editModel(i) {
    document.getElementById("detailHeading").innerHTML = items[i].Name;
    var inner = " ";
    var available = " ";
    /*
    if (items[i].Availability == true) {
        available = "checked";
    }
    else {
        available = "unchecked";
    }
    */
    inner = "<table id='detailTable'> <tr> <td style='width:25%;'> Name </td> <td> <input type='text' id='modelName1' value='" + items[i].Name + "' />" +
        "</td> </tr> <tr> <td> Type </td> <td> <input type='text' id='modelType1' value='" + items[i].Type + "' />" +
        "</td> </tr> <tr> <td> Subject Area </td> <td> <input type='text' id='modelArea1' value='" + items[i].SbjArea + "' />" +
        "</td> </tr> <tr> <td> Price </td> <td> <input type='number' id='modelPrice1' value='" + items[i].Price + "' />" +
        "</td> </tr> <tr> <td> Description </td> <td> <textarea id='modelDes1'>" + items[i].Description + "</textarea>" +
        "</td> </tr> <tr> <td> Availability </td> <td> <input type='checkbox' id='modelAvailable1' value='" + available + "' />" +
        "</td> </tr> <tr> <td> Total in Stock </td> <td> <input type='number' id='modelStock1' value='" + items[i].StockCount + "' />" +
        "</td> </tr> </table>" +
        "<button title='Save changes' onclick='updateModel(" + i + ");' class='smallbtn greenbtn'> <img src='style/save.png' /></button>" +
        "<button title='Discard changes' onclick='displayModel(" + i + ");' class='smallbtn redbtn' style='float:right;'> <img src='style/close.png' /></button>";
    document.getElementById("details").innerHTML = inner;
}

function updateModel(i) {
    var name = document.getElementById("modelName1").value;
    var type = document.getElementById("modelType1").value;
    var sbjarea = document.getElementById("modelArea1").value;
    var price = document.getElementById("modelPrice1").value;
    var des = document.getElementById("modelDes1").value;
    var avail = document.getElementById("modelAvailable1").checked;
    var stockCount = document.getElementById("modelStock1").value;
    
    //console.log(items[i].Id, avail);
    ModelController.UpdateModelDetails(items[i].Id, name, type, sbjarea, Number(price), des, avail, stockCount, onUpdateModel);
    
}
function onUpdateModel(result) {
    resultPopup("Successfully Updated","green");
}


//displays the delete model prompt
function displayDeleteModel(i) {
    var results = document.getElementById("results");
    results.innerHTML = "Are you sure you want to delete this model <span style='font-weight:bold'>permanently</span> from the database? <br /> <br />" +
        "<button title='Delete' onclick='removeModel(" + i + ");' class='mediumbtn greenbtn' style='float: left;'> <img src='style/delete.png' /><br/> Delete</button>" +
        "<button title='Cancel' onclick='closeDelete(" + i + ");' class='mediumbtn redbtn' style='float:right;'> <img src='style/close.png' /><br /> Cancel</button>";
    results.style.borderColor = "red";
    results.style.display = "block";
}

function removeModel(i) {
    results.style.display = "none";
    ModelController.DeleteModel(items[i].Id, onDeleteSuccess);
    
}

function onDeleteSuccess(result) {
    resultPopup("Item was removed", "red");
}

function closeDelete(i) {
    results.style.display = "none";
    displayModel(i);
}

//Advanced search display
function displayAdvSearch() {
    document.getElementById("detailHeading").innerHTML = "Advanced Search";
    document.getElementById("details").innerHTML = "Here will be filter & sort settings for an advanced search!";
}

//Add new item to model table
function displayAddItem() {
    document.getElementById("detailHeading").innerHTML = "Add New Item";
    document.getElementById("details").innerHTML = "<table id='detailTable'> <tr> <td style='width:25%;'> Name </td> <td> <input type='text' id='modelName' />" +
        "</td> </tr> <tr> <td> Type </td> <td> <input type='text' id='modelType' placeholder='e.g. Display, Working...' />" +
        "</td> </tr> <tr> <td> Subject Area </td> <td> <input type='text' id='modelArea' placeholder='e.g. Train, Car, Boat...' />" +
        "</td> </tr> <tr> <td> Price </td> <td> <input type='number' id='modelPrice' />" +
        "</td> </tr> <tr> <td> Description </td> <td> <textarea id='modelDes'></textarea>" +
        "</td> </tr> <tr> <td> Availability </td> <td> <input type='checkbox' id='modelAvail' />" +
        "</td> </tr> </table>" +
        "<button class='smallbtn greenbtn' title='Add model' onclick='addNewModel();'><img src='style/add.png' /></button>";
}

// Sends input to controller
function addNewModel() {
    var name = document.getElementById("modelName").value;
    var type = document.getElementById("modelType").value;
    var sbjarea = document.getElementById("modelArea").value;
    var price = document.getElementById("modelPrice").value;
    var des = document.getElementById("modelDes").value;
    var avail = document.getElementById("modelAvail").checked;
    var stockCount = 0;
    if (avail == "checked") {
        avail = true;
    }
    else {
        avail = false;
    }
    
    ModelController.AddNewModel(name, type, sbjarea, Number(price), des, avail, stockCount, onInputNewModel);
}

function onInputNewModel(result) {
    resultPopup("Successfully added to the database", "green");
    getAllItems();
}

function resultPopup(result, color) {
    var results = document.getElementById("results");
    var bg = "light" + color;
    if (color == "red") {
        bg = "indianred";
    }
    results.innerHTML = result;
    results.style.borderColor = color;
    results.style.backgroundColor = bg;
    results.style.display = "block";
    setTimeout(function () {
        results.style.display = "none";
        results.style.backgroundColor = "white";
    }, 3000)
}
