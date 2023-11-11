import React, { useState, useEffect } from 'react';
import axios from "axios";
import './App.css';

import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
`

const Col = styled.div`
  position: relative;
  width: 100%;
  min-height: 1px;
  padding-right: 15px;
  padding-left: 15px;

  @media (min-width: 576px) {
    flex: 0 0 66.666667%;
    max-width: 66.666667%;
  }
`;

const Form = styled.form`
  width: 100%;
`

const InputControl = styled.input`
  font-size: 15px;
  width: 112%;
  padding: 15px;
  border-radius: 9px;
  border: 1px solid #ccc;
  margin-bottom: 15px;
`

const WeatherInfo = styled.div`
  display: flex;
  flex-direction: column;
`

const CityName = styled.h2`
  font-size: 30px;
  margin: 10px auto;
`

const Temp = styled.p`
  display: flex;
  font-size: 20px;
  margin: 3px auto;
`

const WeatherDesc = styled.p`
  display: flex;
  font-size: 20px;
  margin: 3px auto;
`

const WeatherIcon = styled.img`
  display: flex;
  margin: 3px auto;
  width: 30%;
  height: 30%;
`

function App() {
  const [location, setLocation] = useState(""); // 도시 이름을 입력받을 상태 변수
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (location) {
      searchWeather(location);
    }
  }, [location]);

  const searchWeather = async (city_name) => {
    try {
      const API_KEY = process.env.REACT_APP_WEATHER_KEY;
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${API_KEY}`;

      const response = await axios.get(url);
      console.log(response.data);
      setWeather(response.data);


    } catch (error) {
      console.error("오류 발생: ", error);
      setWeather(null);
    }
  };

  return (
    <Container>
      <Form>
        <Row>
          <Col xs={8}>
            <InputControl
              type="text"
              placeholder="도시를 입력하세요"
              value={location}
              onChange={(e) => setLocation(e.target.value)} // location 상태 변수 업데이트
            />
          </Col>
        </Row>
      </Form>

      {weather && (
        <WeatherInfo>
          <CityName>{weather.name}, {weather.sys.country}</CityName>
          <Temp>{Math.round(weather.main.temp - 273.15)}°C</Temp>
          <WeatherDesc>{weather.weather[0].description}</WeatherDesc>
          {weather.weather[0].icon && (
            <WeatherIcon
              src={`https://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
              alt="Weather Icon"
            />
          )}
        </WeatherInfo>
      )}
    </Container>
  );
}

export default App;
