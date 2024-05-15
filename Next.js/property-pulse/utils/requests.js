const API_DOMAIN = process.env.NEXT_PUBLIC_API_DOMAIN || null

// Fetch all properties
const fetchProperties = async () => {
    try {
        // Handle the case where the API_DOMAIN is not set
        if (!API_DOMAIN) throw new Error('API_DOMAIN is not set')

        const res = await fetch(`${API_DOMAIN}/properties`, { cache: 'no-store' })

        if (!res.ok) throw new Error('Faild to fetch properties')

        return res.json()
    } catch (err) {
        console.error(err)
        return []
    }
}

// Fetch single property
const fetchProperty = async (id) => {
    try {
        // Handle the case where the API_DOMAIN is not set
        if (!API_DOMAIN) throw new Error('API_DOMAIN is not set')

        const res = await fetch(`${API_DOMAIN}/properties/${id}`)

        if (!res.ok) throw new Error('Faild to fetch the property')

        return res.json()
    } catch (err) {
        console.error(err)
        return null
    }
}

export { fetchProperties, fetchProperty }
