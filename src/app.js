import "./reset.css";
import "./style.css";





function getWeather(location){
    const apiCall = `https://api.openweathermap.org/data/2.5/weather?q=`;

    const apiKey = "37b5cee3414c41022c728c8f21d250e3";

    const appIdText = "&appid="

    const apiOptional = "&lang=es&units=metric";

    fetch(apiCall + location + appIdText + apiKey + apiOptional)
    .then (response => response.json())
    .then (data => {
        console.log(data)
        renderData(data);
    })   
    .catch((error)=> console.log(error))
}



let renderData = (data) =>{
    
}


getWeather("Mercedes, UY");

const getUserPosition = ()=>{

const successCallback = (position) => {
    console.log(position);
  };
  
  const errorCallback = (error) => {
    console.log(error);
  };
  
  const options = {
    enableHighAccuracy: true
    
  };

const userLocation = navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options);
console.log(userLocation)
}


