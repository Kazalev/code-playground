import Navbar from './components/Navbar'
import Footer from './components/Footer'
import AuthProvider from './components/AuthProvider'
import { ToastContainer } from 'react-toastify'
import '@/assets/styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'

export const metadata = {
    title: 'PropertyPulse | Find The Perfect Rental',
    description:
        'PropertyPulse is the best place to find your next rental property. Search for apartments, houses, and condos for rent in your area.',
    keywords: 'rental, property, apartment, house, condo, real estate, find, search'
}

const MainLayout = ({ children }) => {
    return (
        <AuthProvider>
            <html lang='en'>
                <body>
                    <Navbar />
                    <main>{children}</main>
                    <Footer />
                    <ToastContainer />
                </body>
            </html>
        </AuthProvider>
    )
}

export default MainLayout
