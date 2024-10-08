"use client";

import { UserLocationContext } from '@/context/UserLocationContext';
import React, { useContext, useEffect, useRef } from 'react'
import {Map, Marker} from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css';
import Markers from './Markers';
import { SourceCordiContext } from '@/context/SourceCordiContext';
import { DestinationCordiContext } from '@/context/DestinationCordiContext';
import { DirectionDataContext } from '@/context/DirectionDataContext';
import MapBoxRoute from './MapBoxRoute';
import DistanceTime from './DistanceTime';


const MAPBOX_DRIVING_ENDPOINT = "https://api.mapbox.com/directions/v5/mapbox/driving/";
const session_token = "019bf7d3-73c6-4f51-891d-1a46012036da";


function MapBoxMap() {

    const mapRef=useRef<any>();

    const {userLocation, setUserLocation}=useContext(UserLocationContext)

    const {sourceCoordinates, setSourceCoordinates} = useContext(SourceCordiContext);
    const {destinationCoordinates, setDestinationCoordinates} = useContext(DestinationCordiContext);

    const {directionData, setDirectionData} = useContext(DirectionDataContext)

    //use to fly to source marker location
    useEffect(()=>{
      if(sourceCoordinates){
        mapRef.current?.flyTo({
          center:[
            sourceCoordinates.lng,
            sourceCoordinates.lat
          ],
          duration:2500
        })
      }
    },[sourceCoordinates])


    //use to fly to destination marker location
    useEffect(()=>{
      if(destinationCoordinates){
        mapRef.current?.flyTo({
          center:[
            destinationCoordinates.lng,
            destinationCoordinates.lat
          ],
          duration:2500
        })
      }
      if(sourceCoordinates&&destinationCoordinates){
        getDirectionRoute();
      }
    },[destinationCoordinates])

    const getDirectionRoute = async () => {
      const url = `${MAPBOX_DRIVING_ENDPOINT}${sourceCoordinates.lng},${sourceCoordinates.lat};${destinationCoordinates.lng},${destinationCoordinates.lat}?overview=full&geometries=geojson&access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`;
  
      try {
          const res = await fetch(url, {
              headers: {
                  "Content-Type": "application/json",
              }
          });
  
          if (!res.ok) {
              throw new Error(`Error fetching directions: ${res.statusText}`);
          }
  
          const result = await res.json();
          console.log(result);
          setDirectionData(result);
      } catch (error) {
          console.error("Failed to fetch direction route", error);
      }
  }


  return (
    <div className='bg-white rounded-2xl mt-4 p-4 ml-8'>
        <h2 className='text-black text-[30px] font-bold px-2'>Map</h2>

        <div className='rounded-lg overflow-hidden'>
            {userLocation? <Map
            ref={mapRef}
                mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
                initialViewState={{
                longitude: userLocation?.lng,
                latitude: userLocation?.lat,
                zoom: 14
                }}
                style={{width: '100%', height: 450, borderRadius:10}}
                mapStyle="mapbox://styles/mapbox/streets-v9"
            >
            <Markers/>
                {directionData?.routes?(
                  <MapBoxRoute coordinates={directionData?.routes[0]?.geometry?.coordinates}/>
                ):null}

            </Map>:null}
        </div>
          <div className=''>
            <DistanceTime/>
          </div>
              
              


    </div>
  )
}

export default MapBoxMap
