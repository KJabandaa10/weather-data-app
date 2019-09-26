const button = document.querySelector(".button");
const input = document.getElementById("input");
const clearButton = document.querySelector(".clear");
const dataDivParent = document.querySelector(".data-div-parent");

let hasData = false;

async function getWeather() {
  hasData = true;
  hideBorder();

  let input = document.querySelector("input").value;
  input.className = "data-right";
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
  humidity.innerHTML = `💧 Humidity: <span>${mains.humidity}</span>`;
  humidity.className = "data-humidity result";
  document.getElementById("data-div").appendChild(humidity);
  const temp = document.createElement("p");
  temp.innerHTML = `🔆 Temperature: <span>${mains.temp}°</span>`;
  temp.className = "data-temp result";
  document.getElementById("data-div").appendChild(temp);
  const maxTemp = document.createElement("p");
  // maxTemp.setAttribute("id", "result");
  maxTemp.innerHTML = `🔥 Maximum: <span>${mains.maxTemp}°</span>`;
  maxTemp.className = "data-maxTemp result";
  document.getElementById("data-div").appendChild(maxTemp);
  const minTemp = document.createElement("p");
  minTemp.innerHTML = `❄️ Minimum: <span>${mains.minTemp}°</span>`;
  minTemp.className = "data-minTemp result";
  document.getElementById("data-div").appendChild(minTemp);
}

function clearSearches() {
  hasData = false;
  hideBorder();
  document.querySelectorAll(".result").forEach(result => {
    result.remove();
  });
}

// hide border if no search results
function hideBorder() {
  if (!hasData) {
    dataDivParent.style.border = "none";
  } else {
    dataDivParent.style.border = "1px solid rgb(126, 126, 126)";
    dataDivParent.style.borderRadius = "15px";
  }
}

button.addEventListener("click", getWeather);
input.onkeydown = function(e) {
  if (e.keyCode == 13) {
    getWeather();
  }
};

clearButton.addEventListener("click", clearSearches);
