// on Page load...
$(document).ready(function () {
    // display all customers
    var customers;
    var searchedCustomers;
    getAllSearchedCustomers();
    // prevent form submission on enter
    $('form').keypress(function (event) {
        return event.keyCode != 13;
    });
    // Search as the user types
    var searchbar = $("#searchbar")[0];
    searchbar.addEventListener("keyup", function (event) {
        event.preventDefault();
        getAllSearchedCustomers();
    });
    $("#advSearch")[0].addEventListener("click", function () {
        displayAdvSearch();
    });
    $("#addButton")[0].addEventListener("click", function () {
        displayAddCustomer();
    });
});

// Display customers in list based on search
function getAllSearchedCustomers() {
    var searchInput = document.getElementById("searchbar").value;
    CustomerController.Search(searchInput, onSearchCustomers);
}

function onSearchCustomers(result) {
    customers = JSON.parse(result);
   // console.log(customers);
    displayCustomerNames(customers);
}

//Advanced search display
function displayAdvSearch() {
    clearDisplay();
    $("#detailHeading")[0].style.visibility = "visible";
    $("#detailHeading")[0].innerHTML = "Advanced Search";
}

function getOrderRecords(customerID) {
    CustomerController.GetOrderRecords(customerID, onGetOrderRecords);
}

function onGetOrderRecords(result) {
    if (parseJSON(result)) {
        var orders = JSON.parse(result);
        displaySaleRecords(orders);
        //displayCustomerOrders(orders);
    }
}
//display a list of sales
function displaySaleRecords(orders) {
    //clearDisplay();
    var test = document.getElementById("test");
    while (test.hasChildNodes()) {
        test.removeChild(test.lastChild);
    }
    for (var i = orders.length - 1; i >= 0; i--) {
        var button = document.createElement("button");
        button.setAttribute("class", "listItem bigList");
        var date = new Date(parseInt((orders[i].Date).substr(6)));
        var formatedDate = date.toString().substr(4, 11);
        button.innerHTML = "Sale #" + orders[i].SaleID + "<br/>" + formatedDate;
        let order = orders[i];
        button.addEventListener("click", function () {
            loadPage("Sales", order);
        });
        $("#test")[0].append(button);
    }
}

function displayCustomerOrders(order) {
    $("#addRecordButton")[0].style.visibility = "hidden";
    $("#leftButton")[0].style.visibility = "hidden";
    $("#rightButton")[0].style.visibility = "hidden";
    $("#results")[0].style.display = "none";
    $("#detailOptions")[0].style.visibility = "visible";
    $("#details")[0].style.visibility = "visible";
    $("#detailTable")[0].style.visibility = "visible";

    $("#sale")[0].style.backgroundColor = "white";
    /*
    var itemInputs = document.getElementsByClassName("itemInput");
    for (var i = 0; i < itemInputs.length; i++) {
        itemInputs[i].disabled = true;
    }
    */
    //document.getElementById("error").innerText = "";
    var date = new Date(parseInt((order.Date).substr(6)));

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
    detailHeading.innerHTML = "Sale #" + order.SaleID;
    document.getElementById("date").value = format;
    document.getElementById("sale").value = order.SaleID;
    //document.getElementById("customer").value = order.CustomerID;
    document.getElementById("store").value = order.StoreID;
    document.getElementById("totalValue").value = order.TotalValue;
    document.getElementById("discountValue").value = order.Discount;
    document.getElementById("finalValue").value = order.FinalTotal;
    var items = order.Items;

    var itemTable = document.getElementById("itemTable");
    var numberOfRows = itemTable.rows.length;

    if (items.length > 0 && numberOfRows >= 2) {
        $("#itemTable").find("tr:gt(0)").remove();
        for (var i = 0; i < items.length; i++) {
            var row = document.createElement("tr");
            var name = document.createElement("td");
            name.innerHTML = items[i].ItemName;
            var quantity = document.createElement("td");
            quantity.innerHTML = items[i].Quantity;
            var price = document.createElement("td");
            price.innerHTML = items[i].Price;
            var total = document.createElement("td");
            total.innerHTML = items[i].Quantity * items[i].Price;

            row.appendChild(name);
            row.appendChild(quantity);
            row.appendChild(price);
            row.appendChild(total);
            itemTable.appendChild(row);
        }
    }
    else if (items.length == 0) {
        $("#itemTable").find("tr:gt(1)").remove(); //delete table except the first 2 rows
        $(".itemInput").val("");
    }
}

