// on Page load...
$(document).ready(function () {
    // display all suppliers
    var suppliers;
    var searchedSuppliers;
    getAllSearchedSuppliers();
    // prevent form submission on enter
    $('form').keypress(function (event) {
        return event.keyCode != 13;
    });
    // Search as the user types
    var searchbar = $("#searchbar")[0];
    searchbar.addEventListener("keyup", function (event) {
        event.preventDefault();
        getAllSearchedSuppliers();
    });
    $("#advSearch")[0].addEventListener("click", function () {
        displayAdvSearch();
    });
    $("#addButton")[0].addEventListener("click", function () {
        displayAddSupplier();
    });
    setTimeout(function () {
        if (loaded != "") {
            displaySupplierDetails(loaded);
            loaded = "";
        }
    }, 250);
});

// Display suppliers in list based on search
function getAllSearchedSuppliers() {
    var searchInput = document.getElementById("searchbar").value;
    SupplierController.Search(searchInput, onSearchSuppliers);
}

function onSearchSuppliers(result) {
    suppliers = JSON.parse(result);
    displaySupplierNames(suppliers);
}

//Advanced search display
function displayAdvSearch() {
    clearDisplay();
    $("#detailHeading")[0].style.visibility = "visible";
    $("#detailHeading")[0].innerHTML = "Advanced Search";
}

// Creates and displays a list of buttons representing suppliers in the inventory. 
function displaySupplierNames(suppliers) {
    $("#list")[0].innerHTML = "";
    var button;
    for (var i = suppliers.length - 1; i >= 0; i--) {
        button = document.createElement("button");
        button.append(suppliers[i].Name);
        button.setAttribute("id", suppliers[i].Id);
        button.setAttribute("type", "button");
        button.setAttribute("class", "listItem");
        let supplier = suppliers[i];
        button.addEventListener("click", function () {
            displaySupplierDetails(supplier);
        });
        $("#list")[0].append(button);
    }
}

// Displays an suppliers details
function displaySupplierDetails(supplier) {
    // set display
    clearDisplay();
    switchTabs("detailTabBar", "detailsTab");
    $("#detailHeading")[0].innerHTML = supplier.Name;
    $("#detailHeading")[0].style.visibility = "visible";
    $("#detailOptions")[0].style.visibility = "visible";
    $("#details")[0].style.visibility = "visible";
    $("#detailTabBar")[0].style.visibility = "visible";
    $("body").off("click", "#detailsTab");
    $("body").off("click", "#itemsTab");
    $("body").off("click", "#contactsTab");
    $("body").on("click", "#detailsTab", function () {
        switchTabs("detailTabBar", "detailsTab");
        displaySupplierDetails(supplier);
    });
    $("body").on("click", "#itemsTab", function () {
        switchTabs("detailTabBar", "itemsTab");
        displaySupplierItems(supplier);
    });
    $("body").on("click", "#contactsTab", function () {
        switchTabs("detailTabBar", "contactsTab");
        displaySupplierContacts(supplier);
    });
    $("#editSupplier")[0].addEventListener("click", function () {
        editSupplierDetails(supplier);
    });
    $("#deleteSupplier")[0].addEventListener("click", function () {
        displayDeleteSupplier(supplier);
    });

    activeItem(supplier.Id);
    $("#supplierNameInput")[0].value = supplier.Name;
    $("#supplierID")[0].innerHTML = supplier.Id;
    $("#supplierAddressInput")[0].value = supplier.Address;
    $("#supplierCreditLineInput")[0].value = supplier.CreditLine;
}

// Edit details
function editSupplierDetails(supplier) {
    clearDisplay();
    $("#detailHeading")[0].style.visibility = "visible";
    $("#details")[0].style.visibility = "visible";
    $("#detailTabBar")[0].style.visibility = "visible";
    $("#leftButton")[0].style.visibility = "visible";
    $("#rightButton")[0].style.visibility = "visible";
    $("#supplierID")[0].style.backgroundColor = "lightgrey";
    $("#detailHeading")[0].append(supplier.Name);

    $("#supplierNameInput").removeAttr("disabled");
    $("#supplierAddressInput").removeAttr("disabled");
    $("#supplierCreditLineInput").removeAttr("disabled");

    $("#supplierNameInput")[0].value = supplier.Name;
    $("#supplierAddressInput")[0].value = supplier.Address;
    $("#supplierCreditLineInput")[0].value = supplier.CreditLine;

    $("#supplierID")[0].append(supplier.Id);

    var img1 = document.createElement("img");
    img1.src = "style/save.png";

    $("#leftButton")[0].innerHTML = "";
    $("#leftButton")[0].append(img1);
    $("body").on("click", "#leftButton", function () {
        updateSupplier(supplier);
    });
    $("body").on("click", "#rightButton", function () {
        displaySupplierDetails(supplier);
    });
}

// Send edited data to controller
function updateSupplier(supplier) {
    if (validateInput()) {
        SupplierController.Update(
            supplier.Id,
            $("#supplierNameInput")[0].value,
            $("#supplierAddressInput")[0].value,
            $("#supplierCreditLineInput")[0].value,
            onUpdateSupplier
        );
    }
}

