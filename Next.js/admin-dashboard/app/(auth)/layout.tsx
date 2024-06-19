import ThemeToggler from '@/components/ThemeToggler'
import { ReactNode } from 'react'

const AuthLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className='h-[100vh] flex items-center justify-center relative'>
            <div className='absolute bottom-5 right-0 text-white'>
                <ThemeToggler />
            </div>
            {children}
        </div>
    )
}

export default AuthLayout
