var inventory = [];
loadInventory();
var carFocus;

// function populatePage (inventory)
// Load the inventory and send a callback function to be
// invoked after the process is complete
function loadInventory () { // Load the inventory
  var inventoryLoader = new XMLHttpRequest();
  inventoryLoader.addEventListener("load", function (e) { // Callback
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
    inventory += `<div class="col-sm-4 col-md-4">
    				<div class="card">
    				<h3 class="card-title">${loadInventory.cars[i].make}</h3>
            <img class="card-img-top img-responsive img-xs-center" ${loadInventory.cars[i].img} alt="Card image cap">
                    <div class="cardText">
                        <h4 class="year">${loadInventory.cars[i].year}</h4>
                        <h4 class="model">${loadInventory.cars[i].model}</h4>
                        <h3 class="price">${loadInventory.cars[i].price}</h3>
                        <p class="card-text">${loadInventory.cars[i].description}</a>
                      </div>
                    </div>
                  </div>  `
  }
  document.getElementById("cards").innerHTML = inventory;
  activateEvents();
  }

  function activateEvents() {
    // event listener on the cards
    for (let i = 0; i < document.querySelectorAll('.card').length; i++) {
        document.querySelectorAll('.card')[i].addEventListener('click', (e) => {
            // if the current card already has the cardClick class then remove it and background color
            if (e.currentTarget.classList.contains('cardClick')) {
                // e.currentTarget.classList.remove('cardClick');
                resetStyling();
            // if another card is clicked then remove the class and background color and add it to the one that is clicked
            } else if (document.querySelector('.cardClick')) {
                resetStyling();
                e.currentTarget.classList.add("cardClick");
                changeCardColor(e, "red");
            // else add the cardClick class to the target and change the background color
            } else {
                e.currentTarget.classList.add("cardClick");
                changeCardColor(e, "red");
            }
        });
    }
    // editCardDescription();
};


//Focus when Card is clicked//
  function focusCard(e){
  var el = document.querySelector("div.card"); // focuses on DOM near div.card
  tgtFocus = el.closest("div"); // looks for div closest to .vis in <img> (.card)
  if (tgtFocus.id === ""){ // id attribute of .card
    tgtFocus.id = "focusStyle"; // applies special styling focus to .card
    document.getElementById('modText').focus(); // puts focus on text input
    console.log("6.Card Clicked: ", tgtFocus, "ID: ",tgtFocus.id); //**** Message ****************************************6
    typeDescription(); // calls input text function
  }else{ // if card already has Id of #focusStle, it gets removed
    tgtFocus.id = ""; // clears focus if card is clicked again
    document.getElementById('modText').blur(); // blurs input field
    document.getElementById('modText').value = ""; // clears input field
  }
}

function typeDescription(e){
  document.getElementById("modText").value = document.querySelector("p.card-text").innerHTML; // loads text from <p> to input
}
function buttonSubmit(e){
  tgtFocus.id = ""; // clears focus style from card
  document.getElementById('modText').blur();
}
