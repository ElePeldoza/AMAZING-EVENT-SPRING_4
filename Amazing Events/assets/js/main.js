import { createCheckbox, printCards} from "../../assets/module/functions.js";

const $cardsContainer = document.getElementById("contenedor");
const $formCheckBoxes = document.getElementById("checkBoxCategorys");
const $searchInput = document.getElementById("search");


fetch('https://mindhub-xj03.onrender.com/api/amazing')
  .then(response => response.json())
  .then(data => {
    let eventsJson = data.events.filter(event => event.category);

    createCheckbox(eventsJson, $formCheckBoxes);
    printCards(eventsJson, $cardsContainer);
    
    const filtersCards = () => {
      let checked = [...document.querySelectorAll('input[type="checkbox"]:checked')].map(ele => ele.value);
      let filteredByCheckbox = data.events.filter(event => checked.includes(event.category) || checked.length === 0);
      let filteredBySearch = filteredByCheckbox.filter(evento => evento.name.toLowerCase().includes($searchInput.value.toLowerCase()));
      printCards(filteredBySearch, $cardsContainer);
    };
    $searchInput.addEventListener('keyup', filtersCards);
    $formCheckBoxes.addEventListener('change', filtersCards);
  })
  .catch(err => console.log(err));

