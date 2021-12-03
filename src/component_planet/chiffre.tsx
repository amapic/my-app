import React, { useEffect, useState } from 'react';

// import fetch from 'node-fetch'
const fetch = require('node-fetch')
// const dfd = require("danfojs-node")
import {dataT} from '../types/interface'
export const AA: String = 'RR'

export const chercheData = async (): Promise<dataT[] | boolean> => {

    const response = await fetch("http://127.0.0.1:8080/api/planets");
    const responseData = await response.json();
    // console.log(responseData);
    if (response.ok) {
        var data = [];
        var dictOfResponseData: any = {}
        var miniDict = {}
        for (const [key, value] of Object.entries(responseData)) {
            dictOfResponseData[key] = value
        }

        return dictOfResponseData

    } else {
        alert(JSON.stringify(responseData))
        return false
    }

}



export function Total_planete() {

    const [items, setItems] = useState<number>();//l'état initial doit être un array ne contenant pas d'objet


    useEffect(() => {
        chercheData().then((tt) => {

            var gg = Object.values(tt)
            
            setItems(gg.length)
        });
    }, [])


    return (
        <>
            
            
            <h4><div className='text-center mx-0'>{items}</div></h4>
            
        </>
    )


}

