// on Page load...
$(document).ready(function () {
    // display all stores
    var stores;
    var searchedStores;
    getAllSearchedStores();
    // prevent form submission on enter
    $('form').keypress(function (event) {
        return event.keyCode != 13;
    });
    // Search as the user types
    var searchbar = $("#searchbar")[0];
    searchbar.addEventListener("keyup", function (event) {
        event.preventDefault();
        getAllSearchedStores();
    });
    $("#advSearch")[0].addEventListener("click", function () {
        displayAdvSearch();
    });
    $("#addButton")[0].addEventListener("click", function () {
        displayAddStore();
    });
});

// Display stores in list based on search
function getAllSearchedStores() {
    var searchInput = document.getElementById("searchbar").value;
    StoreController.GetStores(searchInput, onGetStores);
}

function onGetStores(result) {
    stores = JSON.parse(result);
    displayStoreNames(stores);
}

//Advanced search display
function displayAdvSearch() {
    clearDisplay();
    $("#detailHeading")[0].style.visibility = "visible";
    $("#detailHeading")[0].innerHTML = "Advanced Search";
}

// Creates and displays a list of buttons representing stores in the inventory. 
function displayStoreNames(stores) {
    $("#list")[0].innerHTML = "";
    var button;
    for (var i = stores.length - 1; i >= 0; i--) {
        button = document.createElement("button");
        button.append(stores[i].Address);
        button.setAttribute("id", stores[i].Id);
        button.setAttribute("type", "button");
        button.setAttribute("class", "listItem");
        let store = stores[i];
        button.addEventListener("click", function () {
            displayStoreDetails(store);
        });
        $("#list")[0].append(button);
    }
}

// Displays an stores details
function displayStoreDetails(store) {
    // set display
    clearDisplay();
    switchTabs("detailTabBar", "detailsTab");
    $("#detailHeading")[0].innerHTML = store.Address;
    $("#detailHeading")[0].style.visibility = "visible";
    $("#detailOptions")[0].style.visibility = "visible";
    $("#details")[0].style.visibility = "visible";
    $("#detailTabBar")[0].style.visibility = "visible";
    $("body").off("click", "#detailsTab");
    $("body").off("click", "#inventoryTab");
    $("body").on("click", "#detailsTab", function () {
        switchTabs("detailTabBar", "detailsTab");
        displayStoreDetails(store);
    });
    $("body").on("click", "#inventoryTab", function () {
        switchTabs("detailTabBar", "inventoryTab");
        //displayStoreInventory(store);
    });
    $("#editStore")[0].addEventListener("click", function () {
        editStoreDetails(store);
    });
    $("#deleteStore")[0].addEventListener("click", function () {
        displayDeleteStore(store);
    });

    activeItem(store.Id);
    $("#storeID")[0].innerHTML = store.StoreID;
    $("#storeAddressInput")[0].value = store.Address;
}

// Edit details
function editStoreDetails(store) {
    clearDisplay();
    $("#detailHeading")[0].style.visibility = "visible";
    //$("#details")[0].style.visibility = "visible";
    $("#detailTable")[0].style.visibility = "visible";
    $("#detailTabBar")[0].style.visibility = "visible";
    $("#inventory")[0].style.visibility = "hidden";
    $("#leftButton")[0].style.visibility = "visible";
    $("#rightButton")[0].style.visibility = "visible";
    $("#storeID")[0].style.backgroundColor = "lightgrey";
    $("#detailHeading")[0].append(store.Name);
    
    $("#storeAddressInput").removeAttr("disabled");

    $("#storeAddressInput")[0].value = store.Address;

    $("#storeID")[0].append(store.StoreID);

    var img1 = document.createElement("img");
    img1.src = "style/save.png";

    $("#leftButton")[0].innerHTML = "";
    $("#leftButton")[0].append(img1);
    $("body").on("click", "#leftButton", function () {
        updateStore(store);
    });
    $("body").on("click", "#rightButton", function () {
        displayStoreDetails(store);
    });
}

// Send edited data to controller
function updateStore(store) {
    if (validateInput()) {
        StoreController.UpdateStore(
            store.StoreID,
            $("#storeAddressInput")[0].value,
            onUpdateStore
        );
    }
}

