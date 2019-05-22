// on Page load...
$(document).ready(function () {
    // display all contacts
    var contacts;
    var searchedContacts;
    getAllSearchedContacts();
    // prevent form submission on enter
    $('form').keypress(function (event) {
        return event.keyCode != 13;
    });
    // Search as the user types
    var searchbar = $("#searchbar")[0];
    searchbar.addEventListener("keyup", function (event) {
        event.preventDefault();
        getAllSearchedContacts();
    });
    $("#advSearch")[0].addEventListener("click", function () {
        displayAdvSearch();
    });
    $("#addButton")[0].addEventListener("click", function () {
        displayAddContact();
    });
});

// Display contacts in list based on search
function getAllSearchedContacts() {
    var searchInput = document.getElementById("searchbar").value;
    ContactsController.Search(searchInput, onSearchContacts);
}

function onSearchContacts(result) {
    contacts = JSON.parse(result);
    displayContactNames(contacts);
}

//Advanced search display
function displayAdvSearch() {
    clearDisplay();
    $("#detailHeading")[0].style.visibility = "visible";
    $("#detailHeading")[0].innerHTML = "Advanced Search";
}

// Creates and displays a list of buttons representing contacts in the inventory. 
function displayContactNames(contacts) {
    $("#list")[0].innerHTML = "";
    var button;
    for (var i = contacts.length - 1; i >= 0; i--) {
        button = document.createElement("button");
        button.append(contacts[i].Name);
        button.setAttribute("id", contacts[i].Id);
        button.setAttribute("type", "button");
        button.setAttribute("class", "listItem");
        let contact = contacts[i];
        button.addEventListener("click", function () {
            displayContactDetails(contact);
        });
        $("#list")[0].append(button);
    }
}

// Displays an contacts details
function displayContactDetails(contact) {
    // set display
    clearDisplay();
    $("#detailHeading")[0].innerHTML = contact.Name;
    $("#detailHeading")[0].style.visibility = "visible";
    $("#detailOptions")[0].style.visibility = "visible";
    $("#details")[0].style.visibility = "visible";
    $("#editContact")[0].addEventListener("click", function () {
        editContactDetails(contact);
    });
    $("#deleteContact")[0].addEventListener("click", function () {
        displayDeleteContact(contact);
    });

    activeItem(contact.Id);
    $("#contactID")[0].innerHTML = contact.Id;
    $("#contactSupIDInput")[0].value = contact.SupID;
    $("#contactFullNameInput")[0].value = contact.Name;
    $("#contactPhoneNoInput")[0].value = contact.Phone;
}

// Edit details
function editContactDetails(contact) {
    clearDisplay();
    $("#detailHeading")[0].style.visibility = "visible";
    $("#details")[0].style.visibility = "visible";
    $("#leftButton")[0].style.visibility = "visible";
    $("#rightButton")[0].style.visibility = "visible";
    $("#contactID")[0].style.backgroundColor = "lightgrey";
    $("#detailHeading")[0].append(contact.Name);

    $("#contactSupIDInput").removeAttr("disabled");
    $("#contactFullNameInput").removeAttr("disabled");
    $("#contactPhoneNoInput").removeAttr("disabled");

    $("#contactSupIDInput")[0].value = contact.SupID;
    $("#contactFullNameInput")[0].value = contact.Name;
    $("#contactPhoneNoInput")[0].value = contact.Phone;

    $("#contactID")[0].append(contact.Id);

    var img1 = document.createElement("img");
    img1.src = "style/save.png";

    $("#leftButton")[0].innerHTML = "";
    $("#leftButton")[0].append(img1);
    $("body").on("click", "#leftButton", function () {
        updateContact(contact);
    });
    $("body").on("click", "#rightButton", function () {
        displayContactDetails(contact);
    });
}

// Send edited data to controller
function updateContact(contact) {
    if (validateInput()) {
        ContactsController.Update(
            contact.Id,
            $("#contactSupIDInput")[0].value,
            $("#contactFullNameInput")[0].value,
            $("#contactPhoneNoInput")[0].value,
            onUpdateContact
        );
    }
    console.log(contact.Id,
        $("#contactSupIDInput")[0].value,
        $("#contactFullNameInput")[0].value,
        $("#contactPhoneNoInput")[0].value);
}

