// display all sale items
function getInventoryName() {
    Service1.GetInventoryName(onGetInventoryName);
}

function onGetInventoryName(result) {
    var names = JSON.parse(result);
    displayInventoryName(names);
}


function displayInventoryName(names) {
    var contents = document.getElementById("pageContents");
    
    var count = 0;
    for (var i = names.length - 1; i >= 0; i--) {
        count++;
        
        var node = document.createElement("pageContents");                 
        var textnode = document.createTextNode(names[i] + "<br>");
        
        node.appendChild(textnode);                              
        document.getElementById("test").appendChild(node);
    }
}

//Add new item to model table


function addNewItemModel() {
    var name = document.getElementById("modelName").value;
    var type = document.getElementById("modelType").value;
    var sbjarea = document.getElementById("modelArea").value;
    var price = document.getElementById("modelPrice").value;
    var des = document.getElementById("modelDes").value;
    var avail = document.getElementById("modelAvail").value;
   
    Service1.AddNewModel(name, type, sbjarea, price, des, avail, onInputNewModel );
}

function onInputNewModel(result) {
    if (result === "") {
        document.getElementById("results").innerHTML = "Successfully added to the database";
    }
}
