import { NextResponse } from "next/server";

const BASE_URL="https://api.mapbox.com/search/searchbox/v1/suggest"

export async function GET(request:any){

    const{searchParams}=new URL(request.url);

    const searchText=searchParams.get('q');

    const res=await fetch(BASE_URL+'?q='+searchText+'&language=hr&limit=3&session_token=0e3950f9-36f1-4321-891b-42a743101c09&country=HR'
    +"&access_token="+process.env.MAPBOX_ACCESS_TOKEN,
    {
        headers:{
            "Content-Type":"application/json"
        }
    })

    const searchResult=await res.json();

    return NextResponse.json(searchResult)
}