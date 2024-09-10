"use client";

import { DestinationCordiContext } from '@/context/DestinationCordiContext';
import { SourceCordiContext } from '@/context/SourceCordiContext';
import React, { useEffect, useState, useRef, useContext } from 'react';

const session_token = '06ea2b05-2b19-4bf1-891c-c9bb6b506953';
const MAPBOX_RETRIEVE_URL = 'https://api.mapbox.com/search/searchbox/v1/retrieve/';

function AutocompleteAddress() {
    const [source, setSource] = useState<string>(''); // State for "Where From?"
    const [destination, setDestination] = useState<string>(''); // State for "Where To?"

    const [addressList, setAddressList] = useState<{ suggestions: any[] }>({ suggestions: [] });
    const [destinationList, setDestinationList] = useState<{ suggestions: any[] }>({ suggestions: [] });

    const {sourceCoordinates, setSourceCoordinates} = useContext(SourceCordiContext);
    const {destinationCoordinates, setDestinationCoordinates} = useContext(DestinationCordiContext);

    const sourceRef = useRef(false);
    const destinationRef = useRef(false);

    useEffect(() => {
        if (sourceRef.current) {
            sourceRef.current = false;
            return;
        }
        const delayDebounceFn = setTimeout(() => {
            if (source) getAddressList(source, setAddressList);
        }, 500);
        return () => clearTimeout(delayDebounceFn);
    }, [source]);

    useEffect(() => {
        if (destinationRef.current) {
            destinationRef.current = false;
            return;
        }
        const delayDebounceFn = setTimeout(() => {
            if (destination) getAddressList(destination, setDestinationList);
        }, 500);
        return () => clearTimeout(delayDebounceFn);
    }, [destination]);

    const getAddressList = async (query: string, setList: any) => {
        if (query.trim() === '') return;

        try {
            const res = await fetch('/api/search-address?q=' + query, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const result = await res.json();
            setList(result); // Set the suggestions for the respective input field
        } catch (error) {
            console.error("Failed to fetch address list", error);
        }
    };

    const onSourceAddressClick = async (item: any) => {
        setSource(item.full_address);
        setAddressList({ suggestions: [] }); // Clear the suggestions after selecting
        sourceRef.current = true; // Prevent immediate re-trigger

        const res = await fetch(MAPBOX_RETRIEVE_URL + item.mapbox_id + "?session_token=" + session_token + "&access_token=" + process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN);

        const result = await res.json();

        setSourceCoordinates({
            lng: result.features[0].geometry.coordinates[0],
            lat: result.features[0].geometry.coordinates[1]
        });
        console.log('Source Coordinates:', result);
    };

    const onDestinationAddressClick = async (item: any) => {
        setDestination(item.full_address);
        setDestinationList({ suggestions: [] }); // Clear the suggestions after selecting
        destinationRef.current = true; // Prevent immediate re-trigger

        const res = await fetch(MAPBOX_RETRIEVE_URL + item.mapbox_id + "?session_token=" + session_token + "&access_token=" + process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN);

        const result = await res.json();

        setDestinationCoordinates({
            lng: result.features[0].geometry.coordinates[0],
            lat: result.features[0].geometry.coordinates[1]
        });
        console.log('Destination Coordinates:', result);
    };

    return (
        <div className='mt-3'>
            <div className='relative'>
                <label className='text-gray-700'>Where From?</label>
                <input
                    type="text"
                    className='bg-white p-1 border-[1px] w-full rounded-md outline-none focus:border-yellow-300 text-black'
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                />

                {addressList.suggestions.length > 0 && (
                    <div className='shadow-md p-1 rounded-md absolute w-full bg-white max-h-60 overflow-y-auto z-50'>
                        {addressList.suggestions.map((item: any, index: number) => (
                            <h2
                                key={index}
                                className='p-3 hover:bg-yellow-200 cursor-pointer text-black'
                                onClick={() => onSourceAddressClick(item)}
                            >
                                {item.full_address}
                            </h2>
                        ))}
                    </div>
                )}
            </div>

            <div className='mt-8 relative'>
                <label className='text-gray-700'>Where To?</label>
                <input
                    type="text"
                    className='bg-white p-1 border-[1px] w-full rounded-md outline-none focus:border-yellow-300 text-black'
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                />

                {destinationList.suggestions.length > 0 && (
                    <div className='shadow-md p-1 rounded-md absolute w-full bg-white max-h-60 overflow-y-auto z-50'>
                        {destinationList.suggestions.map((item: any, index: number) => (
                            <h2
                                key={index}
                                className='p-3 hover:bg-yellow-200 cursor-pointer text-black'
                                onClick={() => onDestinationAddressClick(item)}
                            >
                                {item.full_address}
                            </h2>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default AutocompleteAddress;
