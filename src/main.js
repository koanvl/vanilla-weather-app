
let apiKey = "3c252ffd932e3d53580c8c66264e47b0";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}&units=metric`;
console.log(apiUrl);
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
function displayTemperature(response){
  console.log(response.data);
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let date = document.querySelector("#date");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  date.innerHTML = formatDate(response.data.dt * 1000);
}
axios.get(apiUrl).then(displayTemperature);