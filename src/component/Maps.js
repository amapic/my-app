import { useEffect, useState } from 'react';
import Map_google from './MapGoogle';
import list_poly from "../fonction/region_load"

const Maps = () => {
    const [style, setStyle] = useState({ visibility: "hidden" });
    useEffect(() => {
        let timer1=setTimeout(()=>{setStyle({ visibility: "visible" });}
        
        , 3000);
        return () => {
            clearTimeout(timer1)
          }
    }, [])
    var list_poly2=list_poly
    return (
        <div style={style}>
    <div  id="wrap_map1">

        <Map_google key="a" region_excluded={["1", "2", "3", "4"]} center={{ lat: 46.7833, lng: 3.0833 }} zoom={5.1} list_poly2={list_poly2}/>
        <div id="wrap_map2">
            <Map_google key="b" region_included={["1", "2", "3", "4"]} center={{ lat: 16.2, lng: -61.5 }} zoom={7.4} list_poly2={list_poly2} />
            <Map_google key="c" region_included={["1", "2", "3", "4"]} center={{ lat: 14.6, lng: -61 }} zoom={8} list_poly2={list_poly2}/>
            <Map_google key="d" region_included={["1", "2", "3", "4"]} center={{ lat: 3.59, lng: -53 }} zoom={5.4} list_poly2={list_poly2}/>
            <Map_google key="e" region_included={["1", "2", "3", "4"]} center={{ lat: -21.1, lng: 55.5 }} zoom={7} list_poly2={list_poly2}/>

        </div>

    </div></div>)
}
export default Maps;