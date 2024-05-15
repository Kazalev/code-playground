import React, { ReactNode } from 'react'
import { FiDroplet } from 'react-icons/fi'
import { ImMeter } from 'react-icons/im'
import { LuEye, LuSunrise, LuSunset } from 'react-icons/lu'
import { MdAir } from 'react-icons/md'

export type WeatherDetailsProps = {
    visibility: string
    humidity: string
    windSpeed: string
    airPrassure: string
    sunrise: string
    sunset: string
}

const WeatherDetails = (props: WeatherDetailsProps) => {
    const {
        visibility = '25km',
        humidity = '61%',
        windSpeed = '7 km/h',
        airPrassure = '1012 hPa',
        sunrise = '6.20',
        sunset = '18:48'
    } = props

    return (
        <>
            <SingleWeatherDetail icon={<LuEye />} information='Visibility' value={visibility} />
            <SingleWeatherDetail icon={<FiDroplet />} information='Humidity' value={humidity} />
            <SingleWeatherDetail icon={<MdAir />} information='Wind Speed' value={windSpeed} />
            <SingleWeatherDetail icon={<ImMeter />} information='Air Prassure' value={airPrassure} />
            <SingleWeatherDetail icon={<LuSunrise />} information='Sunrise' value={sunrise} />
            <SingleWeatherDetail icon={<LuSunset />} information='Sunrise' value={sunset} />
        </>
    )
}

export default WeatherDetails

export interface SingleWeatherDetailProps {
    information: string
    icon: ReactNode
    value: string
}

function SingleWeatherDetail(props: SingleWeatherDetailProps) {
    return (
        <div className='flex flex-col justify-between gap-2 items-center text-xs font-semibold text-black/80'>
            <p className='whtiespace-nowrap'>{props.information}</p>
            <div className='text-3xl'>{props.icon}</div>
            <p>{props.value}</p>
        </div>
    )
}
