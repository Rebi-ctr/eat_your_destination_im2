
// meal.js
async function getRandomMealByCountry(country) {
    const listUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${encodeURIComponent(country)}`;
    const listRes = await fetch(listUrl);
    const listData = await listRes.json();

    if (!listData.meals || listData.meals.length === 0) {
        document.getElementById("meal-container").innerText = "No meals found for this country.";
        return;
    }

    const randomMeal = listData.meals[Math.floor(Math.random() * listData.meals.length)];
    const detailsUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${randomMeal.idMeal}`;
    const detailsRes = await fetch(detailsUrl);
    const detailsData = await detailsRes.json();

    const meal = detailsData.meals[0];
    displayMeal(meal);
}

function displayMeal(meal) {
    const container = document.getElementById("meal-container");
    container.innerHTML = `
        <h2>${meal.strMeal}</h2>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" width="300">
        <p><strong>Category:</strong> ${meal.strCategory}</p>
        <p><strong>Instructions:</strong> ${meal.strInstructions}</p>
    `;
}

// Get country from URL query
const params = new URLSearchParams(window.location.search);
const country = params.get("country");

if (country) {
    getRandomMealByCountry(country);
} else {
    document.getElementById("meal-container").innerText = "No country provided.";
}
