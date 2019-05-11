// on Page load...
$(document).ready(function () {
    getDeliveryRecords();
    // prevent form submission on enter
    $('form').keypress(function (event) {
        return event.keyCode != 13;
    });
    // Search as the user types
    var searchbar = $("#searchbar")[0];
    searchbar.addEventListener("keyup", function (event) {
        event.preventDefault();
        //getAllSearchedItems();
    });
    $("#advSearch")[0].addEventListener("click", function () {
        displayAdvSearch();
    });
    /*$("#addButton")[0].addEventListener("click", function () {
        displayAddDeliveryRecord();
    });*/
});

function getDeliveryRecords() {
    DeliveryController.GetDeliveryRecords(onGetDeliveryRecords);
}

//callback function
function onGetDeliveryRecords(result) {
    var deliveries = JSON.parse(result);
    displayDeliveryRecords(deliveries);
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
            event.preventDefault();
            displayDeliveryDetails(delivery);
        });
        list.appendChild(button);
    }
}

//display delivery details
function displayDeliveryDetails(delivery) {
    $("#leftButton")[0].style.visibility = "hidden";
    $("#rightButton")[0].style.visibility = "hidden";
    $("#results")[0].style.display = "none";
    $("#detailOptions")[0].style.visibility = "visible";
    $("#details")[0].style.visibility = "visible";
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
}

function displayAddDeliveryRecord() {
    $("#detailHeading")[0].innerHTML = "";
    $("#detailHeading")[0].innerHTML = "Add a New Delivery Record";
    $("#detailHeading")[0].style.visibility = "visible";
    $("#details")[0].style.visibility = "visible";
    $("#detailOptions")[0].style.visibility = "hidden";

    $("#leftImage").attr("src", "style/add.png");

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
        addDeliveryRecord();
    });

    $("#rightButton")[0].addEventListener("click", function () {
        clearDisplay();
    });
}

// removes any details that are displayed in the details section
function clearDisplay() {
    $("#detailHeading")[0].style.visibility = "hidden";
    $("#details")[0].style.visibility = "hidden";
    $("#detailOptions")[0].style.visibility = "hidden";
}

//add a new delivery record
function addDeliveryRecord() {
    var date = document.getElementById("date").value;
    var store = document.getElementById("store").value;
    var supplier = document.getElementById("supplier").value;

    var check = false;
    var errorMessage = document.getElementById("error");
    if (store == "" || supplier == "") {
        errorMessage.innerText = "Input missing from field!";
    }
    else {
        errorMessage.innerText = "";
        check = true;
    }
    if (check == true) {
        DeliveryController.AddDeliveryRecord(date, store);
        onAddDeliveryRecord();
    }
}

function onAddDeliveryRecord() {
    resultPopup("Successfully added to the database", "green");
    clearDisplay();
    $("#leftButton")[0].style.visibility = "hidden";
    $("#rightButton")[0].style.visibility = "hidden";
    getDeliveryRecords();
    // **todo: add single new button to list
}

//edit delivery record
function editDeliveryDetails(delivery) {
    //document.getElementById("left").src = "style/save.png";
    $("#leftImage").attr("src", "style/save.png");
    /*var img1 = document.createElement("img");
    img1.src = "style/save.png";
    $("#leftButton")[0].append(img1);
    */

    $("#leftButton")[0].style.visibility = "visible";
    $("#rightButton")[0].style.visibility = "visible";
    var elements = document.getElementsByTagName("input");
    for (var i = 0; i < elements.length; i++) {
        var id = elements[i].id;
        if (id == "date" || id == "store" || id == "supplier") {
            elements[i].disabled = false;
        }
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

    DeliveryController.EditDeliveryDetails(Number(id), date, Number(store), Number(supplier), onEditDeliveryDetails);
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

//Advanced search display
function displayAdvSearch() {
    document.getElementById("detailHeading").innerHTML = "Advanced Search";
    document.getElementById("details").innerHTML = "Here will be filter & sort settings for an advanced search!";
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