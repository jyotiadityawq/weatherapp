const apiKey = "apikeyremoveduetosecuritymeasure";
const cityInput = document.querySelector('.city-input');
const searchButton = document.querySelector('.search-btn');
const weatherBox = document.querySelector('.weather-info');

async function getCoordinates(city) {
    const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`);
    const data = await response.json();
    if (data.length === 0) {
        throw new Error('City not found');
    }
    return data[0];
}

async function getWeather(lat, lon) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`);
    const data = await response.json();
    return data;
}

async function fetchWeather(city) {
    try {
        const { lat, lon } = await getCoordinates(city);
        const weatherData = await getWeather(lat, lon);

        const { name } = weatherData;
        const { icon, description } = weatherData.weather[0];
        const { temp, humidity } = weatherData.main;
        const { speed } = weatherData.wind;

        document.querySelector(".location").innerText = `Weather in ${name}`;
        document.querySelector(".temperature").innerText = `${temp}°C`;
        document.querySelector(".weather-icon").src = `https://openweathermap.org/img/wn/${icon}.png`;
        document.querySelector(".description").innerText = description;
        document.querySelector(".humidity").innerText = `Humidity: ${humidity}%`;
        document.querySelector(".wind-speed").innerText = `Wind Speed: ${speed} km/h`;
        weatherBox.classList.remove("loading");
        document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${name}')`;
    } catch (error) {
        alert('Error: ' + error.message);
        console.error('Error fetching weather data:', error);
    }
}

searchButton.addEventListener("click", () => {
    fetchWeather(cityInput.value);
});

cityInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        fetchWeather(cityInput.value);
    }
});


fetchWeather("Delhi");
