console.log("Hello World!");

const all_pokemon = await loadDepartureZurich();

// Fetch the data from the API
async function loadDepartureZurich() {
    const url = 'https://pokeapi.co/api/v2/pokemon?limit=9&offset=0'; // mit korrekter API-URL ersetzen
    try {
        const response = await fetch(url);
        const answer = await response.json();
        return answer.results;
    } catch (error) {
        console.error(error);
        return false;
    }
}
// Display the data in the console
console.log(loadDepartureZurich);