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
        //displayCustomerInterests(customer);
    });
    $("body").on("click", "#ordersTab", function () {
        switchTabs("detailTabBar", "ordersTab");
        //displayCustomerOrders(customer);
    });
    $("#editCustomer")[0].addEventListener("click", function () {
        editCustomerDetails(customer);
    });
    $("#deleteCustomer")[0].addEventListener("click", function () {
        displayDeleteCustomer(customer);
    });

    activeItem(customer.Id);
    $("#customerNameInput")[0].value = customer.Name;
    $("#customerID")[0].innerHTML = customer.Id;
    $("#customerAddressInput")[0].value = customer.Address;
    $("#customerCreditLine")[0].innerHTML = customer.CreditLine;
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
    $("#customerCreditLine")[0].style.backgroundColor = "lightgrey";
    $("#detailHeading")[0].append(customer.Name);

    $("#customerNameInput").removeAttr("disabled");
    $("#customerAddressInput").removeAttr("disabled");

    $("#customerNameInput")[0].value = customer.Name;
    $("#customerAddressInput")[0].value = customer.Address;

    $("#customerID")[0].append(customer.Id);
    $("#customerCreditLine")[0].append(customer.CreditLine);

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
        CustomerController.Update(
            customer.Id,
            $("#customerNameInput")[0].value,
            $("#customerAddressInput")[0].value,
            customer.CreditLine,
            onUpdateCustomer
        );
    }
}

function onUpdateCustomer(customer) {
    customer = JSON.parse(customer);
    var newcustomer = {
        "Id": customer.Id,
        "Name": $("#customerNameInput")[0].value,
        "Address": $("#customerAddressInput")[0].value,
        "CreditLine": customer.CreditLine
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
    $("#items")[0].style.visibility = "hidden"
    $("#contacts")[0].style.visibility = "hidden"
    $("#detailHeading")[0].style.visibility = "hidden";
    $("#details")[0].style.visibility = "hidden";
    $("#detailOptions")[0].style.visibility = "hidden";
    $("#leftButton")[0].style.visibility = "hidden";
    $("#rightButton")[0].style.visibility = "hidden";
    $("#detailTabBar")[0].style.visibility = "hidden";
    $("#results")[0].style.display = "none";
    $("#customerID")[0].style.backgroundColor = "white";
    $("#customerCreditLine")[0].style.backgroundColor = "white";
    $("#customerID")[0].innerHTML = "";
    $("#customerCreditLine")[0].innerHTML = "";
    $("#items")[0].innerHTML = "";
    $("#contacts")[0].innerHTML = "";
    $("#customerNameInput")[0].value = "";
    $("#customerAddressInput")[0].value = "";
    $("#customerNameInput").attr({ "disabled": "disabled" });
    $("#customerAddressInput").attr({ "disabled": "disabled" });
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
    $("#customerCreditLine")[0].style.backgroundColor = "lightgrey";
    activeItem("");

    $("#customerNameInput").removeAttr("disabled");
    $("#customerAddressInput").removeAttr("disabled");

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
    if (name === '' || address === '') {
        alert("Please input: Name or Address!");
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
            0,
            onAddNewCustomer
        );
    }
}

function onAddNewCustomer(result) {
    clearDisplay();
    getAllSearchedCustomers();
    resultPopup("Successfully added to the database.", "green");
}

function displayCustomerItems(customer) {
    CustomerController.ReturnItems(customer.Id, onDisplayCustomerItems);
}

function onDisplayCustomerItems(result) {
    // set display
    var name = $("#detailHeading")[0].innerHTML;
    clearDisplay();
    $("#detailHeading")[0].innerHTML = name;
    $("#detailHeading")[0].style.visibility = "visible";
    $("#detailTabBar")[0].style.visibility = "visible";
    $("#items")[0].style.visibility = "visible";

    var items = JSON.parse(result);
    var button;
    for (var i = items.length - 1; i >= 0; i--) {
        button = document.createElement("button");
        br = document.createElement("br");
        button.append("Item " + items[i].itemID);
        button.appendChild(br);
        //button.append(item[i].Address);
        button.setAttribute("type", "button");
        button.setAttribute("class", "listItem bigList");
        let item = items[i];
        button.addEventListener("click", function () {
            loadPage("Items", item);
        });
        $("#items")[0].append(button);
    }
}


function displayCustomerContacts(customer) {
    CustomerController.ReturnCorrespondingContacts(customer.Id, onDisplayCustomerContacts);

}
function onDisplayCustomerContacts(result) {
    var contacts = JSON.parse(result);
    // set display
    var name = $("#detailHeading")[0].innerHTML;
    clearDisplay();
    $("#detailHeading")[0].innerHTML = name;
    $("#detailHeading")[0].style.visibility = "visible";
    $("#detailTabBar")[0].style.visibility = "visible";
    $("#contacts")[0].style.visibility = "visible"

    var button;
    for (var i = contacts.length - 1; i >= 0; i--) {
        button = document.createElement("button");
        button.append(contacts[i].Name);
        button.setAttribute("type", "button");
        button.setAttribute("class", "listItem bigList");
        let contact = contacts[i];
        button.addEventListener("click", function () {
            loadPage("Contacts", contact);
        });
        $("#contacts")[0].append(button);
    }
}