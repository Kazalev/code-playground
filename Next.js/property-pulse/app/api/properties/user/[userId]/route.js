import connectDB from '@/config/databasse'
import Property from '@/models/Property'

// GET /api/properties/user/:userId
export const GET = async (req, { params }) => {
    try {
        await connectDB()
        const userID = params.userId
        if (!userID) return new Response('User ID is required', { status: 400 })

        const properties = await Property.find({ owner: userID })
        return new Response(JSON.stringify(properties), { status: 200 })
    } catch (err) {
        console.error(err)
        return new Response('Internal Server Error', {
            status: 500
        })
    }
}
