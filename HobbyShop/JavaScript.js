// display all sale items
$(document).ready(function () {
    getInventoryName();
});
function getInventoryName() {
    Service1.GetInventoryName(onGetInventoryName);
}

function onGetInventoryName(result) {
    var names = JSON.parse(result);
    displayInventoryName(names);
}


function displayInventoryName(names) {
    /* NEEDS IMPLEMENTATION: Get item id (put in ITEMID) and create function (displayItemDetails) which gets item details*/
    var text = " ";
    for (var i = names.length - 1; i >= 0; i--) {
        var name = names[i];
        text += "<button class='listItem' onclick='displayItemDetails(" + 'ITEMID' + ");'>"+name+"</button><br />";
    }
    document.getElementById("list").innerHTML = text;
}

//Add new item to model table
function displayAddItem() {
    document.getElementById("detailHeading").innerHTML = "Add New Item";
    document.getElementById("details").innerHTML = "Name <input type='text' id='modelName' /> <br />" +
        "Type <input type='text' id='modelType' /> <br />" +
        "Subject area <input type='text' id='modelArea' /> <br />" +
        "Current retail price <input type='text' id='modelPrice' /> <br />" +
        "Description <textarea id='modelDes'></textarea> <br />" +
        "Availability <input type='text' id='modelAvail' /> <br />" +
        "<input type='button' value='Add New Item to Model' onclick='addNewItemModel();' />";
}

function addNewItemModel() {
    var name = document.getElementById("modelName").value;
    var type = document.getElementById("modelType").value;
    var sbjarea = document.getElementById("modelArea").value;
    var price = document.getElementById("modelPrice").value;
    var des = document.getElementById("modelDes").value;
    var avail = document.getElementById("modelAvail").value;
   
    Service1.AddNewModel(name, type, sbjarea, price, des, avail, onInputNewModel );
}

function onInputNewModel(result) {
    if (result === "") {
        document.getElementById("results").innerHTML = "Successfully added to the database";
    }
}
