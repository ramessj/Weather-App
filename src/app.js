import "./reset.css";
import "./style.css";

const weatherCard = document.getElementById("weatherCard");
const mapCard = document.getElementById("mapCard");
const body = document.getElementById("body");

const inputSearchCity = document.getElementById("inputSearchCity");
const btnSearchCity = document.getElementById("btnSearchCity");




// FUNCION PARA OBTENER LA UBICACION DEL USUARIO
// SI EL USUARIO DECIDE NO DAR PERMISOS 
// DEVUELVE COMO RESULTADO A getCity() LAS COORDENADAS
// latitud y longitud DE MERCEDES 

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
    const userLatLon = {};
    userLatLon.lat = userPosition.coords.latitude;
    userLatLon.lon = userPosition.coords.longitude;
    //console.log(userLatLon);

    getCity(userLatLon);
  } catch (error) {
    const defaultLatLon = {};
    defaultLatLon.lat = -33.25563;
    defaultLatLon.lon = -58.03073;
    console.log("user deniega, default city Mercho" + error)
    getCity(defaultLatLon);
  }
};


// funcion para buscar ciudad desde el input

const contenedorOpciones = document.getElementById("opciones")

function inputToCity(inputValue){
 
  fetch(`https://spott.p.rapidapi.com/places/autocomplete?limit=5&skip=0&q=${inputValue}&type=CITY`, {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': `${process.env.SPOTT_API_KEY}`,
      'X-RapidAPI-Host': 'spott.p.rapidapi.com'
    }
  })
    .then(response => response.json())
    .then(data  => {

      const opciones = data.map(ciudad => {
        const div = document.createElement("div");
        div.textContent = ciudad.name + ", " +  ciudad.country.id;
        div.classList.add("opcion"); // Agregar clase opcion
        return div;
      });

      // Limpiar previas opciones en el contenedor
      contenedorOpciones.innerHTML = "";

      // Insertar nuevas opciones en el contenedor
      opciones.forEach(opcion => {
        contenedorOpciones.appendChild(opcion);
      });
    })
      
      
    
    .catch(err => console.error(err));
  



}

inputSearchCity.addEventListener("keyup", (e) => {

  if(e.key == "Enter"){
    e.preventDefault();

    inputToCity(inputSearchCity.value)


  }


})














// FUNCION PARA OBTENER LA INFORMACION DE LA CIUDAD 
// A PARTIR DE SU LATITUD Y LANGITUD EN UN MAPA
//RECIBE LOS PARAMETROS DESDE getUserPosition() AL INCIAR LA APP



function getCity(coords) {
  const endPoint = `https://us1.locationiq.com`;

  const apiMethod = "/v1/reverse.php?key=";

  const apiKey = process.env.LOCATIONIQ_API_KEY;

  const flat = "&lat=" + coords.lat;
  const flon = "&lon=" + coords.lon;

  const apiOptional = "&format=json";

  fetch(endPoint + apiMethod + apiKey + flat + flon + apiOptional)
    .then((response) => response.json())
    .then((data) => {   
     
      //pasa ciudad y codigo de pais a la funcion getWeather para obtener datos
      const datos = {};
     
      datos.cityCountryCode = data.address.city + ", " + data.address.country_code;

      ///datos extra para pasarle a get weather y este a render data 
      datos.city = data.address.city;
      datos.state = data.address.state;
      datos.country = data.address.country_code;

      getWeather(datos);
    })
    .catch((error) => console.log(error));
}






// FUNCION PARA OBTENER EL ESTADO DEL TIEMPO
// A PARTIR DE (NOMBRE, COUNTRYCODE (UY o AR  X EJEMPLO))
// RECIBE PARAMETROS DESDE getCity() o desde el input


function getWeather(locationData) {
  const apiCall = `https://api.openweathermap.org/data/2.5/weather?q=`;

  const apiKey = process.env.OWEATHER_API_KEY;

  const appIdText = "&appid=";

  const apiOptional = "&lang=es&units=metric";




  

  fetch(apiCall + locationData.cityCountryCode + appIdText + apiKey + apiOptional)
    .then((response) => response.json())
    .then((weatherData) => {           
      renderData(weatherData, locationData);
    })
    .catch((error) => console.log(error));
}



//////////// FUNCIONES AUXILIARES PARA MOSTRAR EN EL DOM /////////////



// traducir el texto en cierrtas ocaciones donde la traduccion oficial es malisima

function checkTranslate(description){

  switch(description){
    case "Thunderstorm": return "Tormenta Eléctrica";
    case "Drizzle": return "Llovizna";
    case "Rain": return "Lluvia";
    case "Snow": return "Nieve";
    case "Fog": return "Niebla";
    case "Mist": return "Neblina";
    case "Haze": return "Neblina";
    case "Clouds": return "Nublado";
    case "Clear": return "Despejado";
    



    default: return description;
  }


}









//la primera letra de un string a MAYUSCULAS

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

//cambia el fondo del body dependiendo la temperatura actual

function changeBg(temp){
  body.classList.remove("bgDefault");
  if(temp >= 25 ){
    body.classList.add("bgHot");
  }else if(temp <= 14){
    body.classList.add("bgCold")
  }else{
    body.classList.add("bgDefault")
    
  }
}








// MUESTRA EN EL DOM EL ESTADO DE LA TEMPERATURA 
//EN LA CIUDAD ELEGIDA, RECIBE COMO PARAMETROS LA INFORMACION
//DE GETWEATHER() Y GETCITY()

let renderData = (weatherData, cityData) => {
  
  console.log(weatherData);
  console.log(cityData);

  changeBg(weatherData.main.temp)

  weatherCard.innerHTML = ``;

  

  //weatherCard titulo, muestra nombre, departamento y pais (proximamente bandera)
  let cityInfoDiv = document.createElement("div");
  cityInfoDiv.classList.add("cityInfoDiv");
  cityInfoDiv.innerHTML= `<div class="cityName" id="cityName">${cityData.city}</div><div class="cityState" id="cityState">, ${cityData.state},</div><div><img src="https://flagsapi.com/${cityData.country.toUpperCase()}/flat/64.png"></div>`;
  weatherCard.appendChild(cityInfoDiv);

  if(cityData.city == cityData.state){
    const cityState = document.getElementById("cityState");
    cityState.remove();
  }

  //WEATHERCARD INFO DEL TIEMPO
  //temperatura, convierte en entero y transforma a string + º
  let temp = Math.floor(weatherData.main.temp).toString() + "º";


  //traducir estado actual ya que la traduccion oficial es malisima

  const weatherDescription = checkTranslate(weatherData.weather[0].main);


  //descripcion del estado actual, conviritendo primera letra a mayusculas

  let description = capitalizeFirstLetter(weatherDescription)



  //humedad a string + %
  let humidity = weatherData.main.humidity.toString() + "%";



  let weatherInfoDiv = document.createElement("div");
  weatherInfoDiv.classList.add("weatherInfoDiv");
  weatherInfoDiv. innerHTML = ` <div>${description} <img src="https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png" alt="${weatherData.weather[0].description}" class="weatherImg"></div><div>${temp}</div> <div>${humidity}</div>`;

  weatherCard.appendChild(weatherInfoDiv)




};



// INICIALIZACION DE LA APP

getUserPosition();