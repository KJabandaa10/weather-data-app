const button = document.querySelector(".button");
const input = document.getElementById("input");
const clearButton = document.querySelector(".clear");

async function getWeather() {
  let input = document.querySelector("input").value;
  let response = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${input}&APPID=1d4cd589716fb70b2c7958b584c58a01&units=metric`
  );
  const weatherData = await response.json();
  // access main json object
  const main = weatherData.main;
  // get main weather info
  let mains = {
    humidity: main.humidity,
    temp: main.temp,
    maxTemp: main.temp_max,
    minTemp: main.temp_min
  };
  // store weather request in LocalStorage
  localStorage.setItem("weather request", JSON.stringify(mains));

  // display main info on page
  const cityName = document.createElement("p");
  cityName.textContent = `The weather for ${input} 🌦`;
  cityName.id = "data-header";
  cityName.className = "result";
  document.getElementById("data-div").appendChild(cityName);
  cityName.style.fontSize = "24px";
  // weather data inside main object
  const humidity = document.createElement("p");
  humidity.textContent = `Humidity: ${mains.humidity}`;
  humidity.id = "data-item";
  humidity.className = "data-humidity result";
  document.getElementById("data-div").appendChild(humidity);
  const temp = document.createElement("p");
  temp.textContent = `Temperature: ${mains.temp}°`;
  temp.id = "data-item";
  temp.className = "data-temp result";
  document.getElementById("data-div").appendChild(temp);
  const maxTemp = document.createElement("p");
  // maxTemp.setAttribute("id", "result");
  maxTemp.textContent = `Maximum temperature: ${mains.maxTemp}°`;
  maxTemp.id = "data-item";
  maxTemp.className = "data-maxTemp result";
  document.getElementById("data-div").appendChild(maxTemp);
  const minTemp = document.createElement("p");
  minTemp.textContent = `Minimum temperature: ${mains.minTemp}°`;
  minTemp.id = "data-item";
  minTemp.className = "data-minTemp result";
  document.getElementById("data-div").appendChild(minTemp);
}

function clearSearches() {
  document.querySelectorAll(".result").forEach(result => {
    result.remove();
  });
}

button.addEventListener("click", getWeather);
input.onkeydown = function(e) {
  if (e.keyCode == 13) {
    getWeather();
  }
};
clearButton.addEventListener("click", clearSearches);
