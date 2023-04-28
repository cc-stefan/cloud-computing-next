import axios from 'axios';

const API_KEY = 'cc2e92eee0df46cfa30103101232804';

export async function getWeatherByCity(city) {
    try {
        const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`);
        const { temp_c: temp, condition: weather } = response.data.current;
        return {
            temp,
            weather,
        };
    } catch (error) {
        console.error(`Error fetching weather data for city "${city}":`, error);
        throw error;
    }
}
