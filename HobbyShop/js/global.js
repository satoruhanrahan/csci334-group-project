$(document).ready(function () {
    $("#content").load("ModelsView.aspx");
});

function loadPage(page) {
    var tabs = document.getElementsByClassName("tab");
    for (i = 0; i < tabs.length; i++) {
        tabs[i].className = tabs[i].className.replace(" active", "");
    }
    document.getElementById(page).className += " active";
    $("#content").load(page + "View.aspx");
}

function resultPopup(result, color) {
    var results = document.getElementById("results");
    var bg = "light" + color;
    if (color == "red") {
        bg = "indianred";
    }
    results.innerHTML = result;
    results.style.borderColor = color;
    results.style.backgroundColor = bg;
    results.style.display = "block";
    setTimeout(function () {
        results.style.display = "none";
        results.style.backgroundColor = "white";
    }, 3000)
}