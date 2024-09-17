"use client"
import React, { useState } from 'react'
import supabase from '@/utils/supabase'
import { useQuery } from '@tanstack/react-query'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Spinner } from '@chakra-ui/react'
function Notification() {
  const [showUpdater,setShowUpdater] = useState<boolean>(false)
  const [isLoading,setIsLoading] = useState<boolean>(false)
  const fetchNot = async ()=>{
    const {data} = await supabase.from("Notification").select().single();
    return data;
  }
  const {data,isPending} = useQuery({
     queryKey:["data"],
     queryFn:()=>fetchNot(),
  });
const handleUpdate = ()=>{
 setShowUpdater(!showUpdater);
 const divy:HTMLElement|null = document.querySelector('.Divy');
 divy?.focus()
}
const Buttons = ()=>{
  return <> {showUpdater?<button  onClick={handleSupaUpdate} className={`noty   flex justify-center items-center bg-[#72E3ADCC] px-[0.75em] py-[0.5em] text-black border border-1 border-[#097C4F] rounded-[0.3125em] font-[500] text-[0.75em]`}>{isLoading?<Spinner/>:'Done'}</button>
  :<button  onClick={handleUpdate} className={`noty   flex justify-center items-center bg-[#72E3ADCC] px-[0.75em] py-[0.5em] text-black border border-1 border-[#097C4F] rounded-[0.3125em] font-[500] text-[0.75em]`}>Update</button>}
</>
}
const handleSupaUpdate = async ()=>{
  const divValue:HTMLElement|null = document.querySelector('.Divy');
 setIsLoading(true);
 await supabase.from("Notification").update({Notification:divValue?.innerText}).eq("id",1);
 setIsLoading(false)
 setShowUpdater(false)
}


  return (
    <>
    <div className='p-[2em] min-h-[10.5em]  relative border mt-[1em]'>
      <div className='flex w-full justify-between'>
        <p>Notification</p>
        <Buttons/>
        </div>
      <div>{showUpdater?'Update notification':'current notification'}: {isPending?<Skeleton className='h-[2em] w-[12em]'/>:<div className={`Divy p-[1em] text-wrap h-max rounded-none w-full overflow-auto mt-[1em] ${showUpdater&&' border-2 border-black'}`} contentEditable={showUpdater}>{data&&data.Notification}</div>}</div>

      </div>
      </>
  )
}

export default Notification
