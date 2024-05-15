import connectDB from '@/config/databasse'
import Property from '@/models/Property'
import { getSessionUser } from '@/utils/getSessionUser'

// GET /api/properties/:id
export const GET = async (req, { params }) => {
    try {
        await connectDB()
        const property = await Property.findById(params.id)

        if (!property) return new Response('Property Not Found', { status: 404 })

        return new Response(JSON.stringify(property), { status: 200 })
    } catch (err) {
        console.error(err)
        return new Response('Internal Server Error', {
            status: 500
        })
    }
}

// PUT /api/properties/:id
export const PUT = async (req, { params }) => {
    try {
        await connectDB()

        const sessionUser = await getSessionUser()

        if (!sessionUser || !sessionUser.userID) {
            return new Response('User ID is required', { status: 401 })
        }

        const { id } = params
        const { userID } = sessionUser

        const formData = await req.formData()

        // Access all values from amenity and images fields
        const amenities = formData.getAll('amenities')

        // Get property to update
        const existingProperty = await Property.findById(id)
        if (!existingProperty) return new Response('Property does not exist', { status: 404 })

        // Verify ownership
        if (existingProperty.owner.toString() !== userID) return new Response('Unauthorized', { status: 401 })

        // Create property object for database
        const propertyData = {
            type: formData.get('type'),
            name: formData.get('name'),
            description: formData.get('description'),
            location: {
                street: formData.get('location.street'),
                city: formData.get('location.city'),
                state: formData.get('location.state'),
                zipcode: formData.get('location.zipcode')
            },
            beds: formData.get('beds'),
            baths: formData.get('baths'),
            square_feet: formData.get('square_feet'),
            amenities,
            rates: {
                weekly: formData.get('rates.weekly'),
                monthly: formData.get('rates.monthly'),
                nightly: formData.get('rates.nightly')
            },
            seller_info: {
                name: formData.get('seller_info.name'),
                email: formData.get('seller_info.email'),
                phone: formData.get('seller_info.phone')
            },
            owner: userID
        }

        // Update property in database
        const updatedProperty = await Property.findByIdAndUpdate(id, propertyData)

        return new Response(JSON.stringify(updatedProperty), { status: 200 })
    } catch (error) {
        console.error(error)
        return new Response('Internal Server Error', {
            status: 500
        })
    }
}

// DELETE /api/properties/:id
export const DELETE = async (req, { params }) => {
    try {
        const propertyID = params.id
        const sessionUser = await getSessionUser()

        if (!sessionUser || !sessionUser.userID) return new Response('User ID is required', { status: 401 })
        const { userID } = sessionUser

        await connectDB()
        const property = await Property.findById(propertyID)

        if (!property) return new Response('Property Not Found', { status: 404 })

        // Verify ownership
        if (property.owner.toString() !== userID) return new Response('Unauthorized', { status: 401 })

        await property.deleteOne()

        return new Response('Property deleted successfully', { status: 200 })
    } catch (err) {
        console.error(err)
        return new Response('Internal Server Error', {
            status: 500
        })
    }
}
