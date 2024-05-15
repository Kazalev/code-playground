'use client'

import { useQuery } from 'react-query'
import Navbar from './components/Navbar'
import getWeather from '@/services/getWeather'
import { WeatherData } from './utils/types'
import { format, fromUnixTime, parseISO } from 'date-fns'
import Container from './components/Container'
import convertKelvinToCelsius from './utils/convertKelvinToCelsius'
import WeatherIcon from './components/WeatherIcon'
import { getDayOrNightIcon } from './utils/getDayOrNightIcon'
import WeatherDetails from './components/WeatherDetails'
import metersToKilometers from './utils/metersToKilometers'
import { converWindSpeed } from './utils/convertWindSpeed'
import ForecastWeatherDetail from './components/ForecastWeatherDetail'
import { loadingCityAtom, placeAtom } from '@/atom'
import { useAtom } from 'jotai'
import { useEffect } from 'react'

export default function Home() {
    const [place, setPlace] = useAtom(placeAtom)
    const [loading, setLoading] = useAtom(loadingCityAtom)

    const { data, isLoading, error, refetch } = useQuery<WeatherData>('weatherData', () => getWeather(place))

    useEffect(() => {
        refetch()
    }, [place, refetch])

    const firstData = data?.list[0]

    const uniqueDates = [...new Set(data?.list.map((entry) => new Date(entry.dt * 1000).toISOString().split('T')[0]))]

    // Filtering data to get the first entry after 6AM for each unique date
    const firstDataForEachDay = uniqueDates.map((date) => {
        return data?.list.find((entry) => {
            const entryDate = new Date(entry.dt * 1000).toISOString().split('T')[0]
            const entryTime = new Date(entry.dt * 1000).getHours()
            return entryDate === date && entryTime >= 6
        })
    })

    if (isLoading)
        return (
            <div className='flex items-center min-h-screen justify-center'>
                <p className='animate-bounce'>Loading...</p>
            </div>
        )

    return (
        <div className='flex flex-col gap-4 bg-gray-100 min-h-screen'>
            <Navbar location={data?.city.name} />
            <main className='px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4'>
                {loading ? (
                    <WeatherSkeleton />
                ) : (
                    <>
                        <section className='space-y-4'>
                            <div className='space-y-2'>
                                <h2 className='flex gap-1 text-2xl items-end'>
                                    <p>{format(parseISO(firstData?.dt_txt ?? ''), 'EEEE')}</p>
                                    <p className='text-lg'>({format(parseISO(firstData?.dt_txt ?? ''), 'dd.MM.yyyy')})</p>
                                </h2>
                                <Container className='gap-10 px-6 items-center'>
                                    {/* today data */}
                                    <div className='flex flex-col px-4'>
                                        <span className='text-5xl'>{convertKelvinToCelsius(firstData?.main.temp ?? 0)}°</span>
                                        <p className='text-xs space-x-1 whitespace-nowrap'>
                                            <span>Feels like</span>
                                            <span>{convertKelvinToCelsius(firstData?.main.feels_like ?? 0)}°</span>
                                        </p>
                                        <p className='text-xs space-x-2'>
                                            <span>{convertKelvinToCelsius(firstData?.main.temp_min ?? 0)}↓</span>
                                            <span>{convertKelvinToCelsius(firstData?.main.temp_max ?? 0)}↑</span>
                                        </p>
                                    </div>
                                    {/* time & weather icon */}
                                    <div className='flex gap-10 sm:gap-16 overflow-x-auto w-full justify-between pr-3'>
                                        {data?.list.map((d, i) => (
                                            <div key={i} className='flex flex-col justify-between gap-2 items-center text-xs font-semibold'>
                                                <p className='whitespace-nowrap'>{format(parseISO(d.dt_txt), 'h:mm a')}</p>
                                                <WeatherIcon icon={getDayOrNightIcon(d?.weather[0].icon, d.dt_txt)} />
                                                <p>{convertKelvinToCelsius(d?.main.temp ?? 0)}°</p>
                                            </div>
                                        ))}
                                    </div>
                                </Container>
                            </div>
                            <div className='flex gap-4'>
                                <Container className='w-fit justify-center flex-col px-4 items-center'>
                                    <p className='capitalize text-center'>{firstData?.weather[0].description}</p>
                                    <WeatherIcon icon={getDayOrNightIcon(firstData?.weather[0].icon ?? '', firstData?.dt_txt ?? '')} />
                                </Container>
                                <Container className='bg-yellow-300/80 px-6 gap-4 justify-between overflow-x-auto'>
                                    <WeatherDetails
                                        visibility={metersToKilometers(firstData?.visibility ?? 10000)}
                                        airPrassure={`${firstData?.main.pressure} hPa`}
                                        humidity={`${firstData?.main.humidity}%`}
                                        sunrise={format(fromUnixTime(data?.city.sunrise ?? 1702949452), 'H:mm')}
                                        sunset={format(fromUnixTime(data?.city.sunset ?? 1702517657), 'H:mm')}
                                        windSpeed={converWindSpeed(firstData?.wind.speed ?? 1.64)}
                                    />
                                </Container>
                            </div>
                        </section>

                        {/* 7 days forcast data  */}
                        <section className='flex w-full flex-col gap-4'>
                            <p className='text-2xl'>Forcast (7 days)</p>
                            {firstDataForEachDay.map((d, i) => (
                                <ForecastWeatherDetail
                                    key={i}
                                    description={d?.weather[0].description ?? ''}
                                    weatherIcon={d?.weather[0].icon ?? '01d'}
                                    date={format(parseISO(d?.dt_txt ?? ''), 'dd.MM')}
                                    day={format(parseISO(d?.dt_txt ?? ''), 'EEEE')}
                                    feels_like={d?.main.feels_like ?? 0}
                                    temp={d?.main.temp ?? 0}
                                    temp_min={d?.main.temp_min ?? 0}
                                    temp_max={d?.main.temp_max ?? 0}
                                    airPrassure={`${d?.main.pressure} hPa`}
                                    humidity={`${d?.main.humidity}%`}
                                    sunrise={format(fromUnixTime(data?.city.sunrise ?? 1702949452), 'H:mm')}
                                    sunset={format(fromUnixTime(data?.city.sunset ?? 1702517657), 'H:mm')}
                                    windSpeed={converWindSpeed(firstData?.wind.speed ?? 1.64)}
                                    visibility={metersToKilometers(firstData?.visibility ?? 10000)}
                                />
                            ))}
                        </section>
                    </>
                )}
            </main>
        </div>
    )
}

const WeatherSkeleton = () => {
    return (
        <div className='px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4'>
            <section className='space-y-4'>
                <div className='space-y-2 animate-pulse'>
                    {/* Placeholder for the first section */}
                    <div className='h-6 bg-gray-300 rounded'></div>
                    <div className='h-8 bg-gray-300 rounded'></div>
                    {/* ... */}
                </div>
                <div className='flex gap-4 animate-pulse'>
                    {/* Placeholder for the second section */}
                    <div className='h-12 bg-gray-300 rounded'></div>
                    <div className='h-12 bg-gray-300 rounded'></div>
                    {/* ... */}
                </div>
            </section>

            {/* Placeholder for the 7 days forecast data section */}
            <section className='flex w-full flex-col gap-4 animate-pulse'>
                <p className='text-2xl h-6 bg-gray-300 rounded'></p>
                {/* Placeholder for the forecast weather details */}
                {/* ... */}
            </section>
        </div>
    )
}
