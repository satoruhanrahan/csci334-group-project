$(document).ready(function () {
    getDeliveryRecords();
    getAllSearchedItems();
    // prevent form submission on enter
    $('form').keypress(function (event) {
        return event.keyCode != 13;
    });
    // Search as the user types
    var searchbar = $("#searchbar")[0];
    searchbar.addEventListener("keyup", function (event) {
        event.preventDefault();
        getDeliveryRecords();
        //getAllSearchedItems();
    });
    $("#advSearch")[0].addEventListener("click", function () {
        displayAdvSearch();
    });
    /*$("#addButton")[0].addEventListener("click", function () {
        displayAddDeliveryRecord();
    });*/
    /*$("#leftButton")[0].style.visibility = "hidden";
    $("#rightButton")[0].style.visibility = "hidden";
    $("#detailOptions")[0].style.visibility = "hidden";
    $("#details")[0].style.visibility = "hidden";
    $("#detailTable")[0].style.visibility = "hidden";*/
    document.getElementById("detailTable").style.visibility = "hidden";
    setTimeout(function () {
        try {
            if (loaded != undefined) {
                if (loaded != "") {
                    displayDeliveryDetails(loaded);
                    loaded = "";
                }
            }
        } catch (ReferenceError) { }
    }, 250);
});

var itemList = [];

function getDeliveryRecords() {
    var keywords = document.getElementById("searchbar").value;
    DeliveryController.GetRecords(keywords, onGetDeliveryRecords);
}

//callback function
function onGetDeliveryRecords(result) {
    var deliveries = JSON.parse(result);
    displayDeliveryRecords(deliveries);
}

//get all model items
function getAllSearchedItems() {
    var searchInput = document.getElementById("searchbar").value;
    ModelController.SearchDatabase(searchInput, onSearchItems);
}
function onSearchItems(result) {
    items = JSON.parse(result);
    for (var i = 0; i < items.length; i++) {
        itemList.push(items[i]);
    }
}

//display a list of deliveries
function displayDeliveryRecords(deliveries) {
    var list = document.getElementById("list");
    while (list.hasChildNodes()) {
        list.removeChild(list.lastChild);
    }
    for (var i = deliveries.length - 1; i >= 0; i--) {
        var button = document.createElement("button");
        button.setAttribute("class", "listItem");
        var date = new Date(parseInt((deliveries[i].Date).substr(6)));
        var formatedDate = date.toString().substr(4, 11);
        button.innerHTML = "Delivery #" + deliveries[i].DeliveryID + "<br/>" + formatedDate;
        let delivery = deliveries[i];
        button.addEventListener("click", function (event) {
            document.getElementById("details").style.visibility = "visible";
            document.getElementById("detailTable").style.visibility = "visible";
            event.preventDefault();
            displayDeliveryDetails(delivery);
        });
        list.appendChild(button);
    }
}

//display delivery details
function displayDeliveryDetails(delivery) {
    $("#results")[0].style.display = "none";
    $("#detailOptions")[0].style.visibility = "visible";
    $("#details")[0].style.visibility = "visible";
    $("#detailTable")[0].style.visibility = "visible";
    $("#leftButton")[0].style.visibility = "hidden";
    $("#rightButton")[0].style.visibility = "hidden";
    $("#error")[0].style.visibility = "hidden";
    /*
    $("#editItem")[0].addEventListener("click", function () {
        editDeliveryDetails(delivery);
    });
    
   $("#deleteItem")[0].addEventListener("click", function () {
        displayDeleteItem(item);
    });*/

    var date = new Date(parseInt((delivery.Date).substr(6)));

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

    var detailHeading = document.getElementById("detailHeading");
    detailHeading.innerHTML = "Delivery #" + delivery.DeliveryID;
    document.getElementById("date").value = format;
    document.getElementById("delivery").value = delivery.DeliveryID;
    document.getElementById("store").value = delivery.StoreID;
    document.getElementById("supplier").value = delivery.SupplierID;

    var items = delivery.Items;
    var itemTable = document.getElementById("itemTable");

    //remove previous delivery's itemlist
    var numberOfRows = itemTable.rows.length;
    if (numberOfRows > 1) {
        for (var i = 1; i < numberOfRows; i++) {
            itemTable.deleteRow(1);
        }
    }
    if (items.length > 0) {
        for (var i = 0; i < items.length; i++) {
            var row = document.createElement("tr");
            var itemNumberInput = document.createElement("input");
            itemNumberInput.setAttribute("class", "itemInput");
            var totalCostInput = document.createElement("input");
            totalCostInput.setAttribute("class", "itemInput");
            var itemNumber = document.createElement("td");
            var totalCost = document.createElement("td");
            itemNumberInput.value = items[i].ItemNumber;
            itemNumberInput.disabled = true;
            totalCostInput.value = items[i].TotalCost;
            totalCostInput.disabled = true;
            itemNumber.appendChild(itemNumberInput);
            totalCost.appendChild(totalCostInput);
            row.appendChild(itemNumber);
            row.appendChild(totalCost);
            itemTable.appendChild(row);
        }
    }
}

