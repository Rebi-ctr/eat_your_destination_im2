document.addEventListener("DOMContentLoaded", () => {
    main();
});

async function main() {
    const tableFlights = document.querySelector("#Tabelle_Fluege");

    const now = Math.floor(Date.now() / 1000);
    const startTime = now - (12 * 60 * 60); // 12 hours ago
    const endTime = now + (12 * 60 * 60);   // 12 hours from now

    try {
        const [departures, airportMap] = await Promise.all([
            fetchDeparturesFromZurich(startTime, endTime),
            loadAirportMap()
        ]);

        const flightsWithInfo = departures
            .filter(flight => flight.estArrivalAirport !== null)
            .map(flight => ({
                arrival: formatUnixTime(flight.firstSeen),
                departure: formatUnixTime(flight.lastSeen),
                destination: airportMap[flight.estArrivalAirport] || flight.estArrivalAirport,
                flightSign: flight.callsign
            }));

        flightsWithInfo.forEach(flight => {
            appendFlightRow(tableFlights, flight);
        });

    } catch (error) {
        console.error("Error loading data:", error);
    }
}

// Fetch flight data from OpenSky API
async function fetchDeparturesFromZurich(startTime, endTime) {
    const url = `https://opensky-network.org/api/flights/departure?airport=LSZH&begin=${startTime}&end=${endTime}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Failed to fetch departure data");
    }
    return await response.json();
}

// Parse airport data and return ICAO → "City, Country" map
async function loadAirportMap() {
    const url = "https://raw.githubusercontent.com/jpatokal/openflights/master/data/airports-extended.dat";
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Failed to fetch airport map");
    }

    const text = await response.text();
    const lines = text.split("\n");
    const map = {};

    for (const line of lines) {
        const fields = line.split(",");
        const city = fields[2]?.replaceAll('"', '');
        const country = fields[3]?.replaceAll('"', '');
        const icao = fields[5]?.replaceAll('"', '');

        if (icao && city && country) {
            map[icao] = `${city}, ${country}`;
        }
    }

    return map;
}

// Format Unix timestamp to "HH:mm" in Zurich timezone
function formatUnixTime(timestamp) {
    return new Date(timestamp * 1000).toLocaleTimeString("en-GB", {
        timeZone: "Europe/Zurich",
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });
}

// Append a row to the flight table
function appendFlightRow(table, flight) {
    const row = document.createElement("tr");

    const cellArrival = createCell(flight.arrival);
    const cellDeparture = createCell(flight.departure);
    const cellDestination = createCell(flight.destination);
    const cellFlightSign = createCell(flight.flightSign);

    row.append(cellArrival, cellDeparture, cellDestination, cellFlightSign);
    table.appendChild(row);
}

// Utility to create a table cell with text
function createCell(text) {
    const cell = document.createElement("td");
    cell.innerText = text;
    return cell;
}