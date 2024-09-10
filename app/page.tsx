"use client"

import Booking from "@/components/Booking/Booking";
import MapBoxMap from "@/components/Map/MapBoxMap";
import { DestinationCordiContext } from "@/context/DestinationCordiContext";
import { DirectionDataContext } from "@/context/DirectionDataContext";
import { SourceCordiContext } from "@/context/SourceCordiContext";
import { UserLocationContext } from "@/context/UserLocationContext";
import { selectedCarAmountContext } from "@/context/SelectedCarAmountContext";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {

  const [userLocation, setUserLocation] = useState<any>();
  const [sourceCoordinates, setSourceCoordinates] = useState<any>(null);
  const [destinationCoordinates, setDestinationCoordinates] = useState<any>(null);
  const [directionData, setDirectionData]=useState<any>(null);
  const [carAmount, setCarAmount]=useState<any>();

  useEffect(() => {
    getUserLocation();
  }, []);

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(function (pos) {
      console.log(pos);
      setUserLocation({
        lat:pos.coords.latitude,
        lng:pos.coords.longitude
      })
    });
  };
  
  return(
    <div>
        <UserLocationContext.Provider value={{userLocation, setUserLocation}}>
        <SourceCordiContext.Provider value={{sourceCoordinates, setSourceCoordinates}}>
        <DestinationCordiContext.Provider value={{destinationCoordinates, setDestinationCoordinates}}>
        <DirectionDataContext.Provider value={{directionData, setDirectionData}}>
        <selectedCarAmountContext.Provider value={{carAmount, setCarAmount}}>
          
        <div className="grid grid-cols-1 md:grid-cols-3 p-4 px-10">
          <div className="bg-white">
            <Booking/>
            
          </div>
          <div className="col-span-2 bg-white order-last md:order-last">
            <MapBoxMap/>
          </div>
        </div>
        </selectedCarAmountContext.Provider>
        </DirectionDataContext.Provider>
        </DestinationCordiContext.Provider>
        </SourceCordiContext.Provider>
        </UserLocationContext.Provider>
    </div>
  )
}