// Creates and displays a list of buttons representing customers in the inventory. 
function displayCustomerNames(customers) {
    $("#list")[0].innerHTML = "";
    var button;
    for (var i = customers.length - 1; i >= 0; i--) {
        button = document.createElement("button");
        button.append(customers[i].Name);
        button.setAttribute("id", customers[i].Id);
        button.setAttribute("type", "button");
        button.setAttribute("class", "listItem");
        let customer = customers[i];
        button.addEventListener("click", function () {
            displayCustomerDetails(customer);
        });
        $("#list")[0].append(button);
    }
}

// Displays an customers details
function displayCustomerDetails(customer) {
    //console.log(customer);
    // set display

    //clearDisplay();
    var test = document.getElementById("test");
    while (test.hasChildNodes()) {
        test.removeChild(test.lastChild);
    }
    /*
    var detailTable = document.createElement("table");
    detailTable.setAttribute("class", "detailTable");

    var idRow = document.createElement("tr");
    var idLabel = document.createElement("td");
    idLabel.setAttribute("id", "firstcell");
    idLabel.innerHTML = "Customer Number";
    var idVal = document.createElement("td");
    idVal.setAttribute("id", "customerID");
    idRow.appendChild(idLabel);
    idRow.appendChild(idVal);

    var nameRow = document.createElement("tr");
    var nameLabel = document.createElement("td");
    nameLabel.setAttribute("id", "customerName");
    nameLabel.innerHTML = "Name";
    var nameInput = document.createElement("input");
    nameInput.setAttribute("id", "customerNameInput");
    nameInput.disabled = true;
    var nameVal = document.createElement("td");
    nameVal.setAttribute("id", "customerID");
    nameVal.appendChild(nameInput);
    nameRow.appendChild(nameLabel);
    nameRow.appendChild(nameVal);
    */

    switchTabs("detailTabBar", "detailsTab");
    $("#detailHeading")[0].innerHTML = customer.Name;
    $("#detailHeading")[0].style.visibility = "visible";
    $("#detailOptions")[0].style.visibility = "visible";
    $("#details")[0].style.visibility = "visible";
    $("#detailTabBar")[0].style.visibility = "visible";
    $("body").off("click", "#detailsTab");
    $("body").off("click", "#interestsTab");
    $("body").off("click", "#ordersTab");
    $("body").on("click", "#detailsTab", function () {
        switchTabs("detailTabBar", "detailsTab");
        displayCustomerDetails(customer);
    });
    $("body").on("click", "#interestsTab", function () {
        switchTabs("detailTabBar", "interestsTab");
        //displayCustomerInterests(customer);
    });
    $("body").on("click", "#ordersTab", function () {
        switchTabs("detailTabBar", "ordersTab");
        getOrderRecords(customer.Id);
    });
    $("#editCustomer")[0].addEventListener("click", function () {
        editCustomerDetails(customer);
    });
    $("#deleteCustomer")[0].addEventListener("click", function () {
        displayDeleteCustomer(customer);
    });
    if (customer.JoinDate != null) {
        var date = new Date(parseInt((customer.JoinDate).substr(6)));

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
        $("#customerJoinDateInput")[0].value = format;
    }
    else {
        $("#customerJoinDateInput")[0].value.toString = "Not applicable"; // I don't really know how to convert this since u've set the attribute as datetime
    }

    activeItem(customer.Id);



    $("#customerID")[0].innerHTML = customer.Id;
    $("#customerNameInput")[0].value = customer.Name;
    $("#customerAddressInput")[0].value = customer.Address;
    $("#customerPhoneNoInput")[0].value = customer.Phone;
    
    $("#customerCreditLineInput")[0].value = customer.CreditLine;
    $("#customerBalInput")[0].value = customer.Balance;
    $("#customerMemberStatusInput")[0].value = customer.MemberStatus; // I already make a controller call that returns every member status in ClubMemberStatus table which is ReturnMemberStatusList()
    $("#customerEmailInput")[0].value = customer.Email;
}