function onUpdateSupplier(supplier) {
    supplier = JSON.parse(supplier);
    var newsupplier = {
        "Id": supplier.Id,
        "Name": $("#supplierNameInput")[0].value,
        "Address": $("#supplierAddressInput")[0].value,
        "CreditLine": $("#supplierCreditLineInput")[0].value
    }
    //  Refreshes the updated button 
    $("#" + newsupplier.Id)[0].innerHTML = newsupplier.Name;
    $("#" + newsupplier.Id)[0].addEventListener("click", function () {
        displaySupplierDetails(newsupplier);
    });
    displaySupplierDetails(newsupplier);
    resultPopup("Successfully updated supplier in the Database.", "green");
}

//displays the delete model prompt
function displayDeleteSupplier(supplier) {
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
        deleteSupplier(supplier.Id);
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

// sends id of supplier to be deleted to controller
function deleteSupplier(id) {
    results.style.display = "none";
    SupplierController.Delete(id, onDeleteSupplier);
}

function onDeleteSupplier(id) {
    clearDisplay();
    activeItem("");
    // remove corresponding button from list
    $("#" + id)[0].remove();
    resultPopup("Supplier was successfully removed.", "green");
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
    $("#addBar")[0].style.visibility = "hidden";
    $("#results")[0].style.display = "none";
    $("#supplierID")[0].style.backgroundColor = "white";
    $("#supplierID")[0].innerHTML = "";
    $("#items")[0].innerHTML = "";
    $("#contacts")[0].innerHTML = "";
    $("#supplierNameInput")[0].value = "";
    $("#supplierAddressInput")[0].value = "";
    $("#supplierCreditLineInput")[0].value = "";
    $("#supplierNameInput").attr({ "disabled": "disabled" });
    $("#supplierAddressInput").attr({ "disabled": "disabled" });
    $("#supplierCreditLineInput").attr({ "disabled": "disabled" });
    $("body").off("click", "#leftButton");
    $("body").off("click", "#rightButton");
}

//Add new supplier to model table
function displayAddSupplier() {
    //reset detail display to have correct elements for this menu.
    clearDisplay();
    $("#detailHeading")[0].innerHTML = "Add a New Supplier";
    $("#detailHeading")[0].style.visibility = "visible";
    $("#details")[0].style.visibility = "visible";
    $("#detailTabBar")[0].style.visibility = "visible";
    $("#leftButton")[0].style.visibility = "visible";
    $("#rightButton")[0].style.visibility = "visible";
    $("#supplierID")[0].style.backgroundColor = "lightgrey";
    activeItem("");

    $("#supplierNameInput").removeAttr("disabled");
    $("#supplierAddressInput").removeAttr("disabled");
    $("#supplierCreditLineInput").removeAttr("disabled");

    // set details for left button
    var img1 = document.createElement("img");
    img1.src = "style/add.png";
    $("#leftButton")[0].innerHTML = "";
    $("#leftButton")[0].append(img1);
    $("body").on("click", "#leftButton", addNewSupplier);
    $("body").on("click", "#rightButton", clearDisplay);
}

function validateInput() {
    var name = $("#supplierNameInput")[0].value;
    var address = $("#supplierAddressInput")[0].value;
    if (name === '' || address === '') {
        alert("Please input: Name or Address!");
        return false;
    }
    else {
        return true;
    }
}

// Sends input to controller
function addNewSupplier() {
    if (validateInput()) {
        SupplierController.Add(
            $("#supplierNameInput")[0].value,
            $("#supplierAddressInput")[0].value,
            $("#supplierCreditLineInput")[0].value,
            onAddNewSupplier
        );
    }
}

function onAddNewSupplier(result) {
    clearDisplay();
    getAllSearchedSuppliers();
    resultPopup("Successfully added to the database.", "green");
}

function displaySupplierItems(supplier) {
    SupplierController.ReturnItems(supplier.Id, onDisplaySupplierItems);
}

function onDisplaySupplierItems(result) {
    // set display
    var name = $("#detailHeading")[0].innerHTML;
    clearDisplay();
    $("#detailHeading")[0].innerHTML = name;
    $("#detailHeading")[0].style.visibility = "visible";
    $("#addBar")[0].style.visibility = "visible";
    $("#detailTabBar")[0].style.visibility = "visible";
    $("#items")[0].style.visibility = "visible";
    $("body").off("click", "#addItem", addItem);
    $("body").on("click", "#addItem", addItem);
    var items = JSON.parse(result);

    var button;
    for (var i = items.length - 1; i >= 0; i--) {
        button = document.createElement("button");
        br = document.createElement("br");
        button.append("Item: " + items[i].Name);
        button.appendChild(br);
        //button.append(item[i].Address);
        button.setAttribute("type", "button");
        button.setAttribute("class", "listItem bigList");
        let item = items[i];
        button.addEventListener("click", function () {
            loadPage("Models", item);
        });
        $("#items")[0].append(button);
    }
}

function addItem() {
    SupplierController.addItem($("#itemIDInput").value);
}

function displaySupplierContacts(supplier) {
    SupplierController.ReturnCorrespondingContacts(supplier.Id, onDisplaySupplierContacts);

}
function onDisplaySupplierContacts(result) {
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