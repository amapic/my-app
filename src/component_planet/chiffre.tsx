import React, { useEffect, useState } from 'react';


import { chercheData } from '../fonction/fonction'
import CountUp,{useCountUp} from 'react-countup';
import { motion, useViewportScroll, useAnimation, useTransform } from "framer-motion";

export default function Total_planete() {

    const [items, setItems] = useState<number>();//l'état initial doit être un array ne contenant pas d'objet
    // const { scrollY } = useViewportScroll();
    // const [className, setClassName] = useState<string>("init");
    // const countUpRef = React.useRef(null);
    // const { start, pauseResume, reset, update } = useCountUp({
    //     ref: countUpRef,
    //     start: 0,
    //     end: items,
    //     delay: 1000,
    //     duration: 5,
    //     onReset: () => console.log('Resetted!'),
    //     onUpdate: () => console.log('Updated!'),
    //     onPauseResume: () => console.log('Paused or resumed!'),
    //     onStart: ({ pauseResume }) => console.log(pauseResume),
    //     onEnd: ({ pauseResume }) => console.log(pauseResume),
    //   });
    // useEffect(() => {
    //     scrollY.onChange(v => {
            
            
    //         if (v > 310 ) {
    //             // start
    //         }
    //     });
    // })

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


            <h4><div data-testid="testid1" className='text-center mx-0'>
                <CountUp end={items} duration={5} />
                {/* <div ref={countUpRef} /> */}
            </div></h4>
        </>
    )


}