// Edit details
function editCustomerDetails(customer) {
    clearDisplay();
    $("#detailHeading")[0].style.visibility = "visible";
    $("#details")[0].style.visibility = "visible";
    $("#detailTabBar")[0].style.visibility = "visible";
    $("#leftButton")[0].style.visibility = "visible";
    $("#rightButton")[0].style.visibility = "visible";
    $("#customerID")[0].style.backgroundColor = "lightgrey";
    $("#detailHeading")[0].append(customer.Name);

    $("#customerNameInput").removeAttr("disabled");
    $("#customerAddressInput").removeAttr("disabled");
    $("#customerPhoneNoInput").removeAttr("disabled");
    $("#customerBalInput").removeAttr("disabled");
    $("#customerCreditLineInput").removeAttr("disabled");
    $("#customerMemberStatusInput").removeAttr("disabled");
    $("#customerJoinDateInput").removeAttr("disabled");
    $("#customerEmailInput").removeAttr("disabled");

    $("#customerNameInput")[0].value = customer.Name;
    $("#customerAddressInput")[0].value = customer.Address;
    $("#customerPhoneNoInput")[0].value = customer.Phone;
    $("#customerBalInput")[0].value = customer.Balance;
    $("#customerCreditLineInput")[0].value = customer.CreditLine;
    $("#customerMemberStatusInput")[0].value = customer.MemberStatus;
    $("#customerJoinDateInput")[0].value = customer.JoinDate;
    $("#customerEmailInput")[0].value = customer.Email;

    $("#customerID")[0].append(customer.Id);

    var img1 = document.createElement("img");
    img1.src = "style/save.png";

    $("#leftButton")[0].innerHTML = "";
    $("#leftButton")[0].append(img1);
    $("body").on("click", "#leftButton", function () {
        updateCustomer(customer);
    });
    $("body").on("click", "#rightButton", function () {
        displayCustomerDetails(customer);
    });
}

// Send edited data to controller
function updateCustomer(customer) {
    if (validateInput()) {
        var id = customer.Id;
        var name = $("#customerNameInput")[0].value;
        var address = $("#customerAddressInput")[0].value;
        var phone = $("#customerPhoneNoInput")[0].value;
        var credit = $("#customerCreditLineInput")[0].value;
        var balance = $("#customerBalInput")[0].value;
        var member = $("#customerMemberStatusInput")[0].value;
        var date = $("#customerJoinDateInput")[0].value;
        var email = $("#customerEmailInput")[0].value;
        CustomerController.updateCustomer();
    }
}

function onUpdateCustomer(customer) {
    customer = JSON.parse(customer);
    console.log(customer);
    var newcustomer = {
        "Id": customer.Id,
        "Name": $("#customerNameInput")[0].value,
        "Address": $("#customerAddressInput")[0].value,
        "CreditLine": $("#customerCreditLineInput")[0].value,
        "PhoneNo": $("#customerPhoneNoInput")[0].value,
        "MemberStatus": $("#customerMemberStatusInput")[0].value,
        "JoinDate": $("#customerJoinDateInput")[0].value,
        "Email": $("#customerEmailInput")[0].value
    }
    //  Refreshes the updated button 
    $("#" + newcustomer.Id)[0].innerHTML = newcustomer.Name;
    $("#" + newcustomer.Id)[0].addEventListener("click", function () {
        displayCustomerDetails(newcustomer);
    });
    displayCustomerDetails(newcustomer);
    resultPopup("Successfully updated customer in the Database.", "green");
}

