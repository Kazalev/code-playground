import Image from 'next/image'
import React, { HTMLProps } from 'react'
import { cn } from '../utils/cn'

export default function WeatherIcon(props: HTMLProps<HTMLDivElement> & { icon: string }) {
    return (
        <div {...props} className={cn(`relative h-20 w-20`)}>
            <Image
                width={100}
                height={100}
                alt='weather-icon'
                className='aboslute h-full w-full'
                src={`https://openweathermap.org/img/wn//${props.icon}@4x.png`}
            />
        </div>
    )
}
