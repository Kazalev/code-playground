import { ReactNode } from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from '@/components/ui/toaster'
import ThemeProvider from '@/components/providers/ThemeProvider'
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
                <ThemeProvider attribute='class' defaultTheme='light' enableSystem={true} storageKey='dashboard-theme'>
                    {children}
                    <Toaster />
                </ThemeProvider>
            </body>
        </html>
    )
}
