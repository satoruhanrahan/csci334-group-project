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
    $("#addRecordButton")[0].style.visibility = "hidden";

    $("#results")[0].style.display = "none";
    $("#detailOptions")[0].style.visibility = "visible";
    $("#details")[0].style.visibility = "visible";
    $("#detailTable")[0].style.visibility = "visible";
    $("#leftButton")[0].style.visibility = "hidden";
    $("#rightButton")[0].style.visibility = "hidden";

    //$("#error")[0].style.visibility = "hidden";

    $("#delivery")[0].style.backgroundColor = "white";

    $("#editDelivery")[0].addEventListener("click", function () {
        editDeliveryDetails(delivery);
    });
   /*$("#deleteDelivery")[0].addEventListener("click", function () {
       displayDeleteItem(delivery.DeliveryID);
    });*/
    document.getElementById("error").innerText = "";

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
    document.getElementById("totalValue").value = delivery.TotalValue;

    $("#date").attr({ "disabled": "disabled" });
    $("#delivery").attr({ "disabled": "disabled" });
    $("#store").attr({ "disabled": "disabled" });
    $("#supplier").attr({ "disabled": "disabled" });
    $("#totalValue").attr({ "disabled": "disabled" });

    var items = delivery.Items;
    var itemTable = document.getElementById("itemTable");

    //remove previous delivery's itemlist
    var numberOfRows = itemTable.rows.length;
    if (items.length > 0 && numberOfRows >= 2) {
        $("#itemTable").find("tr:gt(0)").remove();
        for (var i = 0; i < items.length; i++) {
            insertNewRow(i);
            $(".nameInput").prop("disabled", true);
            $("#nameInput" + i).val(items[i].ItemName);
            $(".quantityInput").prop("disabled", true);
            $("#quantityInput" + i).val(items[i].Quantity);
            $(".priceInput").prop("disabled", true);
            $("#priceInput" + i).val(items[i].Price);
            $(".totalInput").prop("disabled", true);
            $("#totalInput" + i).val(items[i].Quantity * items[i].Price);
        }
    }
    else if (items.length == 0) {
        $("#itemTable").find("tr:gt(1)").remove(); //delete table except the first 2 rows
        $(".itemInput").val("");
    }
    /*if (numberOfRows > 1) {
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
    }*/
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
   
    $("#delivery")[0].style.backgroundColor = "lightgray";
    /*var img1 = document.createElement("img");
    img1.src = "style/add.png";
    $("#leftButton")[0].append(img1);
    */
    $(".priceInput").prop("disabled", true);

    $("#addRecordButton")[0].style.visibility = "visible";
    $("#rightButton")[0].style.visibility = "visible";

    $(".totalInput")[0].addEventListener("keydown", addRow);
    /*
    $("#leftButton")[0].setAttribute("title", "Add");
    $("#leftButton")[0].style.visibility = "visible";
    $("#rightButton")[0].style.visibility = "visible";
    */
    var elements = document.getElementsByTagName("input");
    for (var i = 0; i < elements.length; i++) {
        elements[i].value = "";
        var id = elements[i].id;
        if (id != "delivery") {
            elements[i].disabled = false;
        }
    }
   /* $("#leftButton")[0].addEventListener("click", function () {
        //$("#leftButton")[0].style.visibility = "hidden";
        //$("#rightButton")[0].style.visibility = "hidden";
        addDeliveryRecord();
    });*/

    $("#rightButton")[0].addEventListener("click", function () {
        clearDisplay();
    });
}

