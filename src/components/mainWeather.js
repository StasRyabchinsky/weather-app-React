import React from "react";

function MainWeather ({valueMainWeather}){
return (
  <div className="sityWeather mainSize">
    <div className="sityWeather__container">
        <div className="sityWeather__containerForName">
          <h3 className="sityWeather__name">{valueMainWeather[0] || "null"}</h3>
          <p className="sityWeather__chanceOfRain">Chance of rain:{valueMainWeather[1] || "null"}</p>
        </div>
      <h2 className="sityWeather__temperature">{valueMainWeather[2] || "null"}°</h2>
      </div>
    <img src={valueMainWeather[3] || "null"} className="sityWeatherUrl" />
  </div>)
}
export default MainWeather