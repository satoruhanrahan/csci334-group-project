function getSaleRecords() {
    SaleController.GetSaleRecords(onGetSaleRecords);
}

//callback function
function onGetSaleRecords(result) {
    var sales = JSON.parse(result);
    displaySaleRecords(sales);
}

//display a list of sales
function displaySaleRecords(sales) {
    var list = document.getElementById("list");
    while (list.hasChildNodes()) {
        list.removeChild(list.lastChild);
    }
    for (var i = sales.length - 1; i >= 0; i--) {
        var button = document.createElement("button");
        button.setAttribute("class", "listItem");
        var date = new Date(parseInt((sales[i].Date).substr(6)));
        var formatedDate = date.toString().substr(4, 11);
        button.innerHTML = "Sale #" + sales[i].SaleID + "<br/>" + formatedDate;
        let sale = sales[i];
        button.addEventListener("click", function (event) {
            document.getElementById("details").style.visibility = "visible";
            event.preventDefault();
            displaySaleDetails(sale);
        });
        list.appendChild(button);
    }
}

//display sale details
function displaySaleDetails(sale) {
    $("#leftButton")[0].style.visibility = "hidden";
    $("#rightButton")[0].style.visibility = "hidden";
    $("#results")[0].style.display = "none";
    $("#detailOptions")[0].style.visibility = "visible";
    $("#details")[0].style.visibility = "visible";
    /*
    $("#editItem")[0].addEventListener("click", function () {
        editSaleDetails(sale);
    });
   $("#deleteItem")[0].addEventListener("click", function () {
        displayDeleteItem(item);
    });*/

    var date = new Date(parseInt((sale.Date).substr(6)));

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
    detailHeading.innerHTML = "Sale #" + sale.SaleID;
    document.getElementById("date").value = format;
    document.getElementById("sale").value = sale.SaleID;
    document.getElementById("customer").value = sale.CustomerID;
    document.getElementById("totalValue").value = sale.TotalValue;
    document.getElementById("discountValue").value = sale.Discount;
    document.getElementById("finalValue").value = sale.FinalTotal;
}

function displayAddSaleRecord() {
    $("#detailHeading")[0].innerHTML = "";
    $("#detailHeading")[0].innerHTML = "Add a New Sale Record";
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
        if (id == "date" ||id == "customer" || id == "totalValue" || id == "discountValue" || id == "finalValue")
        {
            elements[i].disabled = false;
        }
    }

    $("#leftButton")[0].addEventListener("click", function () {
        $("#leftButton")[0].style.visibility = "hidden";
        $("#rightButton")[0].style.visibility = "hidden";
        addSaleRecord();
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

//add a new sale record
function addSaleRecord() {
    var date = document.getElementById("date").value;
    var customer = document.getElementById("customer").value;
    var total = document.getElementById("totalValue").value;
    var discount = document.getElementById("discountValue").value;
    var final = document.getElementById("finalValue").value;

    var check = false;
    var errorMessage = document.getElementById("error");
    if (customer == "" || total == "" || discount == "" || final == "") {
        errorMessage.innerText = "No field is empty!";
    }
    else {
        errorMessage.innerText = "";
        check = true;
    }
    if (check == true) {
        SaleController.AddSaleRecord(date, customer, Number(total), Number(discount), Number(final), onAddSaleRecord);
    }
}

function onAddSaleRecord(result) {
    resultPopup("Successfully added to the database", "green");
    clearDisplay();
    getSaleRecords();
    // **todo: add single new button to list
}

//edit sale record
function editSaleDetails(sale) {
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
        if (id == "date" || id == "customer" || id == "totalValue" || id == "discountValue" || id == "finalValue") {
            elements[i].disabled = false;
        }
    }
    $("#leftButton")[0].addEventListener("click", function () {
        saveSaleDetails(sale);
    });
    
    $("#rightButton")[0].addEventListener("click", function () {
        restore();
    });
}

function saveSaleDetails() {
    var id = document.getElementById("sale").value;
    var date = document.getElementById("date").value;
    var customer = document.getElementById("customer").value;
    var total = document.getElementById("totalValue").value;
    var discount = document.getElementById("discountValue").value;
    var final = document.getElementById("finalValue").value;/**/

    //SaleController.EditSaleDetails(sale.SaleID, sale.Date, sale.CustomerID, sale.TotalValue, sale.Discount, sale.FinalTotal, onEditSaleDetails);
    SaleController.EditSaleDetails(Number(id), date, Number(customer), Number(total), Number(discount), Number(final), onEditSaleDetails);
}

function onEditSaleDetails(result) {
    if (parseJSON(result)) {
        var sale = JSON.parse(result);
        
        //clearDisplay();
        getSaleRecords();
        displaySaleDetails(sale);
        resultPopup("Successfully Edited", "green");
        $("#leftButton")[0].style.visibility = "hidden";
        $("#rightButton")[0].style.visibility = "hidden";
        var elements = document.getElementsByTagName("input");
        for (var i = 0; i < elements.length; i++) {
            var id = elements[i].id;
            if (id == "date" || id == "customer" || id == "totalValue" || id == "discountValue" || id == "finalValue") {
                elements[i].disabled = true;
            }
        }
    }
}

function deleteSaleRecord() {
    var id = document.getElementById("sale").value;
    SaleController.DeleteSaleRecord(Number(id), onDeleteSaleRecord);
}

function onDeleteSaleRecord(result) {
    if (result == "") {
        clearDisplay();
        resultPopup("Successfully deleted", "green");
        $("#leftButton")[0].style.visibility = "hidden";
        $("#rightButton")[0].style.visibility = "hidden";
        getSaleRecords();
    }
}

$(document).ready(function () {
    getSaleRecords();
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
        displayAddSaleRecord();
    });*/
});

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