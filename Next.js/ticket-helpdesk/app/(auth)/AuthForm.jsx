'use client'
import { useState } from 'react'

export default function AuthForm({ onSubmit }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <form onSubmit={(e) => onSubmit(e, email, password)}>
            <label>
                <span>Email:</span>
                <input type='email' onChange={(e) => setEmail(e.target.value)} value={email} requried />
            </label>

            <label>
                <span>Password:</span>
                <input type='password' onChange={(e) => setPassword(e.target.value)} value={password} requried />
            </label>

            <button className='btn-primary'>Submit</button>
        </form>
    )
}
