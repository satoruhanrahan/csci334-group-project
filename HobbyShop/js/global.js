﻿$(document).ready(function () {
    $("#content").load("ModelsView.aspx");
    $("#Models")[0].addEventListener("click", function () {
        loadPage("Models", {});
    });
    $("#Sales")[0].addEventListener("click", function () {
        loadPage("Sales", {});
    });
    $("#Deliveries")[0].addEventListener("click", function () {
        loadPage("Deliveries", {});
    });
    $("#Suppliers")[0].addEventListener("click", function () {
        loadPage("Suppliers", {});
    });
    $("#Contacts")[0].addEventListener("click", function () {
        loadPage("Contacts", {});
    });
    $("#Customers")[0].addEventListener("click", function () {
        loadPage("Customers", {});
    });
    $("#Stores")[0].addEventListener("click", function () {
        loadPage("Stores", {});
    });
    $("#Users")[0].addEventListener("click", function () {
        loadPage("Users", {});
    });
    $("#Settings")[0].addEventListener("click", function () {
        loadPage("Settings", {});
    });
});

function loadPage(page, params) {
    switchTabs("header", page);
    $("#content").load(page + "View.aspx", params);
}

function switchTabs(containerId, activeTab) {
    var tabs = document.getElementById(containerId).getElementsByClassName("tab");
    for (i = 0; i < tabs.length; i++) {
        tabs[i].className = tabs[i].className.replace(" active", "");
    }
    document.getElementById(activeTab).className += " active";
}

function resultPopup(result, color) {
    var results = $("#results")[0];
    var bg = "light" + color;
    if (color == "red") {
        bg = "indianred";
    }
    results.innerHTML = "";
    results.append(result);
    results.style.borderColor = color;
    results.style.backgroundColor = bg;
    results.style.display = "block";
    setTimeout(function () {
        results.style.display = "none";
        results.style.backgroundColor = "white";
    }, 1000)
}