import React, { ChangeEventHandler, FormEventHandler } from 'react'
import { IoSearch } from 'react-icons/io5'
import { cn } from '../utils/cn'

type SearchBoxProps = {
    className?: string
    value: string
    onChange: ChangeEventHandler<HTMLInputElement> | undefined
    onSubmit: FormEventHandler<HTMLFormElement> | undefined
}

export default function SearchBox({ className, value, onChange, onSubmit }: SearchBoxProps) {
    return (
        <form onSubmit={onSubmit} className={cn(`flex relative items-center justify-center h-10 ${className}`)}>
            <input
                value={value}
                onChange={onChange}
                type='text'
                placeholder='Search location...'
                className='px-4 py-2 w-[230px] border border-gray-300 rounded-l-md focus:outline-none focus:border-blue-500 h-full'
            />
            <button className='px-4 py-[9px] bg-blue-500 text-white rounded-r-md focus:outline-none hover:bg-blue-600 h-full'>
                <IoSearch className='' />
            </button>
        </form>
    )
}
