import axios from "axios";
import { useState } from "react";
import styled from "styled-components";

const WeatherStyled = styled.div`
  height: calc(100vh - 60px);
  display: flex;
  align-items: center;
  flex-direction: column;

  .weather{
    .form{
      width: 400px;
      height: 110px;
      display: flex;
      justify-content: center;
      flex-direction: column;
      margin-top: 80px;
      gap: 2px;
      background-color: #fff;
      border-radius: 8px;
      padding: 25px;

      @media (max-width: 420px){
        width: 260px;
        height: 90px;
        padding: 0 10px;

        h6{
          font-size: 15px;
        }
      }
      
      div{
        display: flex;
        align-items: center;
        gap: 10px;
      }


      input{
        width: 300px;
        padding: 5px 10px;
        background-color: transparent;
        border: 1px solid lightgray;
        border-radius: 6px;
      }

      button{
        display: flex;
        align-items: center;
        background-color: #00796b;
        color: white;
        padding: 8px 10px;
      }
    }

    .weather-info{
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 50px;

      .temp{
        color: #e53935;
      }
    }
  }
`;

function Weather() {
  const API_KEY_WEATHER = 'd934e7be3dce4f4282555822240411';

  const [city, setCity] = useState();
  const [weather, setWeather] = useState(null);
  
  const getWeather = async () => {
    if (!city) {
      alert("Please, enter city name");
      return;
    }
    
    const cityToFetch = city.trim(); 
  
    // api url
    const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY_WEATHER}&q=${cityToFetch}&aqi=no`;

    try {
      const response = await axios.get(url) 
      setWeather(response.data);
    } catch (error) {
      setWeather(null);
    }

    setCity('')
  }

  return (
    <WeatherStyled>
      <div className="weather">
        <div className="form">
          <h6>City name:</h6>

          <div>
            <input type="text" placeholder="Enter city name" value={city} onChange={(e) => setCity(e.target.value)}/>
            
            <button className="btn" onClick={getWeather}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
              </svg>
            </button>
          </div>
        </div>

        {weather && (
          <div className="weather-info">
            <h2>{weather.location.name}</h2>
            <p className="temp">{weather.current.temp_c}°C</p>
            <p>{weather.current.condition.text}</p>
            <p>{weather.current.wind_kph} kph</p>
          </div>
        )}
      </div>
    </WeatherStyled>
  );
}

export default Weather;
