// on Page load...
$(document).ready(function () {
    // display all items
    var items;
    var searchedItems;
    getAllSearchedItems();
    // prevent form submission on enter
    $('form').keypress(function (event) {
        return event.keyCode != 13;
    }); 
    // Search as the user types
    var searchbar = $("#searchbar")[0];
    searchbar.addEventListener("keyup", function (event) {
        event.preventDefault();
        getAllSearchedItems();
    });
    $("#advSearch")[0].addEventListener("click", function () {
        displayAdvSearch();
    });
    $("#addButton")[0].addEventListener("click", function () {
        displayAddItem();
    });
    populateSelect();
});

// gets Subject area/ model types and populates selects with options
function populateSelect() {
    ModelController.ReturnSubjectAreaList(onPopulateSelect1);
    ModelController.ReturnTypeList(onPopulateSelect2);
}

function onPopulateSelect1(result) {
    var sbjlist = JSON.parse(result);
    for (var i = 0; i < sbjlist.length ; i++) {
        option = document.createElement("option");
        option.value = sbjlist[i];
        option.append(sbjlist[i]);
        $("#subjects").append(option);
    }
}
function onPopulateSelect2(result) {
    var typelist = JSON.parse(result);
    for (var j = 0; j < typelist.length; j++) {
        option = document.createElement("option");
        option.value = typelist[j];
        option.append(typelist[j]);
        $("#types").append(option);
    }
}

// Display items in list based on search
function getAllSearchedItems() {
    var searchInput = document.getElementById("searchbar").value;
    ModelController.SearchDatabase(searchInput, onSearchItems);
}

function onSearchItems(result) {
    items = JSON.parse(result);
    displayItemNames(items);
}

//Advanced search display
function displayAdvSearch() {
    clearDisplay();
    $("#detailHeading")[0].style.visibility = "visible";
    $("#detailHeading")[0].innerHTML = "Advanced Search";
}

// Creates and displays a list of buttons representing items in the inventory. 
function displayItemNames(items) {
    $("#list")[0].innerHTML = "";
    var button;
    for (var i = items.length - 1; i >= 0; i--) {
        button = document.createElement("button");
        button.append( items[i].Name );
        button.setAttribute("id", items[i].Id);
        button.setAttribute("type", "button");
        button.setAttribute("class", "listItem");
        let item = items[i];
        button.addEventListener("click", function () {
            displayItemDetails(item);
        });
        $("#list")[0].append(button);
    }
}

// Displays an items details
function displayItemDetails(item) {
    // set display
    clearDisplay();
    switchTabs("detailTabBar", "detailsTab");
    $("#detailHeading")[0].innerHTML = item.Name;
    $("#detailHeading")[0].style.visibility = "visible";
    $("#detailOptions")[0].style.visibility = "visible";
    $("#details")[0].style.visibility = "visible";
    $("#detailTabBar")[0].style.visibility = "visible";
    $("body").off("click", "#detailsTab");
    $("body").off("click", "#storesTab");
    $("body").off("click", "#suppliersTab");
    $("body").on("click", "#detailsTab", function () {
        switchTabs("detailTabBar", "detailsTab");
        displayItemDetails(item);
    });
    $("body").on("click", "#storesTab", function () {
        switchTabs("detailTabBar", "storesTab");
        displayItemStores(item);
    });
    $("body").on("click", "#suppliersTab", function () {
        switchTabs("detailTabBar", "suppliersTab");
        displayItemSuppliers(item);
    });
    $("#editItem")[0].addEventListener("click", function () {
        editItemDetails(item);
    });
    $("#deleteItem")[0].addEventListener("click", function () {
        displayDeleteItem(item);
    });

    activeItem(item.Id);

    var available;
    if (item.Availability == true) {
        available = "Yes";
    }
    else {
        available = "No";
    }

    $("#itemNameInput")[0].value = item.Name;
    $("#itemID")[0].innerHTML = item.Id;
    $("#itemTypeInput")[0].value = item.Type;
    $("#itemSbjAreaInput")[0].value = item.SbjArea;
    $("#itemPriceInput")[0].value = item.Price;
    $("#itemDescriptionInput")[0].value = item.Description;
    $("#itemAvailability")[0].innerHTML = available;
    $("#itemTotalStock")[0].innerHTML = item.StockCount;
}

