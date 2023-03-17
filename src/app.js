import "./reset.css";
import "./style.css";

const getUserPosition = async () => {
  const options = {
    enableHighAccuracy: true,
  };

  // wrapping getCurrentPostion in a Promise
  const positionPromise = new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });

  try {
    const userPosition = await positionPromise;
    const lat = userPosition.coords.latitude;
    const lon = userPosition.coords.longitude;
    console.log(userPosition);

    getCity(lat, lon);
  } catch (error) {
    const lat = -33.25563;
    const lon = -58.03073;
    console.log(error);
    getCity(lat, lon);
  }
};

getUserPosition();

function getCity(lat, lon) {
  const endPoint = `https://us1.locationiq.com`;

  const apiMethod = "/v1/reverse.php?key=";

  const apiKey = process.env.LOCATIONIQ_API_KEY;

  const flat = "&lat=" + lat;
  const flon = "&lon=" + lon;

  const apiOptional = "&format=json";

  fetch(endPoint + apiMethod + apiKey + flat + flon + apiOptional)
    .then((response) => response.json())
    .then((data) => {
      const cityName = data.address.city;
      const countryCode = data.address.country_code;

      const cityCountry = cityName + ", " + countryCode.toUpperCase();

      getWeather(cityCountry);
    })
    .catch((error) => console.log(error));
}

function getWeather(location) {
  const apiCall = `https://api.openweathermap.org/data/2.5/weather?q=`;

  const apiKey = process.env.OWEATHER_API_KEY;

  const appIdText = "&appid=";

  const apiOptional = "&lang=es&units=metric";

  fetch(apiCall + location + appIdText + apiKey + apiOptional)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      renderData(data);
    })
    .catch((error) => console.log(error));
}

let renderData = (data) => {
  console.log("este seria el codigo para mostrar en el dom");
  console.log(data.name);
};
