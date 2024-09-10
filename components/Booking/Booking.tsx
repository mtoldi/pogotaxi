import React, { useContext, useState } from 'react'
import AutocompleteAddress from './AutocompleteAddress'
import Cars from './Cars'
import Cards from './Cards'
import { useRouter } from 'next/navigation'
import { selectedCarAmountContext } from '@/context/SelectedCarAmountContext'

function Booking() {

    const screenHeight=760

    const {carAmount, setCarAmount}=useContext(selectedCarAmountContext);

    const router:any= useRouter()

  return (
    <div className='p-4 bg-white rounded-2xl mt-4'>
        <h2 className='text-[30px] text-black font-bold px-2'>Booking</h2>

        <div className='p-2 rounded-md' style={{height:screenHeight}}>
            <AutocompleteAddress/>
            <Cars/>
            <Cards/>
            <button className={`w-full bg-yellow-300 p-1 rounded-md mt-8 text-black font-semibold text-[20px] ${!carAmount?'bg-gray-200':null}`}
            disabled={!carAmount}
            onClick={()=>router.push('/payment?amount='+(carAmount))}
            >Book</button>
        </div>
    </div>
  )
}

export default Booking
