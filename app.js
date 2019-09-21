const button = document.querySelector("button");

async function getWeather() {
  let response = await fetch(
    "http://api.openweathermap.org/data/2.5/weather?q=nottingham&APPID=1d4cd589716fb70b2c7958b584c58a01&units=metric"
  );
  const weatherData = await response.json();
  console.log(weatherData);
  // access main json object
  const main = weatherData.main;
  console.log(main);
  console.log(weatherData.name);
  // get main weather info
  let mainArr = [main.humidity, main.temp, main.temp_max, main.temp_min];
  // store weather request in LocalStorage
  localStorage.setItem("weather request", JSON.stringify(mainArr));

  // display main info on page
  const humidity = document.createElement("p");
  humidity.textContent = `Humidity: ${mainArr[0]}`;
  document.body.appendChild(humidity);
  const temp = document.createElement("p");
  temp.textContent = `Temperature: ${mainArr[1]}°`;
  document.body.appendChild(temp);
  const maxTemp = document.createElement("p");
  maxTemp.textContent = `Maximum temperature: ${mainArr[2]}°`;
  document.body.appendChild(maxTemp);
  const minTemp = document.createElement("p");
  minTemp.textContent = `Minimum temperature: ${mainArr[3]}°`;
  document.body.appendChild(minTemp);
}

button.addEventListener("click", getWeather, { once: true });
// for tests
// getWeather();
