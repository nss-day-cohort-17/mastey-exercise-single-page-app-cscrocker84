var inventory = [];
loadInventory();
var focus;

// function populatePage (inventory)
// Load the inventory and send a callback function to be
// invoked after the process is complete
function loadInventory (callback) { // Load the inventory
  var inventoryLoader = new XMLHttpRequest();
  inventoryLoader.addEventListener("load", function (e) { // Callback .......=
  loadInventory = JSON.parse(e.target.responseText);//.......................=
  console.log("Load complete.");//...........................................=**** Message
  console.log("JSON: ", loadInventory);//....................................=**** Shows the JSON
  populatePage(e);//.........................................................=
  console.log("Number of cars in inventory: ",loadInventory.cars.length);//..=**** Number of cars in inventory
  });
   // inventoryLoader.open("GET", "inventory.json");  JSON Called from File
  inventoryLoader.open("GET", "https://csc1-a3e8f.firebaseio.com/.json");
  inventoryLoader.send();
}// function populatePage (inventory)
  // Loop over the inventory and populate the page
  function populatePage () {
  for(var i = 0; i < loadInventory.cars.length; i++){ // Loops through the JSON Parse to create inner HTML
    inventory += `<div class="col-lg-4 col-md-6">
    				<div class="card">
    				<img class="card-img-top img-responsive img-xs-center" ${loadInventory.cars[i].img} alt="Card image cap">
                    <div class="cardText">
                        <h3 class="card-title">${loadInventory.cars[i].make}</h3>
                        <h4 class="year">${loadInventory.cars[i].year}</h4>
                        <h4 class="model">${loadInventory.cars[i].model}</h4>
                        <h3 class="price">${loadInventory.cars[i].price}</h3>
                        <p class="card-text">${loadInventory.cars[i].description}</a>
                      </div>
                    </div>
                  </div>  `
  }
  document.getElementById("cards").innerHTML = inventory;
  activateEvent();
  }

  function actionEvents(e){
  	document.getElementById("cards").addEventListener("click", cardFocus);
  	document.getElementById("submitButton").addEventListener("click", buttonSubmit);
    document.getElementById('modText').addEventListener("keyup", typeDescription);
  }
