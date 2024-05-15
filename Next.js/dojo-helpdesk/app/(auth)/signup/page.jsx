'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

// compoennts
import AuthForm from '../AuthForm'

export default function Signup() {
    const router = useRouter()
    const [error, setError] = useState('')

    const handleSignUp = async (e, email, password) => {
        e.preventDefault()
        setError('')

        const supabase = createClientComponentClient()
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: { emailRedirectTo: `${location.origin}/api/auth/callback` }
        })

        if (error) {
            setError(error.message)
        }

        if (!error) {
            router.push('/verify')
        }
    }

    return (
        <main>
            <h2 className='text-center'>Sign up</h2>
            <AuthForm onSubmit={handleSignUp} />
            {error && <div className='error'>{error}</div>}
        </main>
    )
}
