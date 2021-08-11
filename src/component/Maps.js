import { useEffect, useState } from 'react';
import Map_google from './MapGoogle';
import list_poly from "../fonction/region_load"
import Image from 'next/image'
import logo from '../img/ezgif.com-gif-maker.gif'

const Maps = () => {
    const [style, setStyle] = useState({ display: "none" });
    useEffect(() => {
        let timer1 = setTimeout(() => { setStyle({ visibility: "visible" }); }, 6000);
        return () => {
            clearTimeout(timer1)
        }
    }, [])

    var list_poly2 = list_poly
    //mettre imeratif
    var style_image = (Object.keys(style)[0] === 'display') ? { visibility: "visible" } : { display: "none" }
    return (
        <div id="RRR3" style={{ height: '400px', maxWidth: '100%', maxHeight: '100%' }}>
            <div id="wrap_map1" style={style}>

                <Map_google key="a" region_excluded={["1", "2", "3", "4"]} center={{ lat: 46.7833, lng: 3.0833 }} zoom={5.1} list_poly2={list_poly2} />
                <div id="wrap_map2">
                    <Map_google key="b" region_included={["1", "2", "3", "4"]} center={{ lat: 16.2, lng: -61.5 }} zoom={7.4} list_poly2={list_poly2} />
                    <Map_google key="c" region_included={["1", "2", "3", "4"]} center={{ lat: 14.6, lng: -61 }} zoom={8} list_poly2={list_poly2} />
                    <Map_google key="d" region_included={["1", "2", "3", "4"]} center={{ lat: 3.59, lng: -53 }} zoom={5.4} list_poly2={list_poly2} />
                    <Map_google key="e" region_included={["1", "2", "3", "4"]} center={{ lat: -21.1, lng: 55.5 }} zoom={7} list_poly2={list_poly2} />

                </div>

            </div>
            <div id="RR"  style={style_image}>
                <Image src={logo} alt="Logo" />
            </div>


        </div>
    )
}
export default Maps;