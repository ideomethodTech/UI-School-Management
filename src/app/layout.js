/* src/app/layout.js */
import './globals.css'
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'School Management',
  description: 'Admin Dashboard'
}

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={inter.className + ' min-h-screen bg-[#F7F8FA]'}>
        {children}
      </body>
    </html>
  )
}