function onUpdateStore(store) {
    store = JSON.parse(store);
    var newstore = {
        "StoreID": store.StoreID,
        "Address": $("#storeAddressInput")[0].value
    }
    //  Refreshes the updated button 
    $("#" + newstore.Id)[0].innerHTML = newstore.Address;
    $("#" + newstore.Id)[0].addEventListener("click", function () {
        displayStoreDetails(newstore);
    });
    displayStoreDetails(newstore);
    resultPopup("Successfully updated store in the Database.", "green");
}

//displays the delete model prompt
function displayDeleteStore(store) {
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
        deleteStore(store.StoreID);
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

    $("#results")[0].append("Are you sure you want to delete this store ");
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

// sends id of store to be deleted to controller
function deleteStore(id) {
    results.style.display = "none";
    StoreController.DeleteStore(Number(id), onDeleteStore);
}

function onDeleteStore(id) {
    clearDisplay();
    activeItem("");
    // remove corresponding button from list
    $("#" + id)[0].remove();
    resultPopup("Store was successfully removed.", "green");
}

// closes the delete prompt
function closeDelete() {
    results.style.display = "none";
}

// removes any details that are displayed in the details section
function clearDisplay() {
    $("#detailHeading")[0].innerHTML = "";
    $("#inventory")[0].style.visibility = "hidden"
    $("#detailHeading")[0].style.visibility = "hidden";
    $("#details")[0].style.visibility = "hidden";
    $("#detailOptions")[0].style.visibility = "hidden";
    $("#leftButton")[0].style.visibility = "hidden";
    $("#rightButton")[0].style.visibility = "hidden";
    $("#detailTabBar")[0].style.visibility = "hidden";
    $("#addInventory")[0].style.visibility = "hidden";
    $("#results")[0].style.display = "none";
    $("#storeID")[0].style.backgroundColor = "white";
    $("#storeID")[0].innerHTML = "";
    $("#storeAddressInput")[0].value = "";
    $("#storeAddressInput").attr({ "disabled": "disabled" });
    $("body").off("click", "#leftButton");
    $("body").off("click", "#rightButton");
}

//Add new store to model table
function displayAddStore() {
    //reset detail display to have correct elements for this menu.
    clearDisplay();
    $("#detailHeading")[0].innerHTML = "Add a New Store";
    $("#detailHeading")[0].style.visibility = "visible";
    $("#details")[0].style.visibility = "visible";
    $("#detailTabBar")[0].style.visibility = "visible";
    $("#leftButton")[0].style.visibility = "visible";
    $("#rightButton")[0].style.visibility = "visible";
    $("#storeID")[0].style.backgroundColor = "lightgrey";
    activeItem("");
    
    $("#storeAddressInput").removeAttr("disabled");

    // set details for left button
    var img1 = document.createElement("img");
    img1.src = "style/add.png";
    $("#leftButton")[0].innerHTML = "";
    $("#leftButton")[0].append(img1);
    $("body").on("click", "#leftButton", addNewStore);
    $("body").on("click", "#rightButton", clearDisplay);
}

function validateInput() {
    var address = $("#storeAddressInput")[0].value;

    if (address === '') {
        alert("Please input: Address!");
        return false;
    }
    else {
        return true;
    }
}

// Sends input to controller
function addNewStore() {
    if (validateInput()) {
        StoreController.AddStore(
            $("#storeAddressInput")[0].value,
            onAddNewStore
        );
    }
}

function onAddNewStore(result) {
    clearDisplay();
    getAllSearchedStores();
    resultPopup("Successfully added to the database.", "green");
}

function displayStoreInventory(store) {
    StoreController.ReturnItems(store.Id, onDisplayStoreItems);
}

function onDisplayStoreInventory(result) {
    // set display
    var address = $("#detailHeading")[0].innerHTML;
    clearDisplay();
    $("#detailHeading")[0].innerHTML = address;
    $("#detailHeading")[0].style.visibility = "visible";
    $("#detailTabBar")[0].style.visibility = "visible";
    $("#addInventory")[0].style.visibility = "visible";
    $("#inventory")[0].style.visibility = "visible";

    var inventory = JSON.parse(result);

    var button;
    for (var i = inventory.length - 1; i >= 0; i--) {
        button = document.createElement("button");
        br = document.createElement("br");
        button.append(orders[i].Name);
        button.append(br);
        button.append(orders[i].FinalTotal);
        button.setAttribute("type", "button");
        button.setAttribute("class", "listItem");
        let item = inventory[i];
        button.addEventListener("click", function () {
            displayItemDetails(item);
        });
        $("#inventoryList")[0].append(button);
    }

    $("#addInventory")[0].addEventListener("click", function () {
        displayAddItem();
    });
}

function displayItemDetails(item) {
    var address = $("#detailHeading")[0].innerHTML;
    clearDisplay();
    $("#detailHeading")[0].innerHTML = address;
    $("#detailHeading")[0].style.visibility = "visible";
    $("#detailOptions")[0].style.visibility = "visible";
    $("#addInventory")[0].style.visibility = "visible";
    $("#inventory")[0].style.visibility = "visible";
    $("#detailTabBar")[0].style.visibility = "visible";
    $("#editStore")[0].addEventListener("click", function () {
        editItemDetails(item);
    });
    $("#deleteStore")[0].addEventListener("click", function () {
        displayDeleteItem(item);
    });
    $("#itemIDInput")[0].value = item.Id;
    $("#itemStockCountInput")[0].value = item.StockCount;
    $("#itemLocationInput")[0].value = item.Location;
    $("#itemDateAddedInput")[0].value = item.DateAdded;
}

// Edit details
function editStoreDetails(store) {
    var address = $("#detailHeading")[0].innerHTML;
    clearDisplay();
    $("#detailHeading")[0].style.visibility = "visible";
    $("#inventory")[0].style.visibility = "visible";
    $("#detailTabBar")[0].style.visibility = "visible";
    $("#leftButton")[0].style.visibility = "visible";
    $("#rightButton")[0].style.visibility = "visible";
    $("#addInventory")[0].style.visibility = "visible";
    $("#detailHeading")[0].append(address);

    $("#itemIDInput").removeAttr("disabled");
    $("#itemStockCountInput").removeAttr("disabled");
    $("#itemLocationInput").removeAttr("disabled");
    $("#itemDateAddedInput").removeAttr("disabled");

    $("#itemIDInput")[0].value = item.Id;
    $("#itemStockCountInput")[0].value = item.StockCount;
    $("#itemLocationInput")[0].value = item.Location;
    $("#itemDateAddedInput")[0].value = item.DateAdded;

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
    if (validateItemInput()) {
        StoreController.UpdateItem(
            item.Id,
            $("#storeAddressInput")[0].value,
            onUpdateStore
        );
    }
}

function onUpdateStore(store) {
    store = JSON.parse(store);
    var newstore = {
        "Id": store.Id,
        "Address": $("#storeAddressInput")[0].value
    }
    //  Refreshes the updated button 
    $("#" + newstore.Id)[0].innerHTML = newstore.Address;
    $("#" + newstore.Id)[0].addEventListener("click", function () {
        displayStoreDetails(newstore);
    });
    displayStoreDetails(newstore);
    resultPopup("Successfully updated store in the Database.", "green");
}

//displays the delete model prompt
function displayDeleteStore(store) {
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
        deleteStore(store.Id);
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

    $("#results")[0].append("Are you sure you want to delete this store ");
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

// sends id of store to be deleted to controller
function deleteStore(id) {
    results.style.display = "none";
    StoreController.Delete(id, onDeleteStore);
}

function onDeleteStore(id) {
    clearDisplay();
    activeItem("");
    // remove corresponding button from list
    $("#" + id)[0].remove();
    resultPopup("Store was successfully removed.", "green");
}

//Add new store to model table
function displayAddStore() {
    //reset detail display to have correct elements for this menu.
    clearDisplay();
    $("#detailHeading")[0].innerHTML = "Add a New Store";
    $("#detailHeading")[0].style.visibility = "visible";
    $("#details")[0].style.visibility = "visible";
    $("#detailTabBar")[0].style.visibility = "visible";
    $("#leftButton")[0].style.visibility = "visible";
    $("#rightButton")[0].style.visibility = "visible";
    $("#storeID")[0].style.backgroundColor = "lightgrey";
    activeItem("");

    $("#storeAddressInput").removeAttr("disabled");

    // set details for left button
    var img1 = document.createElement("img");
    img1.src = "style/add.png";
    $("#leftButton")[0].innerHTML = "";
    $("#leftButton")[0].append(img1);
    $("body").on("click", "#leftButton", addNewStore);
    $("body").on("click", "#rightButton", clearDisplay);
}

function validateInput() {
    var address = $("#storeAddressInput")[0].value;

    if (address === '') {
        alert("Please input: Address!");
        return false;
    }
    else {
        return true;
    }
}

// Sends input to controller
function addNewStore() {
    if (validateInput()) {
        StoreController.AddStore(
            $("#storeAddressInput")[0].value,
            onAddNewStore
        );
    }
}