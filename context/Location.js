// 24ae63ab5e4e4d00ba2e72a6f08ecb87
import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios';
import key from "../pages/api/key";



export const CurrentWeatherContext = createContext(null);
const LocationContextProvider = (props) => {
    const [location, setLocation] = useState(null);
    const [currentWeather, setCurrentWeather] = useState(null);
    const [hourWeather, setHourWeather] = useState(null);
    const [tomorrowWeather, setTomorrowWeather] = useState('');
    let [toggle, setToggle] = useState(true)
    
   
    let loader = true;
    const setCurrentLocation = (location) => {
        setLocation(location)
    };
    const API_KEY = '24ae63ab5e4e4d00ba2e72a6f08ecb87';
    useEffect(() => {
        const url = `https://api.ipgeolocation.io/ipgeo?apiKey=${API_KEY}`;
      
        const geographic = async () => {
            try {
                let res = await axios.get(url);
                const { city, country_name, latitude, longitude } = await res.data;
                location = { city, country_name, latitude, longitude}
                setLocation(location)
                
                    

    
            } catch (error) {
                console.log(error);
             
            }

            const urlC = `${key.BASE_URL}/current.json?key=${key.API_KEY}&q=${location?.latitude}&q=${location?.longitude}&aqi=no&alerts=no`;

            try {
                

                let result = await axios.get(urlC);
                currentWeather = result.data
                setCurrentWeather( currentWeather)
                
    
            } catch (error) {
                console.log(error);
               
            }

            const urlH = `${key.BASE_URL}/forecast.json?key=${key.API_KEY}&q=${location?.latitude}&q=${location?.longitude}&q=hour&aqi=no&alerts=no`;

            try {
                

                let result = await axios.get(urlH);
                hourWeather = result.data.forecast.forecastday[0].hour
                setHourWeather( hourWeather)
               
    
            } catch (error) {
                console.log(error);
               
            }

            const urlF = `${key.BASE_URL}/forecast.json?key=${key.API_KEY}&q=${location?.latitude}&q=${location?.longitude}&q=hour&days=2&aqi=no&alerts=no`;

            try {
                

                let result = await axios.get(urlF);
                tomorrowWeather = result.data.forecast.forecastday[1].hour
                setTomorrowWeather( tomorrowWeather)
                
    
            } catch (error) {
                console.log(error);
               
            }
        }
      if(loader)  geographic()
      return ()=>{
          loader = false;
      }
       
    }, []);

    


    
    return (
        <CurrentWeatherContext.Provider
            value={{setCurrentLocation , currentWeather, setCurrentWeather, hourWeather, setHourWeather, tomorrowWeather, setTomorrowWeather, toggle, setToggle}}>
            {props.children}
        </CurrentWeatherContext.Provider>
    )
}
export default LocationContextProvider