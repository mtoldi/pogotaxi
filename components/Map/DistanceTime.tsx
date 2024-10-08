import { DirectionDataContext } from '@/context/DirectionDataContext';
import React, { useContext } from 'react'

function DistanceTime() {

    const {directionData, setDirectionData}=useContext(DirectionDataContext);

  return directionData?.routes&&(
    <div className='bg-yellow-300 p-4 rounded-md mt-4'>
        <h2 className='text-white text-[18px] font-bold'>
            Distance: <span className='font-bold mr-3 text-black'>
                {(directionData.routes[0].distance*0.001).toFixed(2)} Kilometers</span>
                Duration: <span className='font-bold text-black'>
                    {(directionData.routes[0].duration/60).toFixed(2)} Min</span>
        </h2>
    </div>
  )
}
export default DistanceTime
