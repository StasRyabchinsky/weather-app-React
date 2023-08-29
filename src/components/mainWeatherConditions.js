import React from "react";

import UV from '../assets/svg/conditionUVIndex.svg'
import Wind from '../assets/svg/conditionWind.svg'
import termpometr from '../assets/svg/conditionTermometr.svg'
import ChanseOfRain from '../assets/svg/conditionRain.svg'

function MainWeatherConditions({valueMainWeatherConditions}){
    return(
      <div className="weatherConditions mainSize backColor">
        <div className="weatherConditions__titleContainer">
          <p className="__title">air conditions</p>
          <a href="#">See more</a>
        </div>
      <div className="weatherConditions__mainContainer">
        <div className="weatherConditions__main">
          <div className="weatherConditions__card">
            <div className="weatherConditions__cardCondition">
              <img src={termpometr} />
              <p>Real Feel</p>
            </div>
            <h4
              className="weatherConditions__temperature weatherConditions__mainCondition"
            >
              {valueMainWeatherConditions[0]}
            </h4>
          </div>
          <div className="weatherConditions__card">
            <div className="weatherConditions__cardCondition">
              <img src={ChanseOfRain} alt="" />
              <p>Chance of Rain</p>
            </div>
            <h4
              className="weatherConditions__chanceRain weatherConditions__mainCondition"
            >{valueMainWeatherConditions[1]}</h4>
          </div>
        </div>

        <div className="weatherConditions__main">
          <div className="weatherConditions__card">
            <div className="weatherConditions__cardCondition">
              <img src={Wind} alt="" />
              <p>Wind</p>
            </div>
            <h4
              className="weatherConditions__wind weatherConditions__mainCondition"
            >{valueMainWeatherConditions[2]} km/h</h4>
          </div>
          <div className="weatherConditions__card">
            <div className="weatherConditions__cardCondition">
              <img src={UV} alt="" />
              <p>UV Index</p>
            </div>
            <h4
              className="weatherConditions__uvIndex weatherConditions__mainCondition"
            >{valueMainWeatherConditions[3]}</h4>
          </div>
        </div>
      </div>
    </div>)
}
export default MainWeatherConditions