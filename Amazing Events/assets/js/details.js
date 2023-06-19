

fetch('https://mindhub-xj03.onrender.com/api/amazing')
  .then(response => response.json()) // Add parameter name "response"
  .then(res => {
    
const events = res.events
const $contenedor = document.getElementById(`card-details`)

const params = new URLSearchParams(location.search)// es el pedazo de informacion extraida de la url

const idEvent = params.get(`id`) // el id (parametro) extraido de la info saca de la url



const eventFound = events.find( elemento => elemento._id == idEvent )

$contenedor.innerHTML = `
<div class="d-flex border border-white m-5 bg-secondary p-4 rounded w"  >
 <img src="${eventFound.image}" class="Shadow-lg p-1 bg-body-tertiary rounded w-50 object-fit-cover">
 <div class="text-white w-50 ps-3 pe-4 pt-4">
     <h2 class="fs-3 ">${eventFound.name}</h2>
     <h6 class="text-end">Date: ${eventFound.date}</h6>
     <h3 class="text-center">${eventFound.description}</h4>
     <h6>Category: ${eventFound.category}</h5>
     <h6>Place: ${eventFound.place}</h5>
     <h6>Capacity:${eventFound.capacity}</h6>
     <h6>Assistance:${eventFound.assistance}</h6>
     
     <h3 class="d-flex align-self-end "> Price: ${eventFound.price}</h3>

 </div>
</div>

`
   
  })
  .catch(err => console.log(err));

