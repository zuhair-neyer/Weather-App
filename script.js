const apiKey = 'bf186fa4959746b28a575234240110'; // Your WeatherAPI.com API key
const searchHistory = [];

// Get elements
const loader = document.getElementById('loader');
const weatherResult = document.getElementById('weatherResult');
const searchHistoryContainer = document.getElementById('searchHistory');

// Event listener for the button
document.getElementById('getWeather').addEventListener('click', function () {
    const city = document.getElementById('city').value.trim();
    if (city === "") {
        alert("Please enter a city name");
        return;
    }
    fetchWeather(city);
});

// Function to fetch weather data
function fetchWeather(city) {
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

    // Show loader
    loader.style.display = "block";
    weatherResult.innerHTML = ""; // Clear previous results

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
            updateSearchHistory(city);
        })
        .catch(error => {
            weatherResult.innerHTML = `<p>${error.message}</p>`;
        })
        .finally(() => {
            // Hide loader after fetching
            loader.style.display = "none";
        });
}

// Function to display weather data
function displayWeather(data) {
    weatherResult.innerHTML = `
        <h2>${data.location.name}, ${data.location.country}</h2>
        <img src="${data.current.condition.icon}" alt="${data.current.condition.text}">
        <p>Temperature: ${data.current.temp_c} °C</p>
        <p>Feels Like: ${data.current.feelslike_c} °C</p>
        <p>Weather: ${data.current.condition.text}</p>
        <p>Humidity: ${data.current.humidity}%</p>
        <p>Wind Speed: ${data.current.wind_kph} kph (${data.current.wind_dir})</p>
        <p>Sunrise: ${data.location.localtime.split(' ')[0]} ${data.current.condition.text}</p>
        <p>Sunset: ${data.location.localtime.split(' ')[0]} ${data.current.condition.text}</p>
    `;
}

// Function to update search history
function updateSearchHistory(city) {
    if (!searchHistory.includes(city)) {
        searchHistory.push(city);
        const historyElement = document.createElement('button');
        historyElement.innerText = city;
        historyElement.addEventListener('click', () => fetchWeather(city));
        searchHistoryContainer.appendChild(historyElement);
    }
}
