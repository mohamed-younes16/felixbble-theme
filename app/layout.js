
import { Toaster } from 'react-hot-toast'

import Nav from '../components/Nav'
import './globals.css'
import { Inter } from 'next/font/google'




const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Felixbble',
  description: 'Dribble theme  app',
 
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-200`} >
      <main suppressHydrationWarning={true} className="p-4  !mt-20 overflow-x-hidden main-container">
        <Nav/>
        
        <Toaster position='top-center'/>
        {children}
      </main>
        </body>
    </html>
  )
}
