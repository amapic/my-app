
import React, { useState, useEffect } from 'react';
import { chercheData } from '../fonction/fonction'
import { dataT } from '../types/interface'
export default function Dashboard(): JSX.Element {


    return (
        <section>
            <div className="ee">Prout</div>
            <div className="ee">Historique</div>
        </section>
    );

}

export function Fc_containing_FC(): JSX.Element {


    return (
        <section>
            <div className="ee">Prout</div>
            <div className="ee">Historique</div>
            <Fc />
        </section>
    );

}
type Props = {
    title: string,
    children: JSX.Element,
};

// function useCounter(props:any) {
//     const [count, setCount] = useState(0)
//     const increment = () => setCount(currentCount => currentCount + 1)
//     return {count, increment}
//   }

//   const Fc = ({children, ...props}:Props) => children(useCounter(props))

export function Fc(): JSX.Element {

    const [items, setItems] = useState<dataT[] | null>(null);
    React.useEffect(() => {
        async function tt() {
            setItems(await chercheData())
        }

        tt()
    }, [])

    return (
        <div>
            {items !== null ?

                Array.from(items).map((object, i) =>

                    <div key={i} className='rr'>AAAAA</div>
                )
                :
                <div className='rr'>AAZZ</div>

            }
        </div>
    )


}