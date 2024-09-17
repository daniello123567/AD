"use client"
import { useRouter } from 'next/navigation'
import React from 'react'

function Confirm({setShowConfirm}:{setShowConfirm:(value:boolean)=>void}) {
  const router = useRouter()
  const handleDelete =async ()=>{
    router.push('/admin');
    setShowConfirm(false);
  }
  return (
    <div className='rounded-[0.5em] flex justify-center items-center fixed top-0 w-full bg-white/10 backdrop-blur-sm h-screen'>
      <div className='bg-white p-[1em] w-[32em] h-[13.5em]'>
        <p className='border-b pb-[1em]'>Confirm to Cancel?</p>
        <div className='w-full h-[4.625em] flex justify-center items-center rounded-sm mt-[1em] border border-[#f3aeaf]'>
          <p className='text-[#381316]'>Are you sure you want to Cancel? it wont be saved
          </p>
        </div>
        <div className='flex w-full justify-end items-center pt-[1em] gap-[1em]'>
        <button onClick={()=>setShowConfirm(false)}  type='button' className={`flex justify-center items-center bg-[#72E3ADCC] px-[0.75em] py-[0.5em] text-black border border-1 border-[#097C4F] rounded-[0.3125em] font-[500] text-[0.75em]`}>cancel</button>
        <button onClick={handleDelete} type='button' className={`flex justify-center  items-center bg-[#e39672cc] px-[0.75em] py-[0.5em] text-black border border-1 border-[#eb8a8b] rounded-[0.3125em]  font-[500] text-[0.75em]`}>delete</button>

        </div>
      </div>
    </div>
  )
}

export default Confirm
