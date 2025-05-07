console.log("Hello World!");


let now = Math.floor(Date.now() / 1000); // current time in Unix timestamp (seconds)
let startTimecode = now - (1 * 60 * 60);     // 1 hours ago
let endTimecode = now + (12 * 60 * 60);      // 12 hours from now


const departureZurich = await loadDepartureZurich(startTimecode, endTimecode);

// Fetch the data from the API
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



