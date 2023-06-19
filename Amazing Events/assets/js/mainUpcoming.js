import { createCheckbox, printCards } from "../module/functions.js";
const $cardsContainerUpcoming = document.getElementById("sectionUpcomingEvents");
const $formCheckBoxesUpcoming = document.getElementById("upCheck");
const $searchInputUpcoming = document.getElementById("searchUp");

fetch('https://mindhub-xj03.onrender.com/api/amazing')
  .then(response => response.json()) 
  .then(res => {
    let data = res;
    let eventsJson = data.events;
    
    createCheckbox(eventsJson, $formCheckBoxesUpcoming);
    printCards(eventsJson, $cardsContainerUpcoming);
    
    const filtersCardsUpcoming = () => {
      let currentDate = new Date(data.currentDate);
      
      let checked = [...document.querySelectorAll('input[type="checkbox"]:checked')].map(ele => ele.value);
      let filteredByCheckbox = eventsJson.filter(event => checked.includes(event.category) || checked.length === 0);
      let filteredBySearch = filteredByCheckbox.filter(event => {
        let eventDate = new Date(event.date);
        return eventDate > currentDate;
      }).filter(event => event.name.toLowerCase().includes($searchInputUpcoming.value.toLowerCase()));
      
      printCards(filteredBySearch, $cardsContainerUpcoming);
    };
    
    $searchInputUpcoming.addEventListener('keyup', filtersCardsUpcoming); 
    $formCheckBoxesUpcoming.addEventListener('change', filtersCardsUpcoming); 
  })
  .catch(err => console.log(err));
