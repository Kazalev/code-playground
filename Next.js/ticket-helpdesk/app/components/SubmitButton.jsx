'use client'

import { experimental_useFormStatus as useFormStatus } from 'react-dom'

const SubmitButton = () => {
    const { pending } = useFormStatus()

    return (
        <button className='btn-primary' disabled={pending}>
            {pending ? 'Submitting...' : 'Submit'}
        </button>
    )
}

export default SubmitButton
