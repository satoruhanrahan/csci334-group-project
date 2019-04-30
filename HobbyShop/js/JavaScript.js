
var items;
var searchedItems;

// display all items
$(document).ready(function () {
    var items;
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
    $("#list")[0].innerHTML = "";
    var button;
    for (var i = items.length - 1; i >= 0; i--) {
        button = document.createElement("button");
        button.setAttribute("type", "button");
        button.setAttribute("class", "listItem");
        button.setAttribute("onclick", "displayModel(" + i + ")");
        button.innerHTML = items[i].Name;
        $("#list").append(button);
    }
}

// Displays an items details
function displayModel(i) {
    $("#detailHeading")[0].innerHTML = items[i].Name;

    var div1 = document.createElement("div");
    div1.setAttribute("id", "detailOptions");
    div1.setAttribute("class", "dropdown");
    $("#detailHeading").append(div1);

    var img1 = document.createElement("img");
    img1.src = "style/options.png";
    var button1 = document.createElement("button");
    button1.setAttribute("type", "button");
    button1.setAttribute("class", "smallbtn");
    button1.append(img1);
    div1.append(button1);
    
    var div2 = document.createElement("div");
    div2.setAttribute("class", "dropdown-content");
    div1.append(div2);

    var button2 = document.createElement("button");
    button2.setAttribute("type", "button");
    button2.setAttribute("class", "dropdown-button");
    button2.setAttribute("onclick", "editModel(" + i + ")");
    button2.append("Edit Details");
    div2.append(button2);

    var button3 = document.createElement("button");
    button3.setAttribute("type", "button");
    button3.setAttribute("class", "dropdown-button");
    button3.setAttribute("onclick", "displayDeleteModel(" + i + ")");
    button3.append("Delete Model");
    div2.append(button3);

    var available = " ";
    console.log(items[i].Availability);

    if (items[i].Availability == true) {
        available = "Yes";
    }
    else if (items[i].Availability == false) {
        available = "No";
    }

    var table = document.createElement("table");
    table.setAttribute("id", "detailTable"); 
    $("#details").append(table);

    var tr, td1, td2;
    for (var j = 0; j < 8; j++) {
        tr = document.createElement("tr");
        table.append(tr);
        td1 = document.createElement("td");
        td2 = document.createElement("td");
        switch (j) {
            case 0:
                td1.append("Name");
                td2.append(items[i].Name);
                break;
            case 1:
                td1.append("ID");
                td2.append(items[i].Id);
                break;
            case 2:
                td1.append("Type");
                td2.append(items[i].Type);
                break;
            case 3:
                td1.append("Subject Area");
                td2.append(items[i].SbjArea);
                break;
            case 4:
                td1.append("Price");
                td2.append(items[i].Price);
                break;
            case 5:
                td1.append("Description");
                td2.append(items[i].Description);
                break;
            case 6:
                td1.append("Availability");
                td2.append(available);
                break;
            case 7:
                td1.append("Total Stock");
                td2.append(items[i].StockCount);
                break;
        }
        tr.append(td1);
        tr.append(td2);
    }
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
        "<button type='button' title='Save changes' onclick='updateModel(" + i + ");' class='smallbtn greenbtn'> <img src='style/save.png' /></button>" +
        "<button type='button' title='Discard changes' onclick='displayModel(" + i + ");' class='smallbtn redbtn' style='float:right;'> <img src='style/close.png' /></button>";
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
        "<button type='button' title='Delete' onclick='removeModel(" + i + ");' class='mediumbtn greenbtn' style='float: left;'> <img src='style/delete.png' /><br/> Delete</button>" +
        "<button type='button' title='Cancel' onclick='closeDelete(" + i + ");' class='mediumbtn redbtn' style='float:right;'> <img src='style/close.png' /><br /> Cancel</button>";
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
function displayAddModel() {
    document.getElementById("detailHeading").innerHTML = "Add New Model";
    document.getElementById("details").innerHTML = "<table id='detailTable'> <tr> <td style='width:25%;'> Name </td> <td> <input type='text' id='modelName' />" +
        "</td> </tr> <tr> <td> Type </td> <td> <input type='text' id='modelType' placeholder='e.g. Display, Working...' />" +
        "</td> </tr> <tr> <td> Subject Area </td> <td> <input type='text' id='modelArea' placeholder='e.g. Train, Car, Boat...' />" +
        "</td> </tr> <tr> <td> Price </td> <td> <input type='number' id='modelPrice' />" +
        "</td> </tr> <tr> <td> Description </td> <td> <textarea id='modelDes'></textarea>" +
        "</td> </tr> <tr> <td> Availability </td> <td> <input type='checkbox' id='modelAvail' />" +
        "</td> </tr> </table>" +
        "<button type='button' class='smallbtn greenbtn' title='Add model' onclick='addNewModel();'><img src='style/add.png' /></button>";
}

// Sends input to controller
function addNewModel() {
    var name = document.getElementById("modelName").value;
    var type = document.getElementById("modelType").value;
    var sbjarea = document.getElementById("modelArea").value;
    var price = document.getElementById("modelPrice").value;
    var des = document.getElementById("modelDes").value;
    var avail = document.getElementById("modelAvail").checked; // already returns true/false
    var stockCount = 0;
   /* if (avail == "checked") {
        avail = true;
    }
    else {
        avail = false;
    }
    */
    
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
