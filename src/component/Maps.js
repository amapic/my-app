import { useEffect, useState } from 'react';
import Map_google from './MapGoogle';

const Maps = () => {
    // const [visible, Setvisible] = useState({ visibility: "visible" });
    console.log("ejj");
    useEffect(() => {
        console.log("ee");
        // setTimeout(Setvisible({ visibility: "visible" }), 15000);
    }, [])

    return (<div  id="wrap_map1">

        <Map_google key="a" region_excluded={["1", "2", "3", "4"]} center={{ lat: 46.7833, lng: 3.0833 }} zoom={5.1} />
        <div id="wrap_map2">
            <Map_google key="b" region_included={["1", "2", "3", "4"]} center={{ lat: 16.2, lng: -61.5 }} zoom={7.4} />
            <Map_google key="c" region_included={["1", "2", "3", "4"]} center={{ lat: 14.6, lng: -61 }} zoom={8} />
            <Map_google key="d" region_included={["1", "2", "3", "4"]} center={{ lat: 3.59, lng: -53 }} zoom={5.4} />
            <Map_google key="e" region_included={["1", "2", "3", "4"]} center={{ lat: -21.1, lng: 55.5 }} zoom={7} />

        </div>

    </div>)
}
export default Maps;