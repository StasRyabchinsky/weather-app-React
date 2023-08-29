import React from "react";

const AsideDaysForecast = ({valueAsideWeekForecast}) =>{
  return(
    <div className="daysForecast__main">
      {valueAsideWeekForecast.map((item, index) => (
        <div className="daysForecast__card" key={index}>
          <p className="daysForecast__cardDay">{item.dayDay}</p>
          <div className="daysForecast__cardForecast">
            <img
              src={item.dayUrl}
              alt=""
              className="daysForecast__url"
            />
            <h6 className="daysForecast__urlText">{item.dayText}</h6>
          </div>
          <div className="daysForecast__cardTemperature">
            <h6 className="daysForecast__cardTemperatureMax">{item.dayMaxTemperature}</h6>
            <p className="daysForecast__cardTemperatureMin">/{item.dayMinTemperature}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
export default AsideDaysForecast