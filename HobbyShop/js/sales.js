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

    for (var i = sales.length - 1; i >= 0; i--) {
        var button = document.createElement("button");
        button.setAttribute("class", "listItem");
        var date = new Date(parseInt((sales[i].Date).substr(6)));
        var formatedDate = date.toString().substr(4, 11);
        button.innerHTML = "Sale #" + sales[i].SaleID + "<br/>" + formatedDate;
        let sale = sales[i];
        button.addEventListener("click", function () {
            //document.getElementById("detailTable").style.visibility = "visible";
            displaySaleDetails(sale);
        });
        list.appendChild(button);
    }
}

function displaySaleDetails(sale) {
    var date = new Date(parseInt((sale.Date).substr(6)));
    var formatedDate = date.toString().substr(4, 11);
    //var detailHeading = document.getElementById("detailHeading");
    //detailHeading.innerHTML = "Sale #" + sale.SaleID + "<br/>" + formatedDate;

    $("#detailHeading")[0].innerHTML = "Sale #" + sale.SaleID + "<br/>" + formatedDate;
    $("#leftButton")[0].style.visibility = "hidden";
    $("#rightButton")[0].style.visibility = "hidden";
    $("#results")[0].style.display = "none";
    /*
    $("#itemID")[0].style.backgroundColor = "white";
    $("#itemAvailability")[0].style.backgroundColor = "white";
    $("#itemTotalStock")[0].style.backgroundColor = "white";
    */
    $("#detailHeading")[0].style.visibility = "visible";
    $("#detailOptions")[0].style.visibility = "visible";
    $("#details")[0].style.visibility = "visible";
    
    $("#editSale")[0].addEventListener("click", function () {
        editSaleDetails(sale);
    });
    $("#deleteSale")[0].addEventListener("click", function () {
        displayDeleteSale(sale);
    });
    
    $("#saleDate")[0].innerHTML = formatedDate;
    $("#saleID")[0].innerHTML = sale.SaleID;
    $("#total")[0].innerHTML = sale.TotalValue;
    $("#discount")[0].innerHTML = sale.Discount;
    $("#final")[0].innerHTML = sale.FinalTotal;
    /*-------
    document.getElementById("saleDate").innerText = sale.Date;
    document.getElementById("saleID").innerText = sale.SaleID;
    document.getElementById("total").innerText = sale.TotalValue;
    document.getElementById("discount").innerText = sale.Discount;
    document.getElementById("final").innerText = sale.FinalTotal;-----------------*/
}
/*
window.onload = function () {
    getSaleRecords();
}*/

// on Page load...
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
    $("#addButton")[0].addEventListener("click", function () {
        displayAddSale();
    });
});

//Advanced search display
function displayAdvSearch() {
    document.getElementById("detailHeading").innerHTML = "Advanced Search";
    document.getElementById("details").innerHTML = "Here will be filter & sort settings for an advanced search!";
}
