import React, { useState, useEffect, useRef } from 'react';
import dayjs from "dayjs"
import './App.css';

import SearchList from './components/mainSearchList';
import MainWeather from './components/mainWeather';
import MainTimeForecast from './components/mainTimeForecast';
import MainWeatherConditions from './components/mainWeatherConditions';
import AsideDaysForecast from './components/asideDaysForecast';
// import { click } from '@testing-library/user-event/dist/click';

function App() {
  const [city, setCity] = useState();
  const [chanceOfRain, setChanceOfRain] = useState();
  const [temperature, setTemperature] = useState();
  const [url, setUrl] = useState();
  
  const [feelsLike, setFeelsLike] = useState();
  const [wind, setWind] = useState();
  const [uv, setUV] = useState();

  const [valueMainTimeForecast, setValueMainTimeForecast] = useState([])
  const [valueAsideWeekForecast, setValueAsideWeekForecast] = useState([])
  const [valueSearchList, setValueSearchList] = useState([])

  const [valueInput, setValueInput] = useState('');
  const [valueListItem, setValueListItem] = useState("")

  const [isSpinnerActive, setSpinnerActive] = useState(true);
  const [isSearch, setSearch] = useState(false);

  const search = useRef(null)
  const list = useRef(null)

  useEffect(() => {
    getUserLocation();

    const onClick = e => (list.current.contains(e.target) || (search.current.contains(e.target))) || setSearch(false)
    document.addEventListener("click", onClick)
    return () => document.removeEventListener("click", onClick)
  }, [])

  const getCurrentWeather = (url = `http://api.weatherapi.com/v1/forecast.json?key=de246ed5fd28428b862142841232707&q=Warsaw&days=7`) => {
    setSpinnerActive(true)

    fetch(url)
      .then(resp => resp.json())
      .then(data => {
        setCity(data.location.name);
        setChanceOfRain (data.forecast.forecastday[0].day.daily_chance_of_rain);
        setTemperature(data.current.temp_c);
        setUrl(`https:${data.current.condition.icon}`);
  
        setFeelsLike(data.current.feelslike_c);
        setWind(data.current.wind_kph);
        setUV(data.current.uv);
  
        let forecastTime = data.forecast.forecastday[0].hour
          .filter((i, ind) => ind%3 == 0)
          .slice(2, 8)
          .map(item => {
            return {
              forecastHour: dayjs(item.time).format("hh:mm a"),
              forecastTemperature: item.temp_c,
              forecastURL: `https:${item.condition.icon}`,
            }
          })
        setValueMainTimeForecast(forecastTime)

        let forecastWeek = data.forecast.forecastday
          .map(item => {
            return{
              dayDay: ((new Date(item.date)).getDay() == (new Date()).getDay()) ? "Today" : new Intl.DateTimeFormat('en-US', {weekday:"short"}).format((new Date(item.date))),
              dayUrl: `https:${item.day.condition.icon}`,
              dayText: item.day.condition.text,
              dayMaxTemperature: item.day.maxtemp_c,
              dayMinTemperature: item.day.mintemp_c,
            }
          })
        setValueAsideWeekForecast(forecastWeek);  
      })
      
      setSpinnerActive(false)
  }
  const getUserLocation = () => {
    setSpinnerActive(true)

    navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const latitudeLongitude = (latitude + ',' + longitude);
      const getUserLocationWeather =  `http://api.weatherapi.com/v1/forecast.json?key=de246ed5fd28428b862142841232707&q&q=${latitudeLongitude}&days=7` ;
      getCurrentWeather(getUserLocationWeather);
    }, () => {
      getCurrentWeather();
    });
  }
  const openListSearch = () => {
    const arrSearch =`http://api.weatherapi.com/v1/search.json?key=de246ed5fd28428b862142841232707&q=${valueInput}` ;
      fetch(arrSearch)
        .then(resp => resp.json())
        .then(dataSearch => {
          const arrDataSearch = Array.from(dataSearch);
            let searchList = arrDataSearch
            .map(item => {
              return{
                nameCity: item.name,
                nameCountry: item.country,
              }
            })
          setValueSearchList(searchList);
    })
  }
  const searchListWeather = (cityName) => {
    setSearch(false)
    setValueInput('')

    const cityNameWeather =`http://api.weatherapi.com/v1/forecast.json?key=de246ed5fd28428b862142841232707&q=${cityName}&days=7` ;
    getCurrentWeather(cityNameWeather)
  }

  return (
    <div 
      className={`wrapper ${(isSpinnerActive) ? "spinner" : ""}`
    }>
      <main className="main">
        <div className="main__search backColor">
          <form className="main__search" action="" method="get">
            <input
              id="input"
              className={`main__search backColor ${isSearch ? "active" : ""}`}
              type="text"
              placeholder="Search for Cities"
              value={valueInput}
              autoSave='off'
              autoComplete="off"
              results="10"
              incremental="incremental"
              onChange={(e) => {
                setValueInput(e.target.value)
                setSearch(e.target.value.length >= 3)
              }}
              onInput={openListSearch}
              onFocus={(e) => setSearch(e.target.value.length >= 3)}
              ref={search}
            />
          </form>
        </div>
        <div id="list" 
          ref={list}
          className={`main__search__list backColor ${isSearch ? "active" : ""}`}
        >
        <SearchList 
          valueSearchList={valueSearchList}
          valueSetSearch={setSearch}      
          valueSearchListWeather={searchListWeather}
        />
        </div>
        <section className="section">
          <MainWeather 
            valueMainWeather={[city, chanceOfRain, temperature, url]}  />
          <div className="forecastWeather mainSize backColor">
            <p className="__title">today's forecast</p>
            <MainTimeForecast 
              valueMainTimeForecast={valueMainTimeForecast} />
          </div>
          <MainWeatherConditions 
            valueMainWeatherConditions={[feelsLike, chanceOfRain, wind, uv]}/>
        </section>
      </main>
      <aside className="daysForecast backColor">
        <p className="__title">7-days forecast</p>
        <AsideDaysForecast 
          valueAsideWeekForecast={valueAsideWeekForecast}/>
      </aside>
    </div>
  )
}

export default App;
