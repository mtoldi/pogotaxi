"use client";

import Image from 'next/image';
import CardsList from '@/data/CardsList'; // Provjeri da li je putanja ispravna
import React, { useState } from 'react';

function Cards() {
    const [selectedCard, setSelectedCard] = useState<number | null>(null); // Initializing state with null

    return (
        <div className='mt-8 text-gray-700'>
            <h2 className='font-semibold text-gray-700'>Payment Method</h2>
            <div className='grid grid-cols-4 mt-2 gap-4'>
                {CardsList.map((item, index) => (
                    <div
                        key={index}
                        className={`flex items-center justify-center border-[2px] hover:border-yellow-300 hover:scale-110 rounded-lg cursor-pointer p-2 transition-all ${index === selectedCard ? 'border-yellow-300 scale-110' : 'border-gray-300'}`}
                        onClick={() => setSelectedCard(index)}
                    >
                        <Image 
                            src={item.image} 
                            alt={item.name} 
                            width={60} 
                            height={100} 
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Cards;
