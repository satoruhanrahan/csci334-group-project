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
    document.getElementById("detailHeading").innerHTML = "Advanced Search";
    document.getElementById("details").innerHTML = "Here will be filter & sort settings for an advanced search!";
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
    $("#detailHeading")[0].innerHTML = item.Name;
    $("#leftButton")[0].style.visibility = "hidden";
    $("#rightButton")[0].style.visibility = "hidden";
    $("#results")[0].style.display = "none";
    $("#itemID")[0].style.backgroundColor = "white";
    $("#itemAvailability")[0].style.backgroundColor = "white";
    $("#itemTotalStock")[0].style.backgroundColor = "white";
    $("#detailHeading")[0].style.visibility = "visible";
    $("#detailOptions")[0].style.visibility = "visible";
    $("#details")[0].style.visibility = "visible";
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

    $("#itemName")[0].innerHTML = item.Name;
    $("#itemID")[0].innerHTML = item.Id;
    $("#itemType")[0].innerHTML = item.Type;
    $("#itemSbjArea")[0].innerHTML = item.SbjArea;
    $("#itemPrice")[0].innerHTML = item.Price;
    $("#itemDescription")[0].innerHTML = item.Description;
    $("#itemAvailability")[0].innerHTML = available;
    $("#itemTotalStock")[0].innerHTML = item.StockCount;
}

// Generalized input generation for edit and add model menus
function itemInputs(item) {
    $("#itemName")[0].innerHTML = "";
    $("#itemType")[0].innerHTML = "";
    $("#itemSbjArea")[0].innerHTML = "";
    $("#itemPrice")[0].innerHTML = "";
    $("#itemDescription")[0].innerHTML = "";

    var input1 = document.createElement("input");
    input1.setAttribute("type", "text");
    input1.setAttribute("id", "itemNameInput");
    input1.setAttribute("value", item.Name);

    var input2 = document.createElement("input");
    input2.setAttribute("type", "text");
    input2.setAttribute("id", "itemTypeInput");
    input2.setAttribute("value", item.Type);

    var input3 = document.createElement("input");
    input3.setAttribute("type", "text");
    input3.setAttribute("id", "itemSbjAreaInput");
    input3.setAttribute("value", item.SbjArea);

    var input4 = document.createElement("input");
    input4.setAttribute("type", "text");
    input4.setAttribute("id", "itemPriceInput");
    input4.setAttribute("value", item.Price);

    var input5 = document.createElement("textarea");
    input5.setAttribute("id", "itemDescriptionInput");
    input5.innerHTML = item.Description;

    $("#itemName")[0].append(input1);
    $("#itemType")[0].append(input2);
    $("#itemSbjArea")[0].append(input3);
    $("#itemPrice")[0].append(input4);
    $("#itemDescription")[0].append(input5);
}

// Edit details
function editItemDetails(item) {
    $("#detailHeading")[0].innerHTML = "";
    $("#detailHeading")[0].append(item.Name);
    $("#leftButton")[0].style.visibility = "visible";
    $("#rightButton")[0].style.visibility = "visible";
    $("#itemID")[0].style.backgroundColor = "lightgrey";
    $("#itemAvailability")[0].style.backgroundColor = "lightgrey";
    $("#itemTotalStock")[0].style.backgroundColor = "lightgrey";

    itemInputs(item);

    var img1 = document.createElement("img");
    img1.src = "style/save.png";

    $("#leftButton")[0].innerHTML = "";
    $("#leftButton")[0].append(img1);
    $("#leftButton")[0].addEventListener("click", function () {
        updateItem(item.Id);
        $("#leftButton")[0].style.visibility = "hidden";
        $("#rightButton")[0].style.visibility = "hidden";
        $("#itemID")[0].style.backgroundColor = "white";
        $("#itemAvailability")[0].style.backgroundColor = "white";
        $("#itemTotalStock")[0].style.backgroundColor = "white";
        displayItemDetails(item);
    });
    
    $("#rightButton")[0].addEventListener("click", function () {
        $("#leftButton")[0].style.visibility = "hidden";
        $("#rightButton")[0].style.visibility = "hidden";
        $("#itemID")[0].style.backgroundColor = "white";
        $("#itemAvailability")[0].style.backgroundColor = "white";
        $("#itemTotalStock")[0].style.backgroundColor = "white";
        displayItemDetails(item);
    });
}

