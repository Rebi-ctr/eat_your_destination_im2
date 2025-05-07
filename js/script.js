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
//Loop das alle Flüge ohne Enddestination nicht angezeit werden
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
// // fetch the data from the API Menues
// // const selectedRegion = )];
// async function loadMenueRegions(region) {
//     const url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${region}`;
//     try {
//         const response = await fetch(url);
//         const answer = await response.json();
//         return answer.meals; // ✅ return just the array of meals
//     } catch (error) {
//         console.error(error);
//         return [];
//     }
// }

// (async () => {
//     const menueRegions = await loadMenueRegions("American");

//     if (menueRegions.length > 0) {
//         const randomIndex = Math.floor(Math.random() * menueRegions.length);
//         const randomMenue = menueRegions[randomIndex];

//         console.log("Random American meal:", randomMenue);
//         // Optional: fetch full meal details by ID
//         // const fullDetails = await loadMenueDetails(randomMenue.idMeal);
//     } 
// })();


// let menueId = "52772";// Example meal ID, replace with the one you want to fetch
// // Fetch the data from the API Menues
// async function loadMenueDetails(menueId) {
//     const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${menueId}`;
//     try {
//         const response = await fetch(url);
//         const data = await response.json();
//         return data.meals[0]; // The actual meal data
//     } catch (error) {
//         console.error(error);
//         return false;
//     }
// }

// // Filter the data to get only the relevant
// let menueInfos = [];

// loadMenueDetails(menueId).then(meal => {
//     if (meal) {
//         menueInfos.push({
//             name: meal.strMeal,
//             instructions: meal.strInstructions,
//             image: meal.strMealThumb,
//             // To get all ingredients:
//             ingredients: getIngredients(meal)
//         });

//         console.log(menueInfos);
//     }
// });

// // Helper to extract ingredients and measures
// function getIngredients(meal) {
//     const ingredients = [];
//     for (let i = 1; i <= 20; i++) {
//         const ingredient = meal[`strIngredient${i}`];
//         const measure = meal[`strMeasure${i}`];
//         if (ingredient && ingredient.trim() !== "") {
//             ingredients.push(`${measure} ${ingredient}`);
//         }
//     }
//     return ingredients;
// }

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

// Test with region "American"
(async () => {
    const region = "American";
    const meals = await loadMenueRegions(region);
    
    if (meals.length === 0) {
        console.log("No meals found for region:", region);
        return;
    }

    // Pick a random meal from the region
    const randomMeal = meals[Math.floor(Math.random() * meals.length)];
    console.log("Random meal from", region, "region:");
    console.log(randomMeal);

    // Fetch detailed info
    const mealDetails = await loadMenueDetails(randomMeal.idMeal);
    if (!mealDetails) {
        console.log("Failed to load meal details.");
        return;
    }

    const fullMealInfo = {
        name: mealDetails.strMeal,
        instructions: mealDetails.strInstructions,
        image: mealDetails.strMealThumb,
        ingredients: getIngredients(mealDetails)
    };

    console.log(fullMealInfo);
})();