//add a new delivery record
function addDeliveryRecord() {
    var date = document.getElementById("date").value;
    var store = document.getElementById("store").value;
    var supplier = document.getElementById("supplier").value;
    var total = document.getElementById("totalValue").value;

    /*var itemNumberInput = document.getElementsByClassName("itemNumberInput");
    var totalCostInput = document.getElementsByClassName("totalCostInput");
    //there must be at least one item in a sale record
    var itemNumber = itemNumberInput[0].value;
    var totalCost = totalCostInput[0].value;
    */
    var nameInput = document.getElementsByClassName("nameInput");
    var quantityInput = document.getElementsByClassName("quantityInput");
    var priceInput = document.getElementsByClassName("priceInput");
    //there must be at least one item in a sale record
    var name = nameInput[0].value;
    var quantity = quantityInput[0].value;
    var price = priceInput[0].value;

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
    if (date == "" || store == "" || supplier == "" || name == "" || quantity == "" || price == ""|| total == "") {
        errorMessage.innerText = "Please input date, store, supplier and at least 1 item!";
    }
    else if (!(Number(store)) || !(Number(supplier)) || !(Number(total)) || !(Number(quantity)) || !(Number(price))) {
        errorMessage.innerText = "Please input the right format!";
    }
    else {
        errorMessage.innerText = "";
        check = true;
    }
    if (check) {
        var listOfItems = [];
        for (var i = 0; i < nameInput.length; i++) {
            var name = nameInput[i].value;
            var amount = quantityInput[i].value;
            var unitPrice = priceInput[i].value;
            if (name != "") {
                var item = { ItemName: name, Quantity: amount, Price: unitPrice };
                listOfItems.push(item);
            }
        }
        /*for (var i = 0; i < itemNumberInput.length; i++) {
            var itemNumber = itemNumberInput[i].value;
            var totalCost = totalCostInput[i].value;
            if (itemNumber != "") {
                var item = { ItemNumber: itemNumber, TotalCost: totalCost };
                listOfItems.push(item);
            }
        }*/
        var itemListString = JSON.stringify(listOfItems);
        DeliveryController.AddDeliveryRecord(date, store, supplier, Number(total), itemListString, onAddDeliveryRecord);
    }
}

function onAddDeliveryRecord(result) {
    if (result == "") {
        resultPopup("Successfully added to the database", "green");
        var elements = document.getElementsByTagName("input");
        for (var j = 0; j < elements.length; j++) {
            elements[j].value = "";
            var id = elements[j].id;
            if (id != "delivery") {
                elements[j].disabled = true;
            }
        }
        clearDisplay();
        getDeliveryRecords();
    }
    else {
        resultPopup("Failed to add a new record to the database!", "red");
    }
}

//edit delivery record
function editDeliveryDetails(delivery) {
    $("#leftImage").attr("src", "style/save.png");
    $("#leftButton")[0].style.visibility = "visible";
    $("#rightButton")[0].style.visibility = "visible";
    $("#delivery")[0].style.backgroundColor = "lightgray";

    $("#addRecordButton")[0].style.visibility = "hidden";

    var elements = document.getElementsByTagName("input");
    for (var i = 0; i < elements.length; i++) {
        var id = elements[i].id;
        //if (id == "date" || id == "store" || id == "supplier") {
        if (id != "delivery") {
            elements[i].disabled = false;
        }
    }
    $("#rightButton")[0].addEventListener("click", function () {
        displayDeliveryDetails(sale);
    });
    /*
    $("#leftButton")[0].addEventListener("click", function () {
        saveDeliveryDetails(delivery);
    });

    $("#rightButton")[0].addEventListener("click", function () {
        displayDeliveryDetails(delivery);
    });*/
}

function saveDeliveryDetails() {
    var id = document.getElementById("delivery").value;
    var date = document.getElementById("date").value;
    var store = document.getElementById("store").value;
    var supplier = document.getElementById("supplier").value;
    var total = document.getElementById("totalValue").value;

    var nameInput = document.getElementsByClassName("nameInput");
    var quantityInput = document.getElementsByClassName("quantityInput");
    var priceInput = document.getElementsByClassName("priceInput");

    var name = nameInput[0].value;
    var quantity = quantityInput[0].value;
    var price = priceInput[0].value;

    var check = false;
    var errorMessage = document.getElementById("error");
    if (date == "" || supplier == "" || store == "" || total == "" || name == "" || quantity == "" || price == "") {
        errorMessage.innerText = "Please input date, supplierID, and at least 1 item!";
    }
    else if (!(Number(store)) || !(Number(total)) || !(Number(quantity)) || !(Number(price))) {
        errorMessage.innerText = "Please input the right format!";
    }
    else {
        errorMessage.innerText = "";
        check = true;
    }

    if (check) {
        var listOfItems = [];
        for (var i = 0; i < nameInput.length; i++) {
            var name = nameInput[i].value;
            var amount = quantityInput[i].value;
            var unitPrice = priceInput[i].value;
            if (name != "") {
                var item = { ItemName: name, Quantity: parseInt(amount), Price: parseFloat(unitPrice) };
                listOfItems.push(item);
            }
        }
        var itemListString = JSON.stringify(listOfItems);
        DeliveryController.EditDeliveryDetails(Number(id), date, Number(store), Number(supplier), Number(total), itemListString, onEditDeliveryDetails);
    }
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
            if (id != "delivery") {
                elements[i].disabled = true;
            }
        }
    }
    else {
        resultPopup("Failed to edit record!", "red");
    }
}