function onUpdateContact(result) {
    console.log(result);
    var contact = JSON.parse(result);
    var newcontact = {
        "Id": contact.Id,
        "SupID": contact.SupID,
        "FullName": contact.Name,
        "PhoneNo":contact.Phone
    }
    //  Refreshes the updated button 
    $("#" + newcontact.Id)[0].innerHTML = contact.Name;
    $("#" + newcontact.Id)[0].addEventListener("click", function () {
        displayContactDetails(contact);
    });
    displayContactDetails(contact);
    resultPopup("Successfully updated contact in the Database.", "green");
}

//displays the delete model prompt
function displayDeleteContact(contact) {
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
        deleteContact(contact.Id);
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

    $("#results")[0].append("Are you sure you want to delete this contact ");
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

// sends id of contact to be deleted to controller
function deleteContact(id) {
    results.style.display = "none";
    ContactsController.Delete(id, onDeleteContact);
}

function onDeleteContact(id) {
    clearDisplay();
    activeItem("");
    // remove corresponding button from list
    $("#" + id)[0].remove();
    resultPopup("Contact was successfully removed.", "green");
}

// closes the delete prompt
function closeDelete() {
    results.style.display = "none";
}

// removes any details that are displayed in the details section
function clearDisplay() {
    $("#detailHeading")[0].innerHTML = "";
    $("#detailHeading")[0].style.visibility = "hidden";
    $("#details")[0].style.visibility = "hidden";
    $("#detailOptions")[0].style.visibility = "hidden";
    $("#leftButton")[0].style.visibility = "hidden";
    $("#rightButton")[0].style.visibility = "hidden";
    $("#results")[0].style.display = "none";
    $("#contactID")[0].style.backgroundColor = "white";
    $("#contactID")[0].innerHTML = "";
    $("#contactFullNameInput")[0].value = "";
    $("#contactPhoneNoInput")[0].value = "";
    $("#contactFullNameInput").attr({ "disabled": "disabled" });
    $("#contactPhoneNoInput").attr({ "disabled": "disabled" });
    $("body").off("click", "#leftButton");
    $("body").off("click", "#rightButton");
}

//Add new contact to model table
function displayAddContact() {
    //reset detail display to have correct elements for this menu.
    clearDisplay();
    $("#detailHeading")[0].innerHTML = "Add a New Contact";
    $("#detailHeading")[0].style.visibility = "visible";
    $("#details")[0].style.visibility = "visible";
    $("#leftButton")[0].style.visibility = "visible";
    $("#rightButton")[0].style.visibility = "visible";
    $("#contactID")[0].style.backgroundColor = "lightgrey";
    activeItem("");

    $("#contactSupIDInput").removeAttr("disabled");
    $("#contactFullNameInput").removeAttr("disabled");
    $("#contactPhoneNoInput").removeAttr("disabled");

    // set details for left button
    var img1 = document.createElement("img");
    img1.src = "style/add.png";
    $("#leftButton")[0].innerHTML = "";
    $("#leftButton")[0].append(img1);
    $("body").on("click", "#leftButton", addNewContact);
    $("body").on("click", "#rightButton", clearDisplay);
}

function validateInput() {
    var supid = $("#contactSupIDInput")[0].value;
    var name = $("#contactFullNameInput")[0].value;
    var phoneno = $("#contactPhoneNoInput")[0].value;
    if (supid === '' || name === '' || phoneno === '') {
        alert("Please input: Full Name or Phone Number!");
        return false;
    }
    else {
        return true;
    }
}

// Sends input to controller
function addNewContact() {
    if (validateInput()) {
        ContactsController.Add(
            $("#contactSupIDInput")[0].value,
            $("#contactFullNameInput")[0].value,
            $("#contactPhoneNoInput")[0].value,
            onAddNewContact
        );
    }
}

function onAddNewContact(result) {
    clearDisplay();
    getAllSearchedContacts();
    resultPopup("Successfully added to the database.", "green");
}