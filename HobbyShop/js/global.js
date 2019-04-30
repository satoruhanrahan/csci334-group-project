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