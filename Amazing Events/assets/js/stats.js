import { tableOne } from "../module/functions.js";

fetch("https://mindhub-xj03.onrender.com/api/amazing")
  .then(response => response.json())
  .then(data => {
    const currentDate = data.currentDate;
    tableOne(data.events, currentDate);

    const tableTwo = () => {
      const arrayUpcomingCat = [...new Set(data.events.filter(element => element.date > currentDate).map(event => event.category))];

      arrayUpcomingCat.forEach(category => {
        const eventCategory = data.events.filter(event => event.category == category && event.date > currentDate);

        const revenueTotalByCategory = eventCategory.reduce((acc, event) => {
          return acc + (event.estimate * event.price);
        }, 0).toLocaleString();

        const percentageTotalByCategory = (eventCategory.reduce((acc, event) => {
          return acc + ((event.estimate * 100) / event.capacity);
        }, 0) / eventCategory.length).toFixed(2);

        const tableTwoContainer = document.getElementById("secondTable");
        const tr = document.createElement('tr');
        const td = document.createElement('td');
        td.textContent = category;
        tr.appendChild(td);

        const tdRevenue = document.createElement('td');
        tdRevenue.textContent = `$${revenueTotalByCategory}`;
        tr.appendChild(tdRevenue);

        const tdPercentage = document.createElement('td');
        tdPercentage.textContent = `${percentageTotalByCategory}%`;
        tr.appendChild(tdPercentage);

        tableTwoContainer.appendChild(tr);
      });
    };

    tableTwo();

    const tableThree = () => {
      const arrayUpcomingCat = [...new Set(data.events.filter(element => element.date < currentDate).map(event => event.category))];

      arrayUpcomingCat.forEach(category => {
        const eventCategory = data.events.filter(event => event.category == category && event.date < currentDate);

        const revenueTotalByCategory = eventCategory.reduce((acc, event) => {
          return acc + (event.assistance * event.price);
        }, 0).toLocaleString();

        const percentageTotalByCategory = (eventCategory.reduce((acc, event) => {
          return acc + ((event.assistance * 100) / event.capacity);
        }, 0) / eventCategory.length).toFixed(2);

        const tableThreeContainer = document.getElementById("thirdTable");
        const tr = document.createElement('tr');
        const td = document.createElement('td');
        td.textContent = category;
        tr.appendChild(td);

        const tdRevenue = document.createElement('td');
        tdRevenue.textContent = `$${revenueTotalByCategory}`;
        tr.appendChild(tdRevenue);

        const tdPercentage = document.createElement('td');
        tdPercentage.textContent = `${percentageTotalByCategory}%`;
        tr.appendChild(tdPercentage);

        tableThreeContainer.appendChild(tr);
      });
    };

    tableThree();
  })
  .catch(error => console.error(error));
