'use client'
import React, { FormEvent, useState } from 'react'
import { MdMyLocation, MdOutlineLocationOn, MdWbSunny } from 'react-icons/md'
import SearchBox from './SearchBox'
import axios from 'axios'
import { useAtom } from 'jotai'
import { loadingCityAtom, placeAtom } from '@/atom'

type NavbarProps = { location?: string }

export default function Navbar({ location }: NavbarProps) {
    const [city, setCity] = useState('')
    const [error, setError] = useState('')
    const [suggestions, setSuggestions] = useState<string[]>([])
    const [showSuggestions, setShowSuggestions] = useState(false)
    const [_place, setPlace] = useAtom(placeAtom)
    const [_loading, setLoading] = useAtom(loadingCityAtom)
    const [loadingCity, setLoadingCity] = useState(false)

    const handleInputChange = async (value: string) => {
        setCity(value)
        if (value.length >= 3) {
            try {
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/find?q=${value}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`
                )
                const suggestions = response.data.list.map((item: any) => item.name)
                setSuggestions(suggestions)
                setError('')
                setShowSuggestions(true)
            } catch (err) {
                setSuggestions([])
                setShowSuggestions(false)
            }
        } else {
            setSuggestions([])
            setShowSuggestions(false)
        }
    }

    const handleSuggestionClick = (value: string) => {
        setCity(value)
        setShowSuggestions(false)
    }

    const handleSubmitSearch = (e: FormEvent<HTMLFormElement>) => {
        setLoading(true)
        e.preventDefault()
        if (suggestions.length === 0) {
            setError('Location not found')
            setLoading(false)
        } else {
            setError('')
            setTimeout(() => {
                setLoading(false)
                setPlace(city)
                setCity('')
                setShowSuggestions(false)
            }, 500)
        }
    }

    const handleCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords
                try {
                    setLoadingCity(true)
                    const res = await axios.get(
                        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`
                    )
                    setTimeout(() => {
                        setLoadingCity(false)
                        setPlace(res.data.name)
                    }, 500)
                } catch (err) {
                    setLoadingCity(false)
                }
            })
        }
    }

    return (
        <>
            <nav className='shadow-sm sticky top-0 left-0 z-50 bg-white'>
                <div className='h-[80px] w-full flex justify-between items-center max-w-7xl px-3 mx-auto'>
                    <span className='flex items-center justify-center gap-2'>
                        <h2 className='text-gray-500 text-3xl'>Weather</h2>
                        <MdWbSunny className='text-3xl mt-1 text-yellow-300' />
                    </span>
                    <section className='flex gap-2 items-center'>
                        <MdMyLocation
                            title='Your Current Location'
                            onClick={handleCurrentLocation}
                            className='text-2xl text-gray-400 hover:opacity-80 cursor-pointer'
                        />
                        <MdOutlineLocationOn className='text-3xl' />
                        <p className='text-slate-900/80 text-sm'>{location}</p>
                        <div className='relative hidden md:flex'>
                            <SearchBox value={city} onSubmit={handleSubmitSearch} onChange={(e) => handleInputChange(e.target.value)} />
                            <SuggestionBox {...{ showSuggestions, suggestions, handleSuggestionClick, error }} />
                        </div>
                    </section>
                </div>
            </nav>
            <section className='flex max-w-7xl px-3 md:hidden'>
                <div className='relative'>
                    <SearchBox value={city} onSubmit={handleSubmitSearch} onChange={(e) => handleInputChange(e.target.value)} />
                    <SuggestionBox {...{ showSuggestions, suggestions, handleSuggestionClick, error }} />
                </div>
            </section>
        </>
    )
}

type SuggestionBoxProp = {
    showSuggestions: boolean
    suggestions: string[]
    handleSuggestionClick: (item: string) => void
    error: string
}

const SuggestionBox = ({ showSuggestions, suggestions, handleSuggestionClick, error }: SuggestionBoxProp) => {
    return (
        <>
            {((showSuggestions && suggestions.length > 1) || error) && (
                <ul className='mb-4 bg-white absolute border top-[44px] left-0 border-gray-300 rounded-md min-w-[200px] flex flex-col gap-1 py-2 px-2'>
                    {error && suggestions.length < 1 && <li className='text-red-500 p-1'>{error}</li>}
                    {suggestions.map((item, i) => (
                        <li key={i} onClick={() => handleSuggestionClick(item)} className='cursor-pointer p-1 rounednd hover:bg-gray-200'>
                            {item}
                        </li>
                    ))}
                </ul>
            )}
        </>
    )
}