function displayAddDeliveryRecord() {
    $("#detailHeading")[0].innerHTML = "";
    $("#detailHeading")[0].innerHTML = "Add a New Delivery Record";
    $("#detailHeading")[0].style.visibility = "visible";
    $("#details")[0].style.visibility = "visible";
    $("#detailTable")[0].style.visibility = "visible";
    $("#detailOptions")[0].style.visibility = "hidden";
    $("#itemTable").find("tr:gt(0)").remove();
    //$('#itemTable').append('<tr><td><input type="text" class="itemInput" id="itemNumber"/></td><td><input type="text" class="itemInput" id="totalCost"/></td></tr>');
    insertNewRow(1);
    $("#leftImage").attr("src", "style/add.png");
    $("#delivery")[0].style.backgroundColor = "lightgray";
    /*var img1 = document.createElement("img");
    img1.src = "style/add.png";
    $("#leftButton")[0].append(img1);
    */
    $("#leftButton")[0].setAttribute("title", "Add");
    $("#leftButton")[0].style.visibility = "visible";
    $("#rightButton")[0].style.visibility = "visible";

    var elements = document.getElementsByTagName("input");
    for (var i = 0; i < elements.length; i++) {
        elements[i].value = "";
        var id = elements[i].id;
        if (id == "date" || id == "store" || id == "supplier") {
            elements[i].disabled = false;
        }
    }
    $("#leftButton")[0].addEventListener("click", function () {
        //$("#leftButton")[0].style.visibility = "hidden";
        //$("#rightButton")[0].style.visibility = "hidden";
        addDeliveryRecord();
    });

    $("#rightButton")[0].addEventListener("click", function () {
        clearDisplay();
    });
}

function insertNewRow(index) {
    var row = document.createElement("tr");
    var itemNumber = document.createElement("td");
    var itemNumberInput = document.createElement("input");
    itemNumberInput.setAttribute("type", "text");
    itemNumberInput.setAttribute("class", "itemInput itemNumberInput");
    itemNumberInput.setAttribute("id", "itemNumberInput" + index);
    itemNumberInput.setAttribute("list", "itemNumber" + index);
    var datalist = document.createElement("datalist");
    datalist.setAttribute("id", "itemNumber" + index);
    itemNumber.appendChild(itemNumberInput);
    itemNumber.appendChild(datalist);

    var totalCost = document.createElement("td");
    var totalCostInput = document.createElement("input");
    totalCostInput.setAttribute("type", "text");
    totalCostInput.setAttribute("class", "itemInput totalCostInput");
    totalCostInput.setAttribute("id", "totalCostInput" + index);
    totalCost.appendChild(totalCostInput);
   
    for (var i = 0; i < itemList.length; i++) {
        var option = document.createElement("option");
        option.setAttribute("value", itemList[i].Id);
        option.setAttribute("id", i);
        datalist.appendChild(option);
    }
    totalCostInput.addEventListener("keydown", addRow);
    totalCost.appendChild(totalCostInput);
    
    row.appendChild(itemNumber);
    row.appendChild(totalCost);
    itemTable.appendChild(row);
}

function addRow(e) {
    var j = 2;
    if (e.keyCode == 13) { // 13 is enter
        alert("Pressed!");
        insertNewRow(j);
        j++;
    }
}
//add a new delivery record
function addDeliveryRecord() {
    var date = document.getElementById("date").value;
    var store = document.getElementById("store").value;
    var supplier = document.getElementById("supplier").value;

    var itemNumberInput = document.getElementsByClassName("itemNumberInput");
    var totalCostInput = document.getElementsByClassName("totalCostInput");
    //there must be at least one item in a sale record
    var itemNumber = itemNumberInput[0].value;
    var totalCost = totalCostInput[0].value;

    /*var errorMessage = document.getElementById("error");
    if (date == "" || store == "" || supplier == "") {
        errorMessage.innerText = "Please input date, storeID, supplierID and at least 1 item!";
    }
    else {
        DeliveryController.AddDeliveryRecord(date, store, supplier);
        onAddDeliveryRecord();
    }*/
    var check = false;
    var errorMessage = document.getElementById("error");
    if (date == "" || store == "" || supplier == "" || itemNumber == "" || totalCost == "") {
        errorMessage.innerText = "Please input date, store, supplier and at least 1 item!";
    }
    else if (!(Number(store)) || !(Number(supplier))) {
        errorMessage.innerText = "Please input the right format!";
    }
    else {
        errorMessage.innerText = "";
        check = true;
    }
    if (check) {
        var listOfItems = [];
        for (var i = 0; i < itemNumberInput.length; i++) {
            var itemNumber = itemNumberInput[i].value;
            var totalCost = totalCostInput[i].value;
            if (itemNumber != "") {
                var item = { ItemNumber: itemNumber, TotalCost: totalCost };
                listOfItems.push(item);
            }
        }
        var itemListString = JSON.stringify(listOfItems);
        DeliveryController.AddDeliveryRecord(date, store, supplier, itemListString, onAddDeliveryRecord);
    }
}

