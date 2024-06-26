import cloudinary from '@/config/cloudinary'
import connectDB from '@/config/databasse'
import Property from '@/models/Property'
import { getSessionUser } from '@/utils/getSessionUser'

// GET /api/properties
export const GET = async (req) => {
    try {
        await connectDB()
        const properties = await Property.find({})
        return new Response(JSON.stringify(properties), { status: 200 })
    } catch (err) {
        console.error(err)
        return new Response('Internal Server Error', {
            status: 500
        })
    }
}

// POST /api/properties
export const POST = async (req) => {
    try {
        await connectDB()

        const sessionUser = await getSessionUser()

        if (!sessionUser || !sessionUser.userID) {
            return new Response('User ID is required', { status: 401 })
        }

        const { userID } = sessionUser

        const formData = await req.formData()

        // Access all values from amenity and images fields
        const amenities = formData.getAll('amenities')
        const images = formData.getAll('images').filter((image) => image.name !== '')

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

        // Upload images to Cloudinary
        const imageUploadPromises = []

        for (const image of images) {
            const imageBuffer = await image.arrayBuffer()
            const imageArray = Array.from(new Uint8Array(imageBuffer))
            const imageData = Buffer.from(imageArray)

            // Convert the image data to base64
            const imageBase64 = imageData.toString('base64')

            // Make request to upload to Cloudinary
            const result = await cloudinary.uploader.upload(`data:image/png;base64,${imageBase64}`, {
                folder: 'propertypulse'
            })

            imageUploadPromises.push(result.secure_url)

            // Wait for all images to upload
            const uploadedImages = await Promise.all(imageUploadPromises)
            // Add Uploaded images to property object
            propertyData.images = uploadedImages
        }

        // Save property to database
        const newProperty = new Property(propertyData)
        await newProperty.save()

        return Response.redirect(`${process.env.NEXTAUTH_URL}/properties/${newProperty._id}`)

        // return new Response(JSON.stringify({ message: 'Success' }), { status: 200 })
    } catch (error) {
        console.error(error)
        return new Response('Internal Server Error', {
            status: 500
        })
    }
}
