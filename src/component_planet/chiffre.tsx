import React, { useEffect, useState } from 'react';


import {chercheData} from '../fonction/fonction'



export default function Total_planete() {

    const [items, setItems] = useState<number>();//l'état initial doit être un array ne contenant pas d'objet


    useEffect(() => {
        let isMounted = true; 
        chercheData().then((tt) => {

            var gg = Object.values(tt)
            
            setItems(gg.length)
        });
        return () => { isMounted = false }; 
    }, [])


    return (
        <>
            
            
            <h4><div data-testid="testid1" className='text-center mx-0'>{items}</div></h4>
            
        </>
    )


}

