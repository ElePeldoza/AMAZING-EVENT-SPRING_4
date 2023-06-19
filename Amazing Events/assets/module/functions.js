
export function createCheckbox(eventos, checkboxContainer) {
    let fn = eventos => eventos.category
  let categoryCheckbox = new Set( eventos.filter( fn ).map( fn ))
  categoryCheckbox.forEach( category => {
    checkboxContainer.innerHTML += ` <div class>
    <input type="checkbox" id="${category}" name="Category" value="${category}">
    <label for="${category}">${category}</label>
  </div>`
  })
  
}

export function createCards(eventos){
              let div = document.createElement('DIV')
           
              div.innerHTML= `<div class="card bg-dark text-white shadow p-2 mb-5 ms-3 me-3 rounded border-white" style="width: 18rem;">
                                        
              <img src="${eventos.image}" class="card-img-top bg-b  ody-tertiary rounded" alt="...">
                  
              <div class="card-body" >
                  <h5 class="card-title text-center"> ${eventos.name} </h5>
                  <p class="card-text text-end">${eventos.date}</p>
                  <p class="card-text text-center">${eventos.description}</p>
                  
              </div> 
              <div class="card-body d-flex align-items-end justify-content-between ">
                      <p>Price: $ ${eventos.price}</p>
                      <a class="d-flex link-light justify-content-end text-decoration-none w-50" href="/assets/paginas/details.html?id=${eventos._id}"><button class="btn btn-outline-secondary link-light  text-decoration-none ">Buy</button></a>
              </div>     
            </div>`
      return div
}

export function printCards(eventos, container) {
  container.innerHTML = '';
  let fragment = document.createDocumentFragment();
  eventos.forEach(evento => fragment.appendChild(createCards(evento)));
  container.appendChild(fragment);
}

export function printTableOne(minAssistance, maxAssistance, minPercent, maxPercent, moreCap){

  const tableOneContainer = document.getElementById("firstTable")

  tableOneContainer.innerHTML = `
    <tr>
      <td>${maxAssistance.name} ${maxPercent}%</td>       
      <td>${minAssistance.name} ${minPercent}%</td>
      <td>${moreCap.name} ${moreCap.capacity.toLocaleString()}</td>
    </tr>
  `
}

export function tableOne(events, currentDate){
  
  let infoEvent = events.map(event => event.events) 
  infoEvent = events.filter(event => event.date < currentDate).sort((a, b) => (100 * a.assistance / a.capacity) - (100 * b.assistance / b.capacity))

  const minAssistance = infoEvent[0]
  const maxAssistance = infoEvent[infoEvent.length - 1]

  const minPercent = (100 * minAssistance.assistance / minAssistance.capacity).toFixed(1)
  const maxPercent = (100 * maxAssistance.assistance / maxAssistance.capacity).toFixed(1)

  const capacity = events.sort((a, b) => a.capacity - b.capacity);
  const moreCap = capacity[capacity.length - 1]

  printTableOne(minAssistance, maxAssistance, minPercent, maxPercent, moreCap)
  
}


