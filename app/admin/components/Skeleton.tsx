"use client"
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function SkeletonSearch() {
  return (

        <div className='w-full px-[1em]'>
    <Skeleton width={"95%"} height={"2em"}/>
    <Skeleton width={"80%"} height={"2em"}/>
    <Skeleton width={"60%"} height={"2em"}/>
    </div>
  )
}

export default SkeletonSearch
