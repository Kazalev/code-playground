import axios from 'axios'

// const WEATHER_API = `https://api.openweathermap.org/data/2.5/forecast?q=Sofia&appid=781ee36a32984ffcaad0a734329cef96&cnt=56`
let weatherAPI = `https://api.openweathermap.org/data/2.5/forecast`
const generateWeatherAPI = (place: string) => weatherAPI + `?q=${place}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=56`

const getWeather = async (place: string) => {
    const WEATHER_API = generateWeatherAPI(place)
    return (await axios.get(WEATHER_API)).data
}

export default getWeather
