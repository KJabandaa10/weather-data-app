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
  let mainArr = [main.humidity, main.temp, main.temp_max, main.temp_min];
  // store weather request in LocalStorage
  localStorage.setItem("weather request", JSON.stringify(mainArr));

  // display main info on page
  const cityName = document.createElement("p");
  cityName.setAttribute("id", "result");
  cityName.textContent = `The weather for ${input}`;
  document.getElementById("data-div").appendChild(cityName);
  cityName.style.fontSize = "24px";
  const humidity = document.createElement("p");
  humidity.setAttribute("id", "result");
  humidity.textContent = `Humidity: ${mainArr[0]}`;
  document.getElementById("data-div").appendChild(humidity);
  const temp = document.createElement("p");
  temp.setAttribute("id", "result");
  temp.textContent = `Temperature: ${mainArr[1]}°`;
  document.getElementById("data-div").appendChild(temp);
  const maxTemp = document.createElement("p");
  maxTemp.setAttribute("id", "result");
  maxTemp.textContent = `Maximum temperature: ${mainArr[2]}°`;
  document.getElementById("data-div").appendChild(maxTemp);
  const minTemp = document.createElement("p");
  minTemp.setAttribute("id", "result");
  minTemp.textContent = `Minimum temperature: ${mainArr[3]}°`;
  document.getElementById("data-div").appendChild(minTemp);
}

function clearSearches() {
  let removeArr = [];
  document.querySelectorAll("#result").forEach(result => {
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
