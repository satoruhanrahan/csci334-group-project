// on Page load...
$(document).ready(function () {
    // display all customers
    var customers;
    var customerGlobal;
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
    displayCustomerNames(customers);
}

//Advanced search display
function displayAdvSearch() {
    clearDisplay();
    $("#detailHeading")[0].style.visibility = "visible";
    $("#detailHeading")[0].innerHTML = "Advanced Search";
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
            customerGlobal = customer;
        });
        $("#list")[0].append(button);
    }
}

// Displays an customers details
function displayCustomerDetails(customer) {
    // set display
    clearDisplay();
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
        getInterests(customer);
    });
    $("body").on("click", "#ordersTab", function () {
        switchTabs("detailTabBar", "ordersTab");
        getOrderRecords(customer.Id);
        //displayCustomerOrders(customer);
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

    activeItem(customer.Id);

    $("#customerID")[0].innerHTML = customer.Id;
    $("#customerNameInput")[0].value = customer.Name;
    $("#customerAddressInput")[0].value = customer.Address;
    $("#customerPhoneNoInput")[0].value = customer.Phone;

    $("#customerCreditLineInput")[0].value = customer.CreditLine;
    $("#customerBalInput")[0].value = customer.Balance;
    $("#customerMemberStatusInput")[0].value = customer.MemberStatus;
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
        CustomerController.UpdateCustomer(Number(id), name, address, phone, Number(credit), Number(balance), member, date, email, onUpdateCustomer);
    }
}

function onUpdateCustomer(result) {
    var customer = JSON.parse(result);
    var newcustomer = {
        "Id": customer.Id,
        "Name": $("#customerNameInput")[0].value,
        "Address": $("#customerAddressInput")[0].value,
        "Phone": $("#customerPhoneNoInput")[0].value,
        "CreditLine": $("#customerCreditLineInput")[0].value,
        "Balance": $("#customerBalInput")[0].value,
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
    $("#customerNameInput")[0].value = "";
    $("#customerAddressInput")[0].value = "";
    $("#customerPhoneNoInput")[0].value = "";
    $("#customerCreditLineInput")[0].value = "";
    $("#customerMemberStatusInput")[0].value = "";
    $("#customerBalInput")[0].value = "";
    $("#customerJoinDateInput")[0].value = "";
    $("#customerEmailInput")[0].value = "";
    $("#customerNameInput").attr({ "disabled": "disabled" });
    $("#customerAddressInput").attr({ "disabled": "disabled" });
    $("#customerPhoneNoInput").attr({ "disabled": "disabled" });
    $("#customerCreditLineInput").attr({ "disabled": "disabled" });
    $("#customerBalInput").attr({ "disabled": "disabled" });
    $("#customerMemberStatusInput").attr({ "disabled": "disabled" });
    $("#customerJoinDateInput").attr({ "disabled": "disabled" });
    $("#customerEmailInput").attr({ "disabled": "disabled" });

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
    $("#customerBalInput").removeAttr("disabled");
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
    var date = $("#customerJoinDateInput")[0].value;
    if (name === '' || address === '' || date === '' || status === '') {
        alert("Please input: Name, Address, Phone number, Membership status or Join Date!");
        return false;
    }
    else {
        return true;
    }
}

// Sends input to controller
function addNewCustomer() {
    if (validateInput()) {
        var date = $("#customerJoinDateInput")[0].value;
        if (date == undefined) {
            date = null;
        }
        CustomerController.Add(
            $("#customerNameInput")[0].value,
            $("#customerAddressInput")[0].value,
            $("#customerPhoneNoInput")[0].value,
            $("#customerCreditLineInput")[0].value,
            $("#customerBalInput")[0].value,
            $("#customerMemberStatusInput")[0].value,
            date,
            $("#customerEmailInput")[0].value,
            onAddNewCustomer
        );
    }
}

function onAddNewCustomer(result) {
    clearDisplay();
    getAllSearchedCustomers();
    resultPopup("Successfully added to the database.", "green");
}

function getInterests(customer) {

    CustomerController.ReturnInterest(customer.Id, onGetInterest);
}

function onGetInterest(result) {
    console.log(result);
    if (parseJSON(result)) {
        var interests = JSON.parse(result);
        displayCustomerInterests(interests);
        console.log(interests);
    }
}
function displayCustomerInterests(interests) {
    var name = $("#detailHeading")[0].innerHTML;
    clearDisplay();
    $("#detailHeading")[0].innerHTML = name;
    $("#detailHeading")[0].style.visibility = "visible";
    $("#detailTabBar")[0].style.visibility = "visible";
    $("#interests")[0].style.visibility = "visible";

    for (var i = interests.length - 1; i >= 0; i--) {
        var content = document.createElement("div");

        content.innerHTML = "Type: " + interests[i].Type + ", Subject Area: " + interests[i].Sbj;
        let interest = interests[i];


        var img1 = document.createElement("img");
        img1.src = "style/delete.png";
        button2 = document.createElement("button");
        button2.append(img1);
        button2.setAttribute("type", "button");
        button2.setAttribute("class", "smallbtn redbtn");
        button2.style.cssFloat = "right";
        content.append(button2);
        button2.addEventListener("click", function () {
            removeInterest(customerGlobal.Id, interest.Type, interest.Sbj);
        });
        $("#interests")[0].append(content);

    }
}
function removeInterest(id, type, sbj) {
    CustomerController.RemoveInterest(id, type, sbj, onRemoveInterest);

}
function onRemoveInterest(result) {
    clearDisplay();
    getAllSearchedCustomers();
    resultPopup("Successfully remove interest from the database.", "green");
}
function getOrderRecords(customerID) {
    CustomerController.GetOrderRecords(customerID, onGetOrderRecords);
}

function onGetOrderRecords(result) {
    if (parseJSON(result)) {
        var orders = JSON.parse(result);
        displaySaleRecords(orders);
    }
}

//display a list of sales
function displaySaleRecords(orders) {
    var name = $("#detailHeading")[0].innerHTML;
    clearDisplay();
    $("#detailHeading")[0].innerHTML = name;
    $("#detailHeading")[0].style.visibility = "visible";
    $("#detailTabBar")[0].style.visibility = "visible";
    $("#orders")[0].style.visibility = "visible";
    for (var i = orders.length - 1; i >= 0; i--) {
        var button = document.createElement("button");
        button.setAttribute("class", "listItem bigList");
        var date = new Date(parseInt((orders[i].Date).substr(6)));
        var formatedDate = date.toString().substr(4, 11);
        button.innerHTML = "Sale #" + orders[i].SaleID + "<br/>" + formatedDate;
        let order = orders[i];
        button.addEventListener("click", function () {
            event.preventDefault();
            loadPage("Sales", order);
        });
        $("#orders")[0].append(button);
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