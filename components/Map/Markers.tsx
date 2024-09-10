import React, { useContext } from 'react'

import {Marker} from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css';
import { UserLocationContext } from '@/context/UserLocationContext';
import { SourceCordiContext } from '@/context/SourceCordiContext';
import { DestinationCordiContext } from '@/context/DestinationCordiContext';

function Markers() {

    const {userLocation, setUserLocation}=useContext(UserLocationContext)

    const {sourceCoordinates, setSourceCoordinates} = useContext(SourceCordiContext);
    const {destinationCoordinates, setDestinationCoordinates} = useContext(DestinationCordiContext);


  return (
    <div>
        {/*user marker */}
        <Marker 
            longitude={userLocation?.lng}
            latitude={userLocation?.lat} 
            anchor="bottom" >
            <img src="./pin.png" className='w-7 h-10'/>
        </Marker>

        {/*source marker */}

        {sourceCoordinates? <Marker 
            longitude={sourceCoordinates?.lng}
            latitude={sourceCoordinates?.lat} 
            anchor="bottom" >
            <img src="./pin.png" className='w-7 h-10'/>
        </Marker>:null}

        {/*destination marker */}

        {destinationCoordinates? <Marker 
            longitude={destinationCoordinates?.lng}
            latitude={destinationCoordinates?.lat} 
            anchor="bottom" >
            <img src="./pin.png" className='w-7 h-10'/>
        </Marker>:null}

    </div>
  )
}

export default Markers
