import React from "react";

const MainTimeForecast = ({valueMainTimeForecast}) => {
return(
  <div className="forecastWeather__cardContainer">
    {valueMainTimeForecast.map((item, index) => (
      <div className="forecastWeather__card" key={index}>
        <p className="forecastWeather__time">{item.forecastHour}</p>
        <img
          src={item.forecastURL}
          alt=""
          className="forecastWeather__url"
        />
        <h5 className="forecastWeather__temperature">{item.forecastTemperature}°</h5>
      </div>
    ))}
  </div>
)
}

export default MainTimeForecast