//displays the delete model prompt
function displayDeleteCustomer(customer) {
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
        deleteCustomer(customer.Id);
    });
    var img1 = document.createElement("img");
    img1.src = "style/delete.png";
    button1.append(img1);
    button1.append(br);
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
    button2.append(br.cloneNode());
    button2.append("Cancel");

    $("#results")[0].append("Are you sure you want to delete this model ");
    var span = document.createElement("span");
    span.style.fontWeight = "bold";
    span.append("permanently");
    $("#results")[0].append(span);
    $("#results")[0].append(" from the database?");
    $("#results")[0].append(br.cloneNode());
    $("#results")[0].append(br.cloneNode());
    $("#results")[0].append(button1);
    $("#results")[0].append(button2);
}

// sends id of customer to be deleted to controller
function deleteCustomer(id) {
    results.style.display = "none";
    CustomerController.Delete(id, onDeleteCustomer);
}

function onDeleteCustomer(id) {
    clearDisplay();
    activeItem("");
    // remove corresponding button from list
    $("#" + id)[0].remove();
    resultPopup("Customer was successfully removed.", "green");
}

// closes the delete prompt
function closeDelete() {
    results.style.display = "none";
}

// removes any details that are displayed in the details section
function clearDisplay() {
    $("#detailContainer")[0].style.visibility = "hidden";
    $("#detailTable")[0].style.visibility = "hidden";
    $("#addRecordButton")[0].style.visibility = "hidden";
    
    $("#detailHeading")[0].innerHTML = "";
    $("#interests")[0].style.visibility = "hidden"
    $("#orders")[0].style.visibility = "hidden"
    $("#detailHeading")[0].style.visibility = "hidden";
    $("#details")[0].style.visibility = "hidden";
    $("#detailOptions")[0].style.visibility = "hidden";
    $("#leftButton")[0].style.visibility = "hidden";
    $("#rightButton")[0].style.visibility = "hidden";
    $("#detailTabBar")[0].style.visibility = "hidden";

    $("#results")[0].style.display = "none";
    $("#customerID")[0].style.backgroundColor = "white";
    $("#customerNameInput")[0].style.backgroundColor = "white";
    $("#customerAddressInput")[0].style.backgroundColor = "white";
    $("#customerID")[0].innerHTML = "";
    $("#customerNameInput")[0].innerHTML = "";
    $("#customerAddressInput")[0].innerHTML = "";
    $("#interests")[0].innerHTML = "";
    $("#orders")[0].innerHTML = "";
    $("#customerPhoneNoInput").value = "";
    $("#customerID")[0].innerHTML = "";
    $("#customerCreditLineInput").value = "";
    $("#customerBalInput").value = "";
    $("#customerMemberStatusInput").value = "";
    $("#customerJoinDateInput")[0].value = "";
    $("#customerEmailInput")[0].value = "";
    /*$("#itemSbjAreaInput")[0].value = "";
    $("#itemPriceInput")[0].value = "";
    $("#itemDescriptionInput")[0].value = "";
    $("#itemDescriptionInput").value = "";
    $("#itemNameInput").attr({ "disabled": "disabled" });
    $("#itemTypeInput").attr({ "disabled": "disabled" });
    $("#itemSbjAreaInput").attr({ "disabled": "disabled" });
    $("#itemPriceInput").attr({ "disabled": "disabled" });
    $("#itemDescriptionInput").attr({ "disabled": "disabled" });*/
    $("body").off("click", "#leftButton");
    $("body").off("click", "#rightButton");
}

