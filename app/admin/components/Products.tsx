"use client"
import React, { useState } from 'react'
import ProductHeader from './ProductHeader'
import Searchproducts from './Searchproducts'
import Allproducts from './Allproducts'
import SIngleInfo from './SIngleInfo'

function Products() {
  const [ShowsingleProduct,setSingleproduct] = useState<boolean>(false);
  const [singleProductInfo,setSingleProductInfo] = useState({});

  return (
    <div className='w-full h-full'>
   <ProductHeader/>
   <Searchproducts/>
   <Allproducts setsingleProductInfo={setSingleProductInfo} functionForChildren={setSingleproduct} />
    {ShowsingleProduct&&<SIngleInfo singleProductInfo={singleProductInfo} setSingleProduct={setSingleproduct}/>}

       </div>
  )
}

export default Products