// Send edited data to controller
function updateItem(id) {
    ModelController.UpdateModelDetails(
        id,
        $("#itemName")[0].value,
        $("#itemType")[0].value,
        $("#itemSbjArea")[0].value,
        $("#itemPrice")[0].value,
        $("#itemDescription")[0].value,
        onUpdateItem
    );
}

function onUpdateItem(item) {
    //  Refreshes the updated button 
    $("#" + item.Id).innerHTML = item.Name;
    $("#" + item.Id).addEventListener("click", function () {
        displayItemDetails(item);
    });
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

function onDeleteItem(item) {
    clearDisplay();
    // remove corresponding button from list
    $("#" + item.Id).remove();
    resultPopup("Item was successfully removed.", "green");
}

// closes the delete prompt
function closeDelete() {
    results.style.display = "none";
}

// removes any details that are displayed in the details section
function clearDisplay() {
    $("#detailHeading")[0].style.visibility = "hidden";
    $("#details")[0].style.visibility = "hidden";
    $("#detailOptions")[0].style.visibility = "hidden";
}

//Add new item to model table
function displayAddItem() {
    $("#detailHeading")[0].innerHTML = "";
    $("#detailHeading")[0].innerHTML = "Add a New Model";
    $("#detailHeading")[0].style.visibility = "visible";
    $("#details")[0].style.visibility = "visible";
    $("#leftButton")[0].style.visibility = "visible";
    $("#rightButton")[0].style.visibility = "visible";
    $("#itemID")[0].style.backgroundColor = "lightgrey";
    $("#itemID")[0].innerHTML = "";
    $("#itemAvailability")[0].style.backgroundColor = "lightgrey";
    $("#itemAvailability")[0].innerHTML = "";
    $("#itemTotalStock")[0].style.backgroundColor = "lightgrey";
    $("#itemTotalStock")[0].innerHTML = "";
    $("#detailOptions")[0].style.visibility = "hidden";

    var item = {
        "Name": "",
        "Type": "",
        "SbjArea": "",
        "Price": "",
        "Description": ""
    }
    itemInputs(item);

    var img1 = document.createElement("img");
    img1.src = "style/add.png";

    $("#leftButton")[0].innerHTML = "";
    $("#leftButton")[0].append(img1);
    $("#leftButton")[0].addEventListener("click", function () {
        updateItem(item.Id);                                        //Linh: why updateItem() is needed here when we already have addNewItem()?
        $("#leftButton")[0].style.visibility = "hidden";
        $("#rightButton")[0].style.visibility = "hidden";
        $("#itemID")[0].style.backgroundColor = "white";
        $("#itemAvailability")[0].style.backgroundColor = "white";
        $("#itemTotalStock")[0].style.backgroundColor = "white";
        addNewItem(item);
    });

    $("#rightButton")[0].addEventListener("click", function () {
        $("#leftButton")[0].style.visibility = "hidden";
        $("#rightButton")[0].style.visibility = "hidden";
        $("#itemID")[0].style.backgroundColor = "white";
        $("#itemAvailability")[0].style.backgroundColor = "white";
        $("#itemTotalStock")[0].style.backgroundColor = "white";
        clearDisplay();
    });
}

// Sends input to controller
function addNewItem() {
    ModelController.AddNewModel(
        $("#itemName")[0].value,
        $("#itemType")[0].value,
        $("#itemSbjArea")[0].value,
        $("#itemPrice")[0].value,
        $("#itemDescription")[0].value,
        onAddNewItem
    );
}

function onAddNewItem(item) {
    clearDisplay();
    // add single new button
    button = document.createElement("button");
    button.innerHTML = item.Name;
    button.setAttribute("id", item.Id);
    button.setAttribute("type", "button");
    button.setAttribute("class", "listItem");
    button.addEventListener("click", function () {
        displayItemDetails(item);
    });
    $("#list")[0].append(button);
    resultPopup("Successfully added to the database.", "green");
}