//Add new customer to model table
function displayAddCustomer() {
    //reset detail display to have correct elements for this menu.
    clearDisplay();
    $("#detailHeading")[0].innerHTML = "Add a New Customer";
    $("#detailHeading")[0].style.visibility = "visible";
    $("#details")[0].style.visibility = "visible";
    $("#detailTabBar")[0].style.visibility = "visible";
    $("#leftButton")[0].style.visibility = "visible";
    $("#rightButton")[0].style.visibility = "visible";
    $("#customerID")[0].style.backgroundColor = "lightgrey";
    activeItem("");

    $("#customerNameInput").removeAttr("disabled");
    $("#customerAddressInput").removeAttr("disabled");
    $("#customerPhoneNoInput").removeAttr("disabled");
    $("#customerCreditLineInput").removeAttr("disabled");
    $("#customerBalInput").removeAttr( "disabled" );
    $("#customerMemberStatusInput").removeAttr("disabled");
    $("#customerJoinDateInput").removeAttr("disabled");
    $("#customerEmailInput").removeAttr("disabled");

    // set details for left button
    var img1 = document.createElement("img");
    img1.src = "style/add.png";
    $("#leftButton")[0].innerHTML = "";
    $("#leftButton")[0].append(img1);
    $("body").on("click", "#leftButton", addNewCustomer);
    $("body").on("click", "#rightButton", clearDisplay);
}

function validateInput() {
    var name = $("#customerNameInput")[0].value;
    var address = $("#customerAddressInput")[0].value;
    var phoneno = $("#customerPhoneNoInput")[0].value;
    var status = $("#customerMemberStatusInput")[0].value;
    
    if (name === '' || address === '' || phoneno === '' || status === '' ) {
        alert("Please input: Name, Address, Phone number or Membership status!");
        return false;
    }
    else {
        return true;
    }
}

// Sends input to controller
function addNewCustomer() {
    if (validateInput()) {
        CustomerController.Add(
            $("#customerNameInput")[0].value,
            $("#customerAddressInput")[0].value,
            $("#customerPhoneNoInput")[0].value,
            $("#customerCreditLineInput")[0].value,
            $("#customerBalInput")[0].value,
            $("#customerMemberStatusInput")[0].value,
            $("#customerJoinDateInput")[0].value,
            $("#customerEmailInput")[0].value,
            onAddNewCustomer
        );
        console.log($("#customerNameInput")[0].value,
            $("#customerAddressInput")[0].value,
            $("#customerPhoneNoInput")[0].value,
            $("#customerCreditLineInput")[0].value,
            $("#customerBalInput")[0].value,
            $("#customerMemberStatusInput")[0].value,
            $("#customerJoinDateInput")[0].value,
            $("#customerEmailInput")[0].value);
    }
}

function onAddNewCustomer(result) {
    console.log(result);
    clearDisplay();
    getAllSearchedCustomers();
    resultPopup("Successfully added to the database.", "green");
}

function displayCustomerInterests(customer) {
    CustomerController.ReturnItems(customer.Id, onDisplayCustomerItems);
}

function onDisplayCustomerInterests(result) {
    // set display
    var name = $("#detailHeading")[0].innerHTML;
    clearDisplay();
    $("#detailHeading")[0].innerHTML = name;
    $("#detailHeading")[0].style.visibility = "visible";
    $("#detailTabBar")[0].style.visibility = "visible";
    $("#items")[0].style.visibility = "visible";

    var interests = JSON.parse(result);
    $("#itemTypeInput")[0].value = interests.Type;
    $("#itemSbjAreaInput")[0].value = interests.SbjArea;
}


function displayCustomerOrders(customer) {
    CustomerController.ReturnCorrespondingContacts(customer.Id, onDisplayCustomerContacts);

}
function onDisplayCustomerOrders(result) {
    var orders = JSON.parse(result);
    // set display
    var name = $("#detailHeading")[0].innerHTML;
    clearDisplay();
    $("#detailHeading")[0].innerHTML = name;
    $("#detailHeading")[0].style.visibility = "visible";
    $("#detailTabBar")[0].style.visibility = "visible";
    $("#contacts")[0].style.visibility = "visible";

    var button;
    for (var i = orders.length - 1; i >= 0; i--) {
        button = document.createElement("button");
        br = document.createElement("br");
        button.append(orders[i].Name);
        button.append(br);
        button.append(orders[i].FinalTotal);
        button.setAttribute("type", "button");
        button.setAttribute("class", "listItem bigList");
        let order = orders[i];
        button.addEventListener("click", function () {
            loadPage("Orders", order);
        });
        $("#contacts")[0].append(button);
    }
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