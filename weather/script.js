const inputBox = document.querySelector('.input-box');
const searchBtn = document.querySelector('.search-btn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temp');
const description = document.querySelector('.description');
const humidity = document.querySelector('.humidity');
const wind_speed = document.querySelector('.speed');
const location_not_found = document.querySelector('.location-not-found');
const weather_info = document.querySelector('.weather-info');

// Function to get the user's location
function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const api_key = "673ce3fb7d5604c04823958d5af063f2";
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${api_key}`;

            try {
                const weatherdata = await fetch(url).then(response => response.json());

                location_not_found.style.display = "none";
                weather_info.style.display = "flex";
                temperature.innerHTML = `${Math.round(weatherdata.main.temp - 273.15)}°C`;
                description.innerHTML = `${weatherdata.weather[0].description}`;
                humidity.innerHTML = `${weatherdata.main.humidity}%`;
                wind_speed.innerHTML = `${weatherdata.wind.speed} Km/H`;

                switch (weatherdata.weather[0].main) {
                    case 'Clouds':
                        weather_img.src = "imgs/cloud.png";
                        break;
                    case 'Clear':
                        weather_img.src = "imgs/clear.png";
                        break;
                    case 'Rain':
                        weather_img.src = "imgs/rain.png";
                        break;
                    case 'Mist':
                        weather_img.src = "imgs/mist.png";
                        break;
                    case 'Snow':
                        weather_img.src = "imgs/snow.png";
                        break;
                }
            } catch (error) {
                console.error(error);
            }
        });
    } else {
        console.log("Geolocation is not supported by your browser.");
    }
}

// Function to fetch weather by city name
async function checkweather(city) {
    const api_key = "673ce3fb7d5604c04823958d5af063f2";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    try {
        const weatherdata = await fetch(url).then(response => response.json());

        if (weatherdata.cod === '404') {
            location_not_found.style.display = "flex";
            weather_info.style.display = "none";
        } else {
            location_not_found.style.display = "none";
            weather_info.style.display = "flex";
            temperature.innerHTML = `${Math.round(weatherdata.main.temp - 273.15)}°C`;
            description.innerHTML = `${weatherdata.weather[0].description}`;
            humidity.innerHTML = `${weatherdata.main.humidity}%`;
            wind_speed.innerHTML = `${weatherdata.wind.speed} Km/H`;

            switch (weatherdata.weather[0].main) {
                case 'Clouds':
                    weather_img.src = "imgs/cloud.png";
                    break;
                case 'Clear':
                    weather_img.src = "imgs/clear.png";
                    break;
                case 'Rain':
                    weather_img.src = "imgs/rain.png";
                    break;
                case 'Mist':
                    weather_img.src = "imgs/mist.png";
                    break;
                case 'Snow':
                    weather_img.src = "imgs/snow.png";
                    break;
            }
        }
    } catch (error) {
        console.error(error);
    }
}

// Call the function to get the user's location by default
getUserLocation();

searchBtn.addEventListener('click', () => {
    checkweather(inputBox.value);
});
