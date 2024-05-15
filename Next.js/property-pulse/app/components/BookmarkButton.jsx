'use client'

import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { FaBookmark } from 'react-icons/fa'
import { toast } from 'react-toastify'

const BookmarkButton = ({ property }) => {
    const { data: session } = useSession()
    const userID = session?.user?.id
    const [isBookmarked, setIsBookmarked] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!userID) {
            setLoading(false)
            return
        }

        const checkBookmarkStatus = async () => {
            try {
                const res = await fetch('/api/bookmarks/check', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ propertyId: property._id })
                })

                if (res.status === 200) {
                    const data = await res.json()
                    setIsBookmarked(data.isBookmarked)
                }
            } catch (err) {
                console.error('Error checking bookmark: ', err)
            } finally {
                setLoading(false)
            }
        }

        checkBookmarkStatus()
    }, [property._id, userID])

    const handleClick = async () => {
        if (!userID) {
            toast.error('You must be logged in to bookmark a property')
            return
        }

        try {
            const res = await fetch('/api/bookmarks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ propertyId: property._id })
            })

            if (res.status === 200) {
                const data = await res.json()
                toast.success(data.message)
                setIsBookmarked(data.isBookmarked)
            }
        } catch (err) {
            console.error('Error creating bookmark: ', err)
            toast.error('Something went wrong')
        }
    }

    const removeBookmarkBtn = () => (
        <button
            onClick={handleClick}
            className='bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center'
        >
            <FaBookmark className='mr-2' /> Remove Bookmark
        </button>
    )

    const addBookmarkBtn = () => (
        <button
            onClick={handleClick}
            className='bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center'
        >
            <FaBookmark className='mr-2' /> Bookmark Property
        </button>
    )

    if (loading) return <p className='text-center'>Loading...</p>

    return isBookmarked ? removeBookmarkBtn() : addBookmarkBtn()
}

export default BookmarkButton
