import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React from 'react'

interface CheckOutFormProps{
    amount: number;
}

const CheckOutForm: React.FC<CheckOutFormProps>=({amount})=> {

    const stripe:any=useStripe();
    const elements:any = useElements();

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        if (elements == null){
            return
        }
    

    const { error: submitError} = await elements.submit();
    if(submitError){
        return;
        }
            //create the pamynet intent and obtain clientsecret
    const res = await fetch("/api/create-intent",{
        method: "POST",
        body: JSON.stringify({
            amount:amount,
        }),
    });

    const sec = await res.json();
    
    console.log(sec);
    const { error } = await stripe.confirmPayment(
        {
            clientSecret: sec,
            elements,
            confirmParams:{
                return_url:"http://localhost:3000/"
            },
        }
    );
    }
    
  return (
    <div className='flex flex-col justify-center items-center w-full mt-8'>
    <h2 className='m-5 font-bold text-black'>Amount to Pay: {amount}$</h2>
    <form onSubmit={handleSubmit}
    className='max-w-md'>
        <PaymentElement/>
        <button type='submit'
        className='w-full bg-yellow-400 p-4 rounded-lg mt-4 text-black font-bold' disabled={!stripe || !elements}>
            Pay
        </button>
    </form>
    </div>
  )
}

export default CheckOutForm;