import "./reset.css";
import "./style.css";


//console.log(process.env)




function getWeather(location){
    const apiCall = `https://api.openweathermap.org/data/2.5/weather?q=`;

   
    const apiKey = OWEATHER_API_KEY;

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


getWeather("Dolores, UY");

// const getUserPosition = ()=>{

// const successCallback = (position) => {
//     console.log(position);
//     return position
//   };
  
//   const errorCallback = (error) => {
//     console.log(error);
//     return error
//   };
  
//   const options = {
//     enableHighAccuracy: true
    
//   };

// const userLocation = navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options);
// console.log(userLocation)
// }

// getUserPosition();

const getUserPosition = async () => {
  const options = {
    enableHighAccuracy: true,
  };

  // wrapping getCurrentPostion in a Promise
  const positionPromise = new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });

  try {
    // using await to wait for the Promise to resolve
    const position = await positionPromise;
    console.log(position);
    
    //return position;
  } catch (error) {
    //console.log(error);
    return error;
  }
};

let pos = getUserPosition();

console.log(pos)