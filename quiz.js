let inventory = [];
let carSection = document.querySelector('.cards');


loadInventory();

// function populatePage (inventory)
// Load the inventory and send a callback function to be
// invoked after the process is complete

function loadInventory() {
  const inventoryLoader = new XMLHttpRequest();
  inventoryLoader.addEventListener("load", populatePage);
  inventoryLoader.open("GET", "inventory.json");
  inventoryLoader.send();
}
// function populatePage (inventory)
function populatePage (e) {
    inventory = JSON.parse(e.target.responseText);
    // Get reference to the autos section of html
    const carList = document.querySelector('.autos');
    // empty the autos section
    carSection.innerHTML = "";
    // declare car inventory variable
    let carInventory = "";
    // loop over the inventory and load to page
    for (let i = 0; i < inventory.cars.length; i++) {
        if (i%3 === 0) {
            carInventory += `<div class="row">`;
        }
        carInventory +=
        `<div class="col-md-4 col-sm-6">
            <div class="card">
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">${inventory.cars[i].year} ${inventory.cars[i].make} ${inventory.cars[i].model}</li>
                </ul>
                <div class="card-block">
                    <p class="card-text">${inventory.cars[i].description}</p>
                    <h5 class="card-title">$${inventory.cars[i].price}</h5>
                </div>
            </div>
        </div>`;
        if (i%3 === 2) {
            carInventory += `</div>`;
        }
        if (i === (inventory.cars.length - 1)) {
            carInventory += `</div>`
        }
    }
    // write to the HTML
    carSection.innerHTML = carInventory;
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
                changeCardColor(e, "blue");
            }
        });
    }
    // editCardDescription();
};
