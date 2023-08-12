import './globals.css'
import { Inter } from 'next/font/google'
import { UserProvider } from './contexts/UserContext';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Weekly Hacks',
  description: 'Tracker app for weekly hacks',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  )
}
