import React from 'react'
import localFont from 'next/font/local'
const font = localFont({src:"./admin/fonts/std_book.woff2"})
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { Metadata } from 'next'
export const metadata:Metadata={
  title:"ADMIN| NUBE",
  icons:"/lock.svg"
}
function RootLayout({children}:{children:React.ReactNode}) {
  return (
    <html>
      <body>


    <ClerkProvider>
      <div className={`bg-[#F8F8F8] ${font.className} min-h-screen`}>
      {children}
      </div>
      </ClerkProvider>
      </body>
      </html>

  )
}

export default RootLayout
