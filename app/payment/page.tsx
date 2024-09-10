"use client"

import { selectedCarAmountContext } from '@/context/SelectedCarAmountContext';
import { loadStripe } from '@stripe/stripe-js';
import React, { useContext } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import CheckOutForm from '@/components/Payment/CheckOutForm';
import { useSearchParams } from 'next/navigation';


function page() {

    //const {carAmount, setCarAmount}=useContext(selectedCarAmountContext);
    const searchParam=useSearchParams();

    const amount:any=searchParam.get('amount');


    const stripePromise:any=loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as any)
    const options:any = {
        mode: 'payment',
        amount: 5000,
        currency: 'usd',
    };

  return (
    <Elements stripe={stripePromise} options={options}>
        <CheckOutForm amount={amount}/>
    </Elements>
  )
}

export default page