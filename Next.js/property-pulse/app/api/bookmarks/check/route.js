import connectDB from '@/config/databasse'
import User from '@/models/User'
import { getSessionUser } from '@/utils/getSessionUser'

export const dynamic = 'force-dynamic'

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

        return new Response(JSON.stringify({ isBookmarked }), { status: 200 })
    } catch (err) {
        console.error(`Error creating bookmark: ${err}`)
        return new Response('Error creating bookmark', { status: 500 })
    }
}