// Edit details
function editItemDetails(item) {
    clearDisplay();
    $("#detailHeading")[0].style.visibility = "visible";
    $("#details")[0].style.visibility = "visible";
    $("#detailTabBar")[0].style.visibility = "visible";
    $("#leftButton")[0].style.visibility = "visible";
    $("#rightButton")[0].style.visibility = "visible";
    $("#itemID")[0].style.backgroundColor = "lightgrey";
    $("#itemAvailability")[0].style.backgroundColor = "lightgrey";
    $("#itemTotalStock")[0].style.backgroundColor = "lightgrey";
    $("#detailHeading")[0].append(item.Name);

    $("#itemNameInput").removeAttr("disabled");
    $("#itemTypeInput").removeAttr("disabled");
    $("#itemSbjAreaInput").removeAttr("disabled");
    $("#itemPriceInput").removeAttr("disabled");
    $("#itemDescriptionInput").removeAttr("disabled");

    $("#itemNameInput")[0].value = item.Name;
    $("#itemTypeInput")[0].value = item.Type;
    $("#itemSbjAreaInput")[0].value = item.SbjArea;
    $("#itemPriceInput")[0].value = item.Price;
    $("#itemDescriptionInput")[0].value = item.Description;
    
    var available;
    if (item.Availability == true) {
        available = "Yes";
    }
    else {
        available = "No";
    }
    $("#itemID")[0].append(item.Id);
    $("#itemAvailability")[0].append(available);
    $("#itemTotalStock")[0].append(item.StockCount);

    var img1 = document.createElement("img");
    img1.src = "style/save.png";

    $("#leftButton")[0].innerHTML = "";
    $("#leftButton")[0].append(img1);
    $("body").on("click", "#leftButton", function () {
        updateItem(item);
    });
    $("body").on("click", "#rightButton", function () {
        displayItemDetails(item);
    });
}

// Send edited data to controller
function updateItem(item) {
    if (validateInput()) {

        ModelController.UpdateModelDetails(
            item.Id,
            $("#itemNameInput")[0].value,
            $("#itemTypeInput")[0].value,
            $("#itemSbjAreaInput")[0].value,
            $("#itemPriceInput")[0].value,
            $("#itemDescriptionInput")[0].value,
            onUpdateItem
        );
    }
}

function onUpdateItem(item) {
    item = JSON.parse(item);
    var newitem = {
        "Id": item.Id,
        "Name": $("#itemNameInput")[0].value,
        "Type": $("#itemTypeInput")[0].value,
        "SbjArea": $("#itemSbjAreaInput")[0].value,
        "Price": $("#itemPriceInput")[0].value,
        "Description": $("#itemDescriptionInput")[0].value,
        "Availability": item.Availability,
        "StockCount": item.StockCount
    }
    //  Refreshes the updated button 
    $("#" + newitem.Id)[0].innerHTML = newitem.Name;
    $("#" + newitem.Id)[0].addEventListener("click", function () {
        displayItemDetails(newitem);
    });
    displayItemDetails(newitem);
    resultPopup("Successfully updated item in the Database.", "green");
}

