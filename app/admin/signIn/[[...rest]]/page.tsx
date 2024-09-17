import React from 'react'
import { SignIn } from '@clerk/nextjs'
function page() {
  return (
    <div className='flex justify-center items-center'>
      <div className='w-max h-full mt-[4em]'>
    <SignIn fallbackRedirectUrl="/admin" appearance={{elements:{footerAction:"hidden"}}}/>
    </div>
    </div>
  )
}

export default page
