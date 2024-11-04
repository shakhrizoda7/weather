import axios from "axios";
import { useState } from "react";
import styled from "styled-components";

const WeatherStyled = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  background-color: #e0f7fa;

  header{
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    padding: 25px;
    background-color: #fff;
    gap: 10px;
    color: #00796b;
  }

  .App{
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
        width: 250px;
        height: 80px;
        padding: 0 20px;
      }

      p{
        margin: 0;
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

  footer{
    width: 100%;
    height: 200px;
    height: calc(100vh - 460px);
    align-items: center;
    
    p{
      position: absolute;
      bottom: 0;
      left: 43%;
      font-size: 14px;

      @media (max-width: 420px){
        left: 18%;
        font-size: 12px;
      }
    }
  }
`

function App() {
  const API_KEY_WEATHER = 'd934e7be3dce4f4282555822240411';

  const [city, setCity] = useState();
  const [weather, setWeather] = useState(null);
  
  const getWeather = async () => {
    if (!city) {
      alert("Iltimos, shahar nomini kiriting!");
      return;
    }

    const cityToFetch = city.trim(); 

    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY_WEATHER}&q=${cityToFetch}&aqi=no`
      ) 
      setWeather(response.data);

    } catch (error) {
      console.log('Topilmadi', error);
      setWeather(null);
    }

    setCity('')
  }

  return (
    <WeatherStyled>
      <header className="shadow">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-cloud-sun-fill" viewBox="0 0 16 16">
          <path d="M11.473 11a4.5 4.5 0 0 0-8.72-.99A3 3 0 0 0 3 16h8.5a2.5 2.5 0 0 0 0-5z"/>
          <path d="M10.5 1.5a.5.5 0 0 0-1 0v1a.5.5 0 0 0 1 0zm3.743 1.964a.5.5 0 1 0-.707-.707l-.708.707a.5.5 0 0 0 .708.708zm-7.779-.707a.5.5 0 0 0-.707.707l.707.708a.5.5 0 1 0 .708-.708zm1.734 3.374a2 2 0 1 1 3.296 2.198q.3.423.516.898a3 3 0 1 0-4.84-3.225q.529.017 1.028.129m4.484 4.074c.6.215 1.125.59 1.522 1.072a.5.5 0 0 0 .039-.742l-.707-.707a.5.5 0 0 0-.854.377M14.5 6.5a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1z"/>
        </svg>
        <h3 className="m-0">Weather</h3>
      </header>

      <div className="App">

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

      <footer>
        <p>&copy; 2024 Weather App. All rights reserved.</p>
      </footer>
    </WeatherStyled>
  );
}

export default App;
