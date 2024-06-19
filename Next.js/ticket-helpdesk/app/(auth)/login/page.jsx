'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

// components
import AuthForm from '../AuthForm'

export default function Login() {
    const router = useRouter()
    const [error, setError] = useState('')

    const handleLogin = async (e, email, password) => {
        e.preventDefault()
        setError('')

        const supabase = createClientComponentClient()
        const { error } = await supabase.auth.signInWithPassword({ email, password })

        if (error) setError(error.message)
        if (!error) router.push('/')
    }

    return (
        <main>
            <h2 className='text-center'>Log in</h2>
            <AuthForm onSubmit={handleLogin} />
            {error && <div className='error'>{error}</div>}
        </main>
    )
}
