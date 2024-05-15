import connectDB from '@/config/databasse'
import User from '@/models/User'
import Property from '@/models/Property'
import { getSessionUser } from '@/utils/getSessionUser'

export const dynamic = 'force-dynamic'

// GET /api/bookmarks
export const GET = async () => {
    try {
        await connectDB()
        const sessionUser = await getSessionUser()

        if (!sessionUser || !sessionUser.userID) return new Response('User ID is required', { status: 401 })

        const { userID } = sessionUser

        // Find user in DB
        const user = await User.findOne({ _id: userID })

        // Get users bookmarks
        const bookmarks = await Property.find({ _id: { $in: user.bookmarks } })

        return new Response(JSON.stringify(bookmarks), { status: 200 })
    } catch (err) {
        console.error(`Error getting bookmarks: ${err}`)
        return new Response('Error getting bookmarks', { status: 500 })
    }
}

export const POST = async (req) => {
    try {
        await connectDB()
        const { propertyId } = await req.json()
        const sessionUser = await getSessionUser()

        if (!sessionUser || !sessionUser.userID) return new Response('User ID is required', { status: 401 })

        const { userID } = sessionUser

        // Find user in DB
        const user = await User.findOne({ _id: userID })

        // Check if property is bookmarked
        let isBookmarked = user.bookmarks.includes(propertyId)
        let message

        if (isBookmarked) {
            // Remove bookmark
            user.bookmarks.pull(propertyId)
            message = 'Bookmark removed successfully'
            isBookmarked = false
        } else {
            // Add bookmark
            user.bookmarks.push(propertyId)
            message = 'Bookmark added successfully'
            isBookmarked = true
        }

        await user.save()

        return new Response(JSON.stringify({ message, isBookmarked }), { status: 200 })
    } catch (err) {
        console.error(`Error creating bookmark: ${err}`)
        return new Response('Error creating bookmark', { status: 500 })
    }
}