function deleteDeliveryRecord() {
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

var j = 2;
function addRow(e) {
    if (e.keyCode == 13) { // 13 is enter
        alert("Pressed!");
        insertNewRow(j);
        j++;
    }
}

function insertNewRow(index) {
    var row = document.createElement("tr");
    var name = document.createElement("td");
    var nameInput = document.createElement("input");
    nameInput.setAttribute("type", "text");
    nameInput.setAttribute("class", "itemInput nameInput");
    nameInput.setAttribute("id", "nameInput" + index);
    nameInput.setAttribute("list", "itemName" + index);
    var datalist = document.createElement("datalist");
    datalist.setAttribute("id", "itemName" + index);
    name.appendChild(nameInput);
    name.appendChild(datalist);

    var quantity = document.createElement("td");
    var quantityInput = document.createElement("input");
    quantityInput.setAttribute("type", "text");
    quantityInput.setAttribute("class", "itemInput quantityInput");
    quantityInput.setAttribute("id", "quantityInput" + index);
    quantity.appendChild(quantityInput);

    var price = document.createElement("td");
    var priceInput = document.createElement("input");
    priceInput.setAttribute("type", "text");
    priceInput.setAttribute("class", "itemInput priceInput");
    priceInput.setAttribute("id", "priceInput" + index);
    price.appendChild(priceInput);

    for (var i = 0; i < itemList.length; i++) {
        var option = document.createElement("option");
        option.setAttribute("value", itemList[i].Name);
        option.setAttribute("id", i);
        datalist.appendChild(option);

    }
    nameInput.addEventListener("input", function () {
        var opt = $("option[value='" + $(this).val() + "']");
        var index = opt.attr("id");
        priceInput.value = itemList[index].Price;
    });

    var total = document.createElement("td");
    var totalInput = document.createElement("input");
    totalInput.setAttribute("type", "text");
    totalInput.setAttribute("class", "itemInput totalInput");
    totalInput.setAttribute("id", "totalInput" + index);
    totalInput.addEventListener("keydown", addRow);
    total.appendChild(totalInput);

    priceInput.addEventListener("input", multiply);
    quantityInput.addEventListener("input", multiply);
    function multiply() {
        var unitPrice = parseFloat(priceInput.value);
        var amount = parseInt(quantityInput.value);
        var result = unitPrice * amount;
        totalInput.value = result;
        var inputs = document.getElementsByClassName("totalInput");
        var totalValue = document.getElementById("totalValue");
        var sum = 0;
        for (var i = 0; i < inputs.length; i++) {
            sum += parseFloat(inputs[i].value);
        }
        totalValue.value = sum;
    }
    row.appendChild(name);
    row.appendChild(quantity);
    row.appendChild(price);
    row.appendChild(total);
    itemTable.appendChild(row);
}

function insertNewRows(index) {
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

    var quantity = document.createElement("td");
    var quantityInput = document.createElement("input");
    quantityInput.setAttribute("type", "text");
    quantityInput.setAttribute("class", "itemInput quantityInput");
    quantityInput.setAttribute("id", "quantityInput" + index);
    quantity.appendChild(quantityInput);

    var price = document.createElement("td");
    var priceInput = document.createElement("input");
    priceInput.setAttribute("type", "text");
    priceInput.setAttribute("class", "itemInput priceInput");
    priceInput.setAttribute("id", "priceInput" + index);
    price.appendChild(priceInput);

    for (var i = 0; i < itemList.length; i++) {
        var option = document.createElement("option");
        option.setAttribute("value", itemList[i].Name);
        option.setAttribute("id", i);
        datalist.appendChild(option);

    }
    nameInput.addEventListener("input", function () {
        var opt = $("option[value='" + $(this).val() + "']");
        var index = opt.attr("id");
        priceInput.value = itemList[index].Price;
    });

    var total = document.createElement("td");
    var totalInput = document.createElement("input");
    totalInput.setAttribute("type", "text");
    totalInput.setAttribute("class", "itemInput totalInput");
    totalInput.setAttribute("id", "totalInput" + index);
    totalInput.addEventListener("keydown", addRow);
    total.appendChild(totalInput);

    priceInput.addEventListener("input", multiply);
    quantityInput.addEventListener("input", multiply);
    function multiply() {
        var unitPrice = parseFloat(priceInput.value);
        var amount = parseInt(quantityInput.value);
        var result = unitPrice * amount;
        totalInput.value = result;
        var inputs = document.getElementsByClassName("totalInput");
        var totalValue = document.getElementById("totalValue");
        var sum = 0;
        for (var i = 0; i < inputs.length; i++) {
            sum += parseFloat(inputs[i].value);
        }
        totalValue.value = sum;
        var discount = document.getElementById("discountValue");
        var finalTotal = document.getElementById("finalValue");
        finalTotal.value = parseFloat(totalValue.value) - parseFloat(discount.value);
        discount.addEventListener("input", function () {
            finalTotal.value = parseFloat(totalValue.value) - parseFloat(discount.value)
        });
    }
    row.appendChild(name);
    row.appendChild(quantity);
    row.appendChild(price);
    row.appendChild(total);
    itemTable.appendChild(row);
    /*
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
    itemTable.appendChild(row);*/
}

function deleteRow() {
    var nameInput = document.getElementsByClassName("nameInput");
    var totalValue = document.getElementById("totalValue");
    for (var i = 0; i < nameInput.length; i++) {
        nameInput[i].addEventListener("input", checkValue);
        function checkValue() {
            if (this.value == "") {
                var totalInput = document.getElementsByClassName("totalInput");
                var sum = 0;

                var id = (this.id).substr(9, 10);
                var price = document.getElementById("priceInput" + id);
                var quantity = document.getElementById("quantityInput" + id);
                var total = document.getElementById("totalInput" + id);
                price.value = 0;
                quantity.value = 0;
                total.value = 0;

                for (var j = 0; j < totalInput.length; j++) {
                    sum += parseFloat(totalInput[j].value);
                }
                totalValue.value = sum;
            }
        }
    }
}

// removes any details that are displayed in the details section
function clearDisplay() {
    $("#addRecordButton")[0].style.visibility = "hidden";
    $("#detailHeading")[0].style.visibility = "hidden";
    $("#leftButton")[0].style.visibility = "hidden";
    $("#rightButton")[0].style.visibility = "hidden";
    $("#detailOptions")[0].style.visibility = "hidden";
    $("#details")[0].style.visibility = "hidden";
    $("#detailTable")[0].style.visibility = "hidden";
    $("#detailContainer")[0].style.visibility = "hidden";
}

function displayConfirmDelete() {
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
        //deleteItem(item.Id);
        deleteDeliveryRecord();
    });
    var img1 = document.createElement("img");
    img1.src = "style/delete.png";
    button1.append(img1);
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
    button2.append("Cancel");

    $("#results")[0].append("Are you sure you want to delete this record ");
    var span = document.createElement("span");
    span.style.fontWeight = "bold";
    span.append("permanently");
    $("#results")[0].append(span);
    $("#results")[0].append(" from the database?");
    $("#results")[0].append(br);
    $("#results")[0].append(br);
    $("#results")[0].append(button1);
    $("#results")[0].append(button2);
}

// closes the delete prompt
function closeDelete() {
    results.style.display = "none";
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