//displays the delete model prompt
function displayDeleteItem(item) {
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
        deleteItem(item.Id);
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

// sends id of item to be deleted to controller
function deleteItem(id) {
    results.style.display = "none";
    ModelController.DeleteModel(id, onDeleteItem);
}

function onDeleteItem(id) {
    clearDisplay();
    activeItem("");
    // remove corresponding button from list
    $("#" + id)[0].remove();
    resultPopup("Item was successfully removed.", "green");
}

// closes the delete prompt
function closeDelete() {
    results.style.display = "none";
}

// removes any details that are displayed in the details section
function clearDisplay() {
    $("#detailHeading")[0].innerHTML = "";
    $("#stores")[0].style.visibility = "hidden"
    $("#suppliers")[0].style.visibility = "hidden"
    $("#detailHeading")[0].style.visibility = "hidden";
    $("#details")[0].style.visibility = "hidden";
    $("#detailOptions")[0].style.visibility = "hidden";
    $("#leftButton")[0].style.visibility = "hidden";
    $("#rightButton")[0].style.visibility = "hidden";
    $("#detailTabBar")[0].style.visibility = "hidden";
    $("#results")[0].style.display = "none";
    $("#itemID")[0].style.backgroundColor = "white";
    $("#itemAvailability")[0].style.backgroundColor = "white";
    $("#itemTotalStock")[0].style.backgroundColor = "white";
    $("#itemID")[0].innerHTML = "";
    $("#itemAvailability")[0].innerHTML = "";
    $("#itemTotalStock")[0].innerHTML = "";
    $("#stores")[0].innerHTML = ""
    $("#suppliers")[0].innerHTML = ""
    $("#itemNameInput").value = "";
    $("#itemID")[0].innerHTML = "";
    $("#itemTypeInput").value = "";
    $("#itemSbjAreaInput").value = "";
    $("#itemPriceInput").value = "";
    $("#itemNameInput")[0].value = "";
    $("#itemTypeInput")[0].value = "";
    $("#itemSbjAreaInput")[0].value = "";
    $("#itemPriceInput")[0].value = "";
    $("#itemDescriptionInput")[0].value = "";
    $("#itemDescriptionInput").value = "";
    $("#itemNameInput").attr({ "disabled": "disabled" });
    $("#itemTypeInput").attr({ "disabled": "disabled" });
    $("#itemSbjAreaInput").attr({ "disabled": "disabled" });
    $("#itemPriceInput").attr({ "disabled": "disabled" });
    $("#itemDescriptionInput").attr({ "disabled": "disabled" });
    $("body").off("click", "#leftButton");
    $("body").off("click", "#rightButton");
}

//Add new item to model table
function displayAddItem() {
    //reset detail display to have correct elements for this menu.
    clearDisplay();
    $("#detailHeading")[0].innerHTML = "Add a New Model";
    $("#detailHeading")[0].style.visibility = "visible";
    $("#details")[0].style.visibility = "visible";
    $("#detailTabBar")[0].style.visibility = "visible";
    $("#leftButton")[0].style.visibility = "visible";
    $("#rightButton")[0].style.visibility = "visible";
    $("#itemID")[0].style.backgroundColor = "lightgrey";
    $("#itemAvailability")[0].style.backgroundColor = "lightgrey";
    $("#itemTotalStock")[0].style.backgroundColor = "lightgrey";
    activeItem("");

    $("#itemNameInput").removeAttr("disabled");
    $("#itemTypeInput").removeAttr("disabled");
    $("#itemSbjAreaInput").removeAttr("disabled");
    $("#itemPriceInput").removeAttr("disabled");
    $("#itemDescriptionInput").removeAttr("disabled");

    // set details for left button
    var img1 = document.createElement("img");
    img1.src = "style/add.png";
    $("#leftButton")[0].innerHTML = "";
    $("#leftButton")[0].append(img1);
    $("body").on("click", "#leftButton", addNewItem);
    $("body").on("click", "#rightButton", clearDisplay);
}

function validateInput() {
    var name = $("#itemNameInput")[0].value;
    var type = $("#itemTypeInput")[0].value;
    var sbj = $("#itemSbjAreaInput")[0].value;
    var price = $("#itemPriceInput")[0].value;
    var desc = $("#itemDescriptionInput")[0].value;
    if (name === '' || type === '' || sbj === '' || price === '' || desc === '') {
        alert("Please input: Name, Type, Subject Area, Price or Description!");
        return false;
    }
    else {
        return true;
    }
}

// Sends input to controller
function addNewItem() {
    if (validateInput()) {
         ModelController.AddNewModel(
            $("#itemNameInput")[0].value,
            $("#itemTypeInput")[0].value,
            $("#itemSbjAreaInput")[0].value,
            $("#itemPriceInput")[0].value,
            $("#itemDescriptionInput")[0].value,
            onAddNewItem
        );
    }
}

function onAddNewItem(result) {
    clearDisplay();
    getAllSearchedItems();
    resultPopup("Successfully added to the database.", "green");
}

function displayItemStores(item) {
    ModelController.ReturnStores(item.Id, onDisplayItemStores);
}

function onDisplayItemStores(result) {
    // set display
    var name = $("#detailHeading")[0].innerHTML;
    clearDisplay();
    $("#detailHeading")[0].innerHTML = name;
    $("#detailHeading")[0].style.visibility = "visible";
    $("#detailTabBar")[0].style.visibility = "visible";
    $("#stores")[0].style.visibility = "visible";

    var stores = JSON.parse(result);
    var button;
    for (var i = stores.length - 1; i >= 0; i--) {
        button = document.createElement("button");
        br = document.createElement("br");
        button.append("Store " + stores[i].StoreID);
        button.appendChild(br);
        button.append(stores[i].Address);
        button.setAttribute("type", "button");
        button.setAttribute("class", "listItem bigList");
        let store = stores[i];
        button.addEventListener("click", function () {
            loadPage("Stores", store);
        });
        $("#stores")[0].append(button);
    }
}


// OLIVER: be careful at this- different names used, need a pre-step to retrieve before display so I changed the names
function displayItemSuppliers(item) {
    ModelController.ReturnCorrespondingSupplier(item.Id, onDisplayItemSuppliers);
   
}
function onDisplayItemSuppliers(result) {
    var suppliers = JSON.parse(result);
    // set display
    var name = $("#detailHeading")[0].innerHTML;
    clearDisplay();
    $("#detailHeading")[0].innerHTML = name;
    $("#detailHeading")[0].style.visibility = "visible";
    $("#detailTabBar")[0].style.visibility = "visible";
    $("#suppliers")[0].style.visibility = "visible"
    
    var button;
    for (var i = suppliers.length - 1; i >= 0; i--) {
        button = document.createElement("button");
        button.append(suppliers[i].Name);
        button.setAttribute("type", "button");
        button.setAttribute("class", "listItem bigList");
        let supplier = suppliers[i];
        button.addEventListener("click", function () {
            loadPage("Suppliers", supplier);
        });
        $("#suppliers")[0].append(button);
    }
}