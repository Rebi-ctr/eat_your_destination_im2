// ─────────────────────────────────────────────────────────────────────────────
// 1. Time Setup
// ─────────────────────────────────────────────────────────────────────────────
let now = Math.floor(Date.now() / 1000); // current time in Unix timestamp (seconds)
let endTimecode = now + (12 * 60 * 60);   // 12 hours ahead
let startTimecode = now - (12 * 60 * 60); // 12 hours ago

// ─────────────────────────────────────────────────────────────────────────────
// 2. DOM Element
// ─────────────────────────────────────────────────────────────────────────────
let table_flights = document.querySelector("#Tabelle_Fluege");

// ─────────────────────────────────────────────────────────────────────────────
// 3. Load Flights and Airport Map
// ─────────────────────────────────────────────────────────────────────────────
const departureZurich = await loadDepartureZurich(startTimecode, endTimecode);
const airportMap = await loadAirportMap();

// ─────────────────────────────────────────────────────────────────────────────
// 4. Process and Display Flights
// ─────────────────────────────────────────────────────────────────────────────
let alldeparture = [];

departureZurich.forEach(answer => {
    let destinationName = airportMap[answer.estArrivalAirport] || answer.estArrivalAirport;

    if (destinationName !== null) {
        const splitted_destination = destinationName.split(","); // So mache ich ein Array aus dem String
        alldeparture.push({
            arrival: answer.firstSeen,
            departure: answer.lastSeen,
            destination: destinationName,
            flightsign: answer.callsign,
            country: splitted_destination[1]?.trim(), // Hier wird nur 2. Element des Arrays genommen (Land)
        });
    }

});

// Filter and display flights with destination
alldeparture.forEach(flightData => {
    if (flightData.destination !== null) {
        createRow(flightData);
    }
});

// ─────────────────────────────────────────────────────────────────────────────
// 5. Functions
// ─────────────────────────────────────────────────────────────────────────────

// 5.1 Load Flights from API
async function loadDepartureZurich(startTime, endTime) {
    // const url =`https://opensky-network.org/api/flights/departure?airport=LSZH&begin=${startTime}&end=${endTime}`;
    const url = `json/flights.json`;
    try {
        const response = await fetch(url);
        const answer = await response.json();
        return answer;
    } catch (error) {
        console.error(error);
        return false;
    }
}

// 5.2 Load ICAO → "City, Country" Map
async function loadAirportMap() {
    const url = "https://raw.githubusercontent.com/jpatokal/openflights/master/data/airports-extended.dat";
    const response = await fetch(url);
    const text = await response.text();

    const lines = text.split("\n");
    const map = {};

    lines.forEach(line => {
        const fields = line.split(',');

        const city = fields[2]?.replaceAll('"', '');
        const country = fields[3]?.replaceAll('"', '');
        const icao = fields[5]?.replaceAll('"', '');

        if (icao && city && country) {
            map[icao] = `${city}, ${country}`;
        }
    });

    return map;
}

// 5.3 Create a Table Row for a Flight
function createRow(flightData) {
    let row = document.createElement("tr");
    let cell1 = document.createElement("td");
    let cell2 = document.createElement("td");
    let cell3 = document.createElement("td");
    let cell4 = document.createElement("td");
    let cell5 = document.createElement("td");

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
    // cell5.inner = .add("button").innerText = "Get Menue";
    let button = document.createElement("button")
    button.innerText = "Go!";
    button.addEventListener("click", async () => {
        console.log(flightData );
        let region = getRegion(flightData.country);
        let meals = await loadMenueRegions(region);
        console.log(meals,region);

    // Pick a random meal from the region
    const randomMeal = meals[Math.floor(Math.random() * meals.length)];
    // load Details from random meal 
    const mealDetails = await loadMenueDetails(randomMeal.idMeal);
    // Display the meal details
    const fullMealInfo = {
        name: mealDetails.strMeal,
        instructions: mealDetails.strInstructions,
        image: mealDetails.strMealThumb,
        ingredients: getIngredients(mealDetails)
    };
    console.log(fullMealInfo);

    });
    cell5.appendChild(button);


    row.appendChild(cell1);
    row.appendChild(cell2);
    row.appendChild(cell3);
    row.appendChild(cell4);
    row.appendChild(cell5);



    table_flights.appendChild(row);
    }

