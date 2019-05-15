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
});

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
        button.innerHTML = items[i].Name;
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
    $("#detailHeading")[0].innerHTML = item.Name;
    $("#detailHeading")[0].style.visibility = "visible";
    $("#detailOptions")[0].style.visibility = "visible";
    $("#detailTable")[0].style.visibility = "visible";
    $("#detailTabBar")[0].style.visibility = "visible";
    $("#detailsTab")[0].addEventListener("click", function () {
        switchTabs("detailTabBar", "detailsTab");
        displayItemDetails(item);
    });
    $("#storesTab")[0].addEventListener("click", function () {
        switchTabs("detailTabBar", "storesTab");
        displayItemStores(item);
    });
    $("#suppliersTab")[0].addEventListener("click", function () {
        switchTabs("detailTabBar", "suppliersTab");
        displayItemSuppliers(item);
    });
    $("#reviewsTab")[0].addEventListener("click", function () {
        switchTabs("detailTabBar", "reviewsTab");
        displayItemReviews(item);
    });
    $("#editItem")[0].addEventListener("click", function () {
        editItemDetails(item);
    });
    $("#deleteItem")[0].addEventListener("click", function () {
        displayDeleteItem(item);
    });

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
    $("#detailTable")[0].style.visibility = "visible";
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
    $("#leftButton")[0].addEventListener("click", function () {
        updateItem(item.Id);
    });
    
    $("#rightButton")[0].addEventListener("click", function () {
        displayItemDetails(item);
    });
}

// Send edited data to controller
function updateItem(id) {
    var name = $("#itemNameInput")[0].value;
    ModelController.UpdateModelDetails(
        id,
        name,
        $("#itemTypeInput")[0].value,
        $("#itemSbjAreaInput")[0].value,
       Number( $("#itemPriceInput")[0].value),
        $("#itemDescriptionInput")[0].value,
        onUpdateItem
    );
}

function onUpdateItem(item) {
    /*item = JSON.parse(item);
    //  Refreshes the updated button 
    $("#" + item.Id)[0].innerHTML = item.Name;
    $("#" + item.Id)[0].addEventListener("click", function () {
        displayItemDetails(item);
    });
    $("#leftButton").unbind("click");
    displayItemDetails(item);*/
    getAllSearchedItems();
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

// sends id of item to be deleted to controller
function deleteItem(id) {
    results.style.display = "none";
    ModelController.DeleteModel(id, onDeleteItem);
}

function onDeleteItem(id) {
    clearDisplay();
    // remove corresponding button from list
    //$("#" + id)[0].remove();
    getAllSearchedItems();
    resultPopup("Item was successfully removed.", "green");
}

// closes the delete prompt
function closeDelete() {
    results.style.display = "none";
}

// removes any details that are displayed in the details section
function clearDisplay() {
    $("#detailHeading")[0].innerHTML = "";
    $("#detailHeading")[0].style.visibility = "hidden";
    $("#detailTable")[0].style.visibility = "hidden";
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
    $("#itemNameInput").value = "";
    $("#itemID")[0].innerHTML = "";
    $("#itemTypeInput").value = "";
    $("#itemSbjAreaInput").value = "";
    $("#itemPriceInput").value = "";
    $("#itemDescriptionInput").value = "";
    $("#itemNameInput").attr({ "disabled": "disabled" });
    $("#itemTypeInput").attr({ "disabled": "disabled" });
    $("#itemSbjAreaInput").attr({ "disabled": "disabled" });
    $("#itemPriceInput").attr({ "disabled": "disabled" });
    $("#itemDescriptionInput").attr({ "disabled": "disabled" });
}

//Add new item to model table
function displayAddItem() {
    //reset detail display to have correct elements for this menu.
    clearDisplay();
    $("#detailHeading")[0].innerHTML = "Add a New Model";
    $("#detailHeading")[0].style.visibility = "visible";
    $("#detailTable")[0].style.visibility = "visible";
    $("#detailTabBar")[0].style.visibility = "visible";
    $("#leftButton")[0].style.visibility = "visible";
    $("#rightButton")[0].style.visibility = "visible";
    $("#itemID")[0].style.backgroundColor = "lightgrey";
    $("#itemAvailability")[0].style.backgroundColor = "lightgrey";
    $("#itemTotalStock")[0].style.backgroundColor = "lightgrey";

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
    $("#leftButton")[0].addEventListener("click", function () {
        addNewItem();
    });

    // set details for right button
    $("#rightButton")[0].addEventListener("click", function () {
        clearDisplay();
    });
}

// Sends input to controller
function addNewItem() {
     ModelController.AddNewModel(
        $("#itemNameInput")[0].value,
        $("#itemTypeInput")[0].value,
        $("#itemSbjAreaInput")[0].value,
         Number($("#itemPriceInput")[0].value),
        $("#itemDescriptionInput")[0].value,
        onAddNewItem
    );
}

function onAddNewItem(result) {
    var item = JSON.parse(result);
    clearDisplay();
    // add single new button
    /*var button = document.createElement("button");
    button.innerHTML = item.Name;
    button.setAttribute("id", item.Id);
    button.setAttribute("type", "button");
    button.setAttribute("class", "listItem");
    button.addEventListener("click", function () {
        displayItemDetails(item);
    });
    $("#list")[0].append(button);
    displayItemDetails(item);
    $("#leftButton").unbind("click");*/
    getAllSearchedItems();
    resultPopup("Successfully added to the database.", "green");
}

function displayItemStores(item) {
    // set display
    clearDisplay();
    $("#detailHeading")[0].innerHTML = item.Name;
    $("#detailHeading")[0].style.visibility = "visible";
    $("#detailTabBar")[0].style.visibility = "visible";
}

function displayItemSuppliers(item) {
    // set display
    clearDisplay();
    $("#detailHeading")[0].innerHTML = item.Name;
    $("#detailHeading")[0].style.visibility = "visible";
    $("#detailTabBar")[0].style.visibility = "visible";
}

function displayItemReviews(item) {
    // set display
    clearDisplay();
    $("#detailHeading")[0].innerHTML = item.Name;
    $("#detailHeading")[0].style.visibility = "visible";
    $("#detailTabBar")[0].style.visibility = "visible";
}