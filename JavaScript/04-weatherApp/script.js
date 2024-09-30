const apiKey = "2bf339cb3f769247559c04c60abb9e11";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon")

async function checkWeather(city){
    const response = await fetch(apiUrl + city + `&appid=${apiKey}` + `&units=metric`);
    var data = await response.json();

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + " ºC";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    if(data.weather[0].main == "Clouds") {
        weatherIcon.src = "img/cloudy.png"
    } else if(data.weather[0].main == "Clear") {
        weatherIcon.src = "img/sun.png"
    } else if(data.weather[0].main == "Rain") {
        weatherIcon.src = "img/sun.png"
    } else if(data.weather[0].main == "Mist") {
        weatherIcon.src = "img/snowflake.png"
    } else if(data.weather[0].main == "Drizzle") {
        weatherIcon.src = "img/cloudy (1).png"
    }

    document.querySelector(".weather").style.display = "block";
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
})
