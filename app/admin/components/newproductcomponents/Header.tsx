"use client"
import { useSearchParams } from 'next/navigation';
import React from 'react'

function Header() {
  const searchParams = useSearchParams()
  const isEdit = searchParams.get("edit");
  return (
    <div className='fixed bg-[#F8F8F8] flex justify-center items-center top-0 h-[3.625em] border-b w-full'>{isEdit?'Update Product':'Add New Product'}</div>
  )
}

export default Header