function onAddDeliveryRecord() {
    resultPopup("Successfully added to the database", "green");
    clearDisplay();
    getDeliveryRecords();
    // **todo: add single new button to list
}

// removes any details that are displayed in the details section
function clearDisplay() {
    $("#detailHeading")[0].style.visibility = "hidden";
    $("#leftButton")[0].style.visibility = "hidden";
    $("#rightButton")[0].style.visibility = "hidden";
    $("#detailOptions")[0].style.visibility = "hidden";
    $("#details")[0].style.visibility = "hidden";
    $("#detailTable")[0].style.visibility = "hidden";
    $("#detailContainer")[0].style.visibility = "hidden";
    $("#detailHeading")[0].style.visibility = "hidden";
}

//edit delivery record
function editDeliveryDetails(delivery) {
    $("#leftImage").attr("src", "style/save.png");
    $("#leftButton")[0].style.visibility = "visible";
    $("#rightButton")[0].style.visibility = "visible";
    $("#delivery")[0].style.backgroundColor = "lightgray";

    var elements = document.getElementsByTagName("input");
    for (var i = 0; i < elements.length; i++) {
        //var id = elements[i].id;
        //if (id == "date" || id == "store" || id == "supplier") {
        elements[i].disabled = false;
        //}
    }
    $("#leftButton")[0].addEventListener("click", function () {
        saveDeliveryDetails(delivery);
    });

    $("#rightButton")[0].addEventListener("click", function () {
        restore();
    });
}

function saveDeliveryDetails() {
    var id = document.getElementById("delivery").value;
    var date = document.getElementById("date").value;
    var store = document.getElementById("store").value;
    var supplier = document.getElementById("supplier").value;

    //get item details
    var listOfItems = [];
    var itemTable = document.getElementById("itemTable");
    var itemInputs = document.getElementsByClassName("nameInput");
    for (var i = 0; i < itemInputs.length; i + 2) {
        var itemNumber = itemInputs[i].value;
        var totalCost = itemInputs[i + 1].value;
        var item = { ItemNumber: parseInt(itemNumber), TotalCost: parseFloat(totalCost) };
        listOfItems.push(item);
    }
    var itemListString = JSON.stringify(listOfItems);
    DeliveryController.EditDeliveryDetails(Number(id), date, Number(store), Number(supplier), itemListString, onEditDeliveryDetails);
}

function onEditDeliveryDetails(result) {
    if (parseJSON(result)) {
        var delivery = JSON.parse(result);

        //clearDisplay();
        getDeliveryRecords();
        displayDeliveryDetails(delivery);
        resultPopup("Successfully Edited", "green");
        $("#leftButton")[0].style.visibility = "hidden";
        $("#rightButton")[0].style.visibility = "hidden";
        var elements = document.getElementsByTagName("input");
        for (var i = 0; i < elements.length; i++) {
            var id = elements[i].id;
            if (id == "date" || id == "store" || id == "supplier") {
                elements[i].disabled = true;
            }
        }
    }
    else {
        resultPopup("Failed to edit record!", "red");
    }
}

function deletedeleteDeliveryRecord() {
    var id = document.getElementById("delivery").value;
    DeliveryController.DeleteDeliveryRecord(Number(id), onDeleteDeliveryRecord);
}

function onDeleteDeliveryRecord(result) {
    if (result == "") {
        clearDisplay();
        resultPopup("Successfully deleted", "green");
        $("#leftButton")[0].style.visibility = "hidden";
        $("#rightButton")[0].style.visibility = "hidden";
        getDeliveryRecords();
    }
}

//Advanced search display
function displayAdvSearch() {
    clearDisplay();
    $("#detailHeading")[0].style.visibility = "visible";
    $("#detailHeading")[0].innerHTML = "Advanced Search";
}

function restore() {
    $('#detailTable').find(':input').each(function (i, elem) {
        $(this).val($(this).data("previous-value"));
    });
}

function parseJSON(jsonString) {
    try {
        var obj = JSON.parse(jsonString);
        if (obj && typeof obj === "object")
            return obj;
    }
    catch (e) { }
    return false;
}
/*
$('#rightButton').click(function () {
    restore();
});*/