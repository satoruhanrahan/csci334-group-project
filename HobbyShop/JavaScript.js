// display all sale items
$(document).ready(function () {
    getAllItems();
});

function getAllItems() {
    ModelController.ReturnFromDatabase(onGetItems);
}

function onGetItems(result) {
    var items = JSON.parse(result);
    displayItemNames(items);
}

function displayItemNames(items) {
    var text = " ";
    for (var i = items.length - 1; i >= 0; i--) {

       text += "<button class='listItem' onClick='displayItemDetails(" + items[i].Id + ");'>" + items[i].Name + "</button><br />";

       function displayItemDetails(id) {
            document.getElementById("details").innerHTML = "";
            var inner = " ";
            inner += "Name: " + items[i].Name + "<br />"  + "ID: " + items[i].Id + "<br />" + "Type: " + items[i].Type + "<br />" + "Subject Area: " + items[i].SbjArea + "<br />" + "Price :" + items[i].Price + "<br />" + "Description: " + items[i].Description + "<br />" + "Availability: " + items[i].Availability + "<br />" + "Stock Count: " + items[i].StockCount;
            document.getElementById("details").innerHTML = inner;
        }
       displayItemDetails(items[i].Id);
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
        "Availability <input type='checkbox' id='modelAvail' /> <br />" +
        "Stock Count <input type='text' id='stockCountModel' /> <br />" +
        "<input type='button' value='Add New Item to Model' onclick='addNewItemModel();' />";
}

function addNewItemModel() {
    var name = document.getElementById("modelName").value;
    var type = document.getElementById("modelType").value;
    var sbjarea = document.getElementById("modelArea").value;
    var price = document.getElementById("modelPrice").value;
    var des = document.getElementById("modelDes").value;
    var avail = document.getElementById("modelAvail").checked;
    var stockCount = document.getElementById("stockCountModel").value;


    ModelController.AddNewModel(name, type, sbjarea, Number(price), des, avail, stockCount, onInputNewModel);
}

function onInputNewModel(result) {
    if (result === "") {
        document.getElementById("results").innerHTML = "Successfully added to the database";
    }
}
