function getSaleRecords() {
    var keywords = document.getElementById("searchbar").value;
    SaleController.GetSaleRecords(keywords, onGetSaleRecords);
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
    $("#editSale")[0].addEventListener("click", function () {
        editSaleDetails(sale);
    });
    $("editSale").click();
    $("#sale")[0].style.backgroundColor = "white";
    
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


    $(strVar).insertAfter($("#detailTable").find("#customerIDRow"));

    var table = document.getElementById("myTable");
    var row = table.insertRow(1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    cell1.innerHTML = "NEW CELL1";
    cell2.innerHTML = "NEW CELL2";
}

function displayAddSaleRecord() {
    $("#detailHeading")[0].innerHTML = "";
    $("#detailHeading")[0].innerHTML = "Add a New Sale Record";
    $("#detailHeading")[0].style.visibility = "visible";
    $("#details")[0].style.visibility = "visible";
    $("#detailOptions")[0].style.visibility = "hidden";

    $("#leftImage").attr("src", "style/add.png");

    $("#sale")[0].style.backgroundColor = "lightgray";
    
    $("#leftButton")[0].setAttribute("title", "Add");
    $("#leftButton")[0].style.visibility = "visible";
    $("#rightButton")[0].style.visibility = "visible";

    //document.getElementById("detailTable").deleteRow(1);
    var elements = document.getElementsByTagName("input");
    for (var i = 0; i < elements.length; i++) {
        elements[i].value = "";
        var id = elements[i].id;
        if (id == "date" ||id == "customer" || id == "totalValue" || id == "discountValue" || id == "finalValue")
        {
            elements[i].disabled = false;
        }
    }
    calculate();
  
    $("#leftButton")[0].addEventListener("click", function () {
        //$("#leftButton")[0].style.visibility = "hidden";
        //$("#rightButton")[0].style.visibility = "hidden";
        addSaleRecord();
    });

    $("#rightButton")[0].addEventListener("click", function () {
        clearDisplay();
    });
}

//dynamic finalTotal calculation
function calculate() {
    var total = document.getElementById("totalValue");
    var discount = document.getElementById("discountValue");
    var finalTotal = document.getElementById("finalValue");
    total.addEventListener("input", substract);
    discount.addEventListener("input", substract);

    function substract() {
        var one = parseFloat(total.value);
        var two = parseFloat(discount.value);
        var substract = one - two;
        finalTotal.value = substract;
    }
}


// removes any details that are displayed in the details section
function clearDisplay() {
    $("#detailHeading")[0].style.visibility = "hidden";
    $("#details")[0].style.visibility = "hidden";
    $("#detailOptions")[0].style.visibility = "hidden";
    $("#leftButton")[0].style.visibility = "hidden";
    $("#rightButton")[0].style.visibility = "hidden";
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
}

//edit sale record
function editSaleDetails(sale) {
    $("#leftImage").attr("src", "style/save.png");
    $("#leftButton")[0].style.visibility = "visible";
    $("#rightButton")[0].style.visibility = "visible";
    $("#sale")[0].style.backgroundColor = "lightgray";

    calculate();
    //document.getElementById("detailTable").deleteRow(1);
    var elements = document.getElementsByTagName("input");
    for (var i = 0; i < elements.length; i++) {
        var id = elements[i].id;
        if (id == "date" || id == "customer" || id == "totalValue" || id == "discountValue" || id == "finalValue") {
            elements[i].disabled = false;
        }
    }
    $("#leftButton")[0].addEventListener("click", function () {
        saveSaleDetails();
    });
    
    $("#rightButton")[0].addEventListener("click", function () {
        //restore();
        displaySaleDetails(sale);
    });
}

function saveSaleDetails() {
    var id = document.getElementById("sale").value;
    var date = document.getElementById("date").value;
    var customer = document.getElementById("customer").value;
    var total = document.getElementById("totalValue").value;
    var discount = document.getElementById("discountValue").value;
    var final = document.getElementById("finalValue").value;

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
        deleteSaleRecord();
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

    $("#results")[0].append("Are you sure you want to delete this model ");
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

function deleteSaleRecord() {
    var id = document.getElementById("sale").value;
    SaleController.DeleteSaleRecord(Number(id), onDeleteSaleRecord);
}

function onDeleteSaleRecord(result) {
    if (result == "") {
        clearDisplay();
        resultPopup("Sale record was successfully deleted", "green");
        $("#leftButton")[0].style.visibility = "hidden";
        $("#rightButton")[0].style.visibility = "hidden";
        getSaleRecords();
    }
}

// closes the delete prompt
function closeDelete() {
    results.style.display = "none";
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
        getSaleRecords();
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
    /*document.getElementById("detailHeading").innerHTML = "Advanced Search";
    document.getElementById("details").innerHTML = "Here will be filter & sort settings for an advanced search!";*/
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