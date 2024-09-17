"use client"
import React from 'react'

function SingleUpimg({src}:{src:string}) {


  return (
    <div className='w-[4em] overflow-hidden rounded h-[4em]'>
      <img className='w-full h-full object-cover' alt='image' src={src}/>
    </div>
  )
}

export default SingleUpimg
