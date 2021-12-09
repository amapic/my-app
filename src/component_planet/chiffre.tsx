import React, { useEffect, useState } from 'react';

// import fetch from 'node-fetch'
// const fetch = require('node-fetch')
// const dfd = require("danfojs-node")
// import {dataT} from '../types/interface'
export const AA: String = 'RR'

import {chercheData} from '../fonction/fonction'



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

