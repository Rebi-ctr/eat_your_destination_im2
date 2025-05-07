let now = Math.floor(Date.now() / 1000); // current time in Unix timestamp (seconds)
let endTimecode = now + (12 * 60 * 60);     // 1 hours ago
let startTimecode = now - (12 * 60 * 60);      // 12 hours ago

let table_flights= document.querySelector("#Tabelle_Fluege");

const departureZurich = await loadDepartureZurich(startTimecode, endTimecode);

// Fetch the data from the API Flights
async function loadDepartureZurich(startTime, endTime) {
    const url =`https://opensky-network.org/api/flights/departure?airport=LSZH&begin=${startTime}&end=${endTime}`;
    try {
        const response = await fetch(url);
        const answer = await response.json();
        return answer;
    } catch (error) {
        console.error(error);
        return false;
    }
}
// Display the data in the console
console.log(departureZurich);
//zeigt nur die 4 Daten an, die wir brauchen und macht ein neues Array
let alldeparture = [];
departureZurich.forEach(answer => {
    alldeparture.push({
        arrival: answer.firstSeen,
        departure: answer.lastSeen,
        destination: answer.estArrivalAirport,
        flightsign: answer.callsign
});
});
//Loop through the array and create a table row for each flight
alldeparture.forEach(flightData => {
    if (flightData.destination !== null) {
        createRow(flightData);
    }
}
);
// Create a table row for each flight
function createRow(flightData) {
    let row = document.createElement("tr");
    let cell1 = document.createElement("td");
    let cell2 = document.createElement("td");
    let cell3 = document.createElement("td");
    let cell4 = document.createElement("td");

    cell1.innerText = new Date(flightData.arrival * 1000).toLocaleTimeString("en-GB", {
        timeZone: "Europe/Zurich",
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });
    cell2.innerText = new Date(flightData.departure * 1000).toLocaleTimeString("en-GB", {
        timeZone: "Europe/Zurich",
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });
    cell3.innerText = flightData.destination;
    cell4.innerText = flightData.flightsign;

    row.appendChild(cell1);
    row.appendChild(cell2);
    row.appendChild(cell3);
    row.appendChild(cell4);

    table_flights.appendChild(row);
}
// fetch the data from the API Menues
const menueRegions = await loadMenueRegions();

async function loadMenueRegions() {
    const url =`https://www.themealdb.com/api/json/v1/1/filter.php?a=irish`;
    try {
        const response = await fetch(url);
        const answer = await response.json();
        return answer;
    } catch (error) {
        console.error(error);
        return false;
    }
} 
console.log(menueRegions);