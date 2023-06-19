import { createCheckbox, printCards } from "../../assets/module/functions.js";
const $cardsContainerPast = document.getElementById("pastEvents");
const $formCheckBoxespast = document.getElementById("pastCheck");
const $searchInputpast = document.getElementById("searchPast");

fetch('https://mindhub-xj03.onrender.com/api/amazing')
  .then(response => response.json()) 
  .then(res => {
    let data = res;
    let eventsJson = data.events;
    
    createCheckbox(eventsJson, $formCheckBoxespast);
    printCards(eventsJson, $cardsContainerPast);
    
    const filtersCardsPast = () => {
      let currentDate = new Date(data.currentDate);
      
      let checked = [...document.querySelectorAll('input[type="checkbox"]:checked')].map(ele => ele.value);
      let filteredByCheckbox = eventsJson.filter(event => checked.includes(event.category) || checked.length === 0);
      let filteredBySearch = filteredByCheckbox.filter(event => {
        let eventDate = new Date(event.date);
        return eventDate < currentDate;
      }).filter(event => event.name.toLowerCase().includes($searchInputpast.value.toLowerCase()));
      
      printCards(filteredBySearch, $cardsContainerPast);
    };
    
    $searchInputpast.addEventListener('keyup', filtersCardsPast); 
    $formCheckBoxespast.addEventListener('change', filtersCardsPast); 
  })
  .catch(err => console.log(err));
