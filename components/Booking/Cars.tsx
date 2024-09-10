"use client";

import { DirectionDataContext } from '@/context/DirectionDataContext';
import { selectedCarAmountContext } from '@/context/SelectedCarAmountContext';
import CarsList from '@/data/CarsList';
import Image from 'next/image';
import React, { useContext, useState } from 'react';

function Cars() {
    const [selectedCar, setSelectedCar] = useState<number | null>(null); // Initializing state with null
    const { directionData } = useContext(DirectionDataContext);

    const {carAmount, setCarAmount}=useContext(selectedCarAmountContext);


    const getCost = (charges: any) => {
        if (directionData && directionData.routes && directionData.routes[0]) {
            return (4 + charges * directionData.routes[0].distance * 0.001).toFixed(2);
        }
        return null; // Return null if directionData or routes is not available
    };

    return (
        <div className='mt-8 text-gray-700'>
            <h2 className='font-semibold text-gray-700'>Select Car</h2>
            <div className='grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3'>
                {CarsList.map((item, index) => (
                    <div
                        key={index}
                        className={`m-2 p-2 border-[2px] rounded-md hover:border-yellow-300 cursor-pointer hover:scale-110 transition-all ${index === selectedCar ? 'border-yellow-300 border-[2px] scale-110' : ''}`}
                        onClick={() => {setSelectedCar(index);
                            setCarAmount(getCost(item.charges))}
                        }
                    >
                        <Image
                            src={item.image}
                            alt={item.name}
                            width={120}
                            height={140}
                            className='w-full'
                        />
                        <h2 className='text-center mt-2'>{item.name}</h2>
                        {directionData && directionData.routes ? (
                            <p className='text-center text-yellow-400 font-bold mt-1'>{getCost(item.charges)}€</p>
                        ) : null}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Cars;
