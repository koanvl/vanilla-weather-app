
function formatDate(timestamp){
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let day = date.getDay();
  let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  if(minutes< 10){
    minutes = `0${minutes}`;
  }
  if(hours< 10){
    hours = `0${hours}`;
  }
  return `${days[day]}, ${hours}:${minutes}`;
  
}

function formatDay(timestamp){
  let date = new Date(timestamp*1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
  
}

function displayForecast(response){
  let forecast = response.data.daily;
  
  
  let forecastElement = document.querySelector("#forecast");
  forecastHTML = `<div class="row">`;
  forecast.forEach(function(forecastDay, index){     
    if (index < 6){
      forecastHTML = forecastHTML +  `        
      <div class="col-2">
      <div class="forecast-day-wrap">
      <div class="forecast-day" class="mt-1">
      ${formatDay(forecastDay.dt)}
      </div>
      <img src="http://openweathermap.org/img/wn/${
      forecastDay.weather[0].icon
    }@2x.png" alt="icon">
    <div class="forecast-temperature">
    <span  class="forecast-day-temp-max">${
      Math.round(forecastDay.temp.max)}°</span> <span class="forecast-day-temp-max">${Math.round(forecastDay.temp.min)}°</span>
      </div>
      </div>
      </div>
      
      `      
    }    
    
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML; 
  
}

function getForecast(coordinates){
  let apiKey = "3c252ffd932e3d53580c8c66264e47b0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response){
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let date = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");
  celsiusTemperature = response.data.main.temp;
  temperatureElement.innerHTML =`${Math.round(response.data.main.temp)}°`;
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  date.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description);
  
  getForecast(response.data.coord);
  
} 

function search(city){
  let apiKey = "3c252ffd932e3d53580c8c66264e47b0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSearch(event){
  event.preventDefault();
  let searchInputElement = document.querySelector("#input-search");
  search(searchInputElement.value);
}

function displayFahrenheirTemperature(event){
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemperature = celsiusTemperature*1.8 +32;
  temperatureElement.innerHTML = `${Math.round(fahrenheitTemperature)}°`;
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");   
}
function displayCelsiusTemperature(event){
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${Math.round(celsiusTemperature)}°`;
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");  
}




let celsiusTemperature = null;


let form = document.querySelector("#form-search");
form.addEventListener("submit", handleSearch);

//let fahrenheitLink = document.querySelector("#fahrenheit-link");
//fahrenheitLink.addEventListener("click", displayFahrenheirTemperature);

//let celsiusLink = document.querySelector("#celsius-link");
//celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("Gijon");