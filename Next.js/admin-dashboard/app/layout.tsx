import { ReactNode } from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import { Toaster } from '@/components/ui/toaster'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Admin Dashboard | Next.js + Shadnc/ui',
    description: 'Admin Dashboard'
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <html lang='en'>
            <body className={inter.className}>
                <Navbar />
                <div className='flex'>
                    <div className='hidden md:block h-[100vh] w-[300px]'>
                        <Sidebar />
                    </div>
                    <div className='p-5 w-full md:max-w-[1140px]'>{children}</div>
                </div>
            </body>
            <Toaster />
        </html>
    )
}
