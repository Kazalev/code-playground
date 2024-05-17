import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
    const res = await fetch('http://localhost:4000/tickets')

    const tickets = await res.json()

    return NextResponse.json(tickets, { status: 200 })
}

export async function POST(request) {
    const ticket = await request.json()

    // Get supabase instance
    const supabase = createRouteHandlerClient({ cookies })

    // Get current user session

    const {
        data: { session }
    } = await supabase.auth.getSession()

    // Insert the data into the database
    const { data, error } = await supabase
        .from('Tickets')
        .insert({ ...ticket, user_email: session.user.email })
        .select()
        .single()

    return NextResponse.json({ data, error })
}