function getRegion(country) {
    switch (country.trim().toLowerCase()) {
      case "afghanistan":
          return "Indian";
      case "albania":
          return "Greek";
      case "algeria":
          return "Tunisian";
      case "andorra":
          return "Spanish";
      case "anguilla":
          return "British";
      case "antarctica":
          return "British";
      case "antigua and barbuda":
          return "British";
      case "armenia":
          return "Russian";
      case "austria":
          return "German";
      case "azerbaijan":
          return "Turkish";
      case "bahrain":
          return "Egyptian";
      case "bangladesh":
          return "Indian";
      case "barbados":
          return "British";
      case "belarus":
          return "Russian";
      case "belgium":
          return "French";
      case "belize":
          return "British";
      case "benin":
          return "French";
      case "bhutan":
          return "Indian";
      case "bolivia":
          return "Spanish";
      case "bosnia and herzegovina":
          return "Croatian";
      case "botswana":
          return "Kenyan";
      case "bouvet island":
          return "British";
      case "brazil":
          return "Portuguese";
      case "brunei darussalam":
          return "Malaysian";
      case "bulgaria":
          return "Greek";
      case "burkina faso":
          return "French";
      case "burundi":
          return "French";
      case "cabo verde":
          return "Portuguese";
      case "cambodia":
          return "Vietnamese";
      case "cameroon":
          return "French";
      case "central african republic":
          return "French";
      case "chad":
          return "French";
      case "chile":
          return "Spanish";
      case "colombia":
          return "Spanish";
      case "comoros":
          return "French";
      case "congo":
          return "French";
      case "congo, the democratic republic of the":
          return "French";
      case "cook islands":
          return "British";
      case "costa rica":
          return "Spanish";
      case "croatia":
          return "Croatian";
      case "cuba":
          return "Spanish";
      case "curacao":
          return "Dutch";
      case "cyprus":
          return "Greek";
      case "czech republic":
          return "Polish";
      case "denmark":
          return "Dutch";
      case "djibouti":
          return "French";
      case "dominica":
          return "British";
      case "dominican republic":
          return "Spanish";
      case "ecuador":
          return "Spanish";
      case "egypt":
          return "Egyptian";
      case "el salvador":
          return "Spanish";
      case "equatorial guinea":
          return "Spanish";
      case "eritrea":
          return "Egyptian";
      case "estonia":
          return "Russian";
      case "eswatini":
          return "British";
      case "ethiopia":
          return "Egyptian";
      case "falkland islands":
          return "British";
      case "faroe islands":
          return "Dutch";
      case "fiji":
          return "British";
      case "finland":
          return "Russian";
      case "france":
          return "French";
      case "french guiana":
          return "French";
      case "french polynesia":
          return "French";
      case "french southern territories":
          return "French";
      case "gabon":
          return "French";
      case "gambia":
          return "Kenyan";
      case "georgia":
          return "Russian";
      case "germany":
          return "Polish";
      case "ghana":
          return "Kenyan";
      case "gibraltar":
          return "British";
      case "greece":
          return "Greek";
      case "greenland":
          return "Canadian";
      case "grenada":
          return "British";
      case "guadeloupe":
          return "French";
      case "guam":
          return "American";
      case "guatemala":
          return "Spanish";
      case "guernsey":
          return "British";
      case "guinea":
          return "French";
      case "guinea-bissau":
          return "Portuguese";
      case "guyana":
          return "British";
      case "haiti":
          return "French";
      case "heard island and mcdonald islands":
          return "British";
      case "honduras":
          return "Spanish";
      case "hong kong":
          return "Chinese";
      case "hungary":
          return "Polish";
      case "iceland":
          return "British";
      case "india":
          return "Indian";
      case "indonesia":
          return "Malaysian";
      case "iran":
          return "Indian";
      case "iraq":
          return "Egyptian";
      case "ireland":
          return "Irish";
      case "isle of man":
          return "British";
      case "israel":
          return "Greek";
      case "italy":
          return "Italian";
      case "jamaica":
          return "Jamaican";
      case "japan":
          return "Japanese";
      case "jersey":
          return "British";
      case "jordan":
          return "Egyptian";
      case "kazakhstan":
          return "Russian";
      case "kenya":
          return "Kenyan";
      case "kiribati":
          return "British";
      case "korea, democratic people's republic of":
          return "Chinese";
      case "korea, republic of":
          return "Chinese";
      case "kuwait":
          return "Egyptian";
      case "kyrgyzstan":
          return "Russian";
      case "lao people's democratic republic":
          return "Vietnamese";
      case "latvia":
          return "Russian";
      case "lebanon":
          return "Egyptian";
      case "lesotho":
          return "Kenyan";
      case "liberia":
          return "American";
      case "libya":
          return "Tunisian";
      case "liechtenstein":
          return "Polish";
      case "lithuania":
          return "Russian";
      case "luxembourg":
          return "French";
      case "macao":
          return "Chinese";
      case "macedonia":
          return "Greek";
      case "madagascar":
          return "French";
      case "malawi":
          return "Kenyan";
      case "malaysia":
          return "Malaysian";
      case "maldives":
          return "Indian";
      case "mali":
          return "French";
      case "malta":
          return "British";
      case "marshall islands":
          return "American";
      case "martinique":
          return "French";
      case "mauritania":
          return "Tunisian";
      case "mauritius":
          return "Kenyan";
      case "mayotte":
          return "French";
      case "mexico":
          return "Mexican";
      case "micronesia":
          return "American";
      case "moldova":
          return "Russian";
      case "monaco":
          return "French";
      case "mongolia":
          return "Chinese";
      case "montenegro":
          return "Croatian";
      case "montserrat":
          return "British";
      case "morocco":
          return "Moroccan";
      case "mozambique":
          return "Portuguese";
      case "myanmar":
          return "Thai";
      case "namibia":
          return "Kenyan";
      case "nauru":
          return "British";
      case "nepal":
          return "Indian";
      case "netherlands":
          return "Dutch";
      case "new caledonia":
          return "French";
      case "new zealand":
          return "British";
      case "nicaragua":
          return "Spanish";
      case "niger":
          return "French";
      case "nigeria":
          return "Kenyan";
      case "niue":
          return "British";
      case "norfolk island":
          return "British";
      case "north macedonia":
          return "Greek";
      case "northern mariana islands":
          return "American";
      case "norway":
          return "Dutch";
      case "oman":
          return "Egyptian";
      case "pakistan":
          return "Indian";
      case "palau":
          return "American";
      case "palestine, state of":
          return "Egyptian";
      case "panama":
          return "Spanish";
      case "papua new guinea":
          return "British";
      case "paraguay":
          return "Spanish";
      case "peru":
          return "Spanish";
      case "philippines":
          return "Filipino";
      case "pitcairn":
          return "British";
      case "poland":
          return "Polish";
      case "portugal":
          return "Portuguese";
      case "puerto rico":
          return "American";
      case "qatar":
          return "Egyptian";
      case "reunion":
          return "French";
      case "romania":
          return "Greek";
      case "russian federation":
          return "Russian";
      case "rwanda":
          return "French";
      case "saint barthelemy":
          return "French";
      case "saint helena, ascension and tristan da cunha":
          return "British";
      case "saint kitts and nevis":
          return "British";
      case "saint lucia":
          return "British";
      case "saint martin":
          return "French";
      case "saint pierre and miquelon":
          return "French";
      case "saint vincent and the grenadines":
          return "British";
      case "samoa":
          return "British";
      case "san marino":
          return "Italian";
      case "sao tome and principe":
          return "Portuguese";
      case "saudi arabia":
          return "Egyptian";
      case "senegal":
          return "French";
      case "serbia":
          return "Croatian";
      case "seychelles":
          return "French";
      case "sierra leone":
          return "Kenyan";
      case "singapore":
          return "British";
      case "slovakia":
          return "Polish";
      case "slovenia":
          return "Croatian";
      case "solomon islands":
          return "British";
      case "somalia":
          return "Egyptian";
      case "south africa":
          return "Kenyan";
      case "south georgia and the south sandwich islands":
          return "British";
      case "south sudan":
          return "British";
      case "spain":
          return "Spanish";
      case "sri lanka":
          return "Indian";
      case "sudan":
          return "Egyptian";
      case "suriname":
          return "Dutch";
      case "swaziland":
          return "Kenyan";
      case "sweden":
          return "Dutch";
      case "switzerland":
          return "French";
      case "syrian arab republic":
          return "Egyptian";
      case "taiwan":
          return "Chinese";
      case "tajikistan":
          return "Russian";
      case "tanzania":
          return "Kenyan";
      case "thailand":
          return "Thai";
      case "timor-leste":
          return "Portuguese";
      case "togo":
          return "French";
      case "tokelau":
          return "British";
      case "tonga":
          return "British";
      case "trinidad and tobago":
          return "British";
      case "tunisia":
          return "Tunisian";
      case "turkey":
          return "Turkish";
      case "turkmenistan":
          return "Turkish";
      case "tuvalu":
          return "British";
      case "uganda":
          return "Kenyan";
      case "ukraine":
          return "Ukrainian";
      case "united arab emirates":
          return "Egyptian";
      case "united kingdom":
          return "British";
      case "united states":
          return "American";
      case "uruguay":
          return "Uruguayan";
      case "uzbekistan":
          return "Turkish";
      case "vanuatu":
          return "French";
      case "venezuela":
          return "Spanish";
      case "viet nam":
          return "Vietnamese";
      case "western sahara":
          return "Tunisian";
      case "yemen":
          return "Egyptian";
      case "zambia":
          return "Kenyan";
      case "zimbabwe":
          return "Kenyan";
      default:
          return "Unknown";
    }
  }

// Fetch meals by region 
async function loadMenueRegions(region) {
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${region}`;
    try {
        const response = await fetch(url);
        const answer = await response.json();
        return answer.meals;
    } catch (error) {
        console.error(error);
        return [];
    }
}


// Fetch full meal details by ID
async function loadMenueDetails(menueId) {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${menueId}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.meals[0]; // The meal object
    } catch (error) {
        console.error(error);
        return null;
    }
}

// Helper to extract ingredients and measurements
function getIngredients(meal) {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient && ingredient.trim()) {
            ingredients.push(`${measure} ${ingredient}`);
        }
    }
    return ingredients;
}
