const apiKey = "bf186fa4959746b28a575234240110"; // Your WeatherAPI key
const apiBase = "https://api.weatherapi.com/v1/current.json";
const historyList = document.getElementById("history-list");
const weatherDetails = document.getElementById("weather-details");

function getWeather() {
    const city = document.getElementById("city-input").value.trim();
    if (!city) {
        alert("Please enter a city name!");
        return;
    }

    fetch(`${apiBase}?key=${apiKey}&q=${city}`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                weatherDetails.innerHTML = `<p style="color: red;">City not found. Try again.</p>`;
                return;
            }

            const { name, country } = data.location;
            const {
                temp_c,
                temp_f,
                condition,
                humidity,
                wind_kph,
                wind_mph,
                vis_km,
                vis_miles,
                feelslike_c,
                feelslike_f,
            } = data.current;

            weatherDetails.innerHTML = `
                <h2>${name}, ${country}</h2>
                <p><strong>Temperature:</strong> ${temp_c}°C (${temp_f}°F)</p>
                <p><strong>Condition:</strong> ${condition.text}</p>
                <p><strong>Feels Like:</strong> ${feelslike_c}°C (${feelslike_f}°F)</p>
                <p><strong>Humidity:</strong> ${humidity}%</p>
                <p><strong>Wind Speed:</strong> ${wind_kph} kph (${wind_mph} mph)</p>
                <p><strong>Visibility:</strong> ${vis_km} km (${vis_miles} miles)</p>
            `;

            updateHistory(city);
        })
        .catch(error => {
            weatherDetails.innerHTML = `<p style="color: red;">Failed to fetch weather data.</p>`;
            console.error("Error fetching weather data:", error);
        });
}

function updateHistory(city) {
    const listItem = document.createElement("li");
    listItem.textContent = city;
    historyList.appendChild(listItem);
}
