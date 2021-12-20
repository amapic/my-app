import React, { useEffect, useState } from 'react';
import { countBy } from 'underscore'
import {
    ScatterChart,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    Scatter,
    CartesianGrid,
    ResponsiveContainer,
    BarChart,
    Bar,
    Dot,
    ReferenceDot,
    ReferenceLine,
    RadialBarChart,
    RadialBar

} from 'recharts'
import { chercheData } from '../fonction/fonction'
import { dataT, radialT } from '../types/interface'

export function Taille_planete() {
    const dataTempty = {} as dataT[]
    const [items, setItems] = useState(dataTempty);//l'état initial doit être un array ne contenant pas d'objet


    useEffect(() => {
        chercheData().then((tt) => {

            let gg = Object.values(tt)
            // console.log(gg);
            setItems(gg)
        });
    }, [])


    return (

        <ResponsiveContainer aspect={1.5}>
            <ScatterChart width={730} height={250}
                margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
                {/* <CartesianGrid strokeDasharray="3 3" /> */}
                <XAxis allowDataOverflow={true} label="distance à l'étoile" dataKey="semi_major_axis" name="distance" type="number" ticks={[0, 0.5, 1]} domain={[0, 1.1]} unit=" UA" />
                <YAxis allowDataOverflow={false} label="rayon" dataKey="radius" name="rayon" type="number" ticks={[0, 1, 2]} domain={[0, 2]} unit=" RJup" />
                {/* <ZAxis dataKey="z" range={[64, 144]} name="score" unit="km" /> */}
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Legend />
                <Scatter name="A school" data={items} shape="cross" />

            </ScatterChart>
        </ResponsiveContainer>

    )


}
export function Graph_zone_habitable() {
    const dataTempty = {} as dataT[]
    const [items, setItems] = useState(dataTempty);//l'état initial doit être un array ne contenant pas d'objet


    useEffect(() => {
        chercheData().then((tt) => {

            let gg = Object.values(tt)
            // console.log(gg);
            setItems(gg)
        });
    }, [])


    return (

        <ResponsiveContainer aspect={1.5}>
            <ScatterChart
                margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
                {/* <CartesianGrid strokeDasharray="3 3" /> */}
                <YAxis allowDataOverflow={true} label="température de l'étoile" dataKey="temp" name="masse" type="number" ticks={[0, 3000, 4000, 5000, 6000, 7000]} domain={[0, 8000]} unit="K" />
                <XAxis allowDataOverflow={true} label="distance à l'étoile" dataKey="semi_major_axis" name="periode orbitale" type="number" domain={[200, 700]} unit=" jour" />
                {/* <ZAxis dataKey="z" range={[64, 144]} name="score" unit="km" /> */}
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Legend />
                <Scatter name="A school" data={items} shape="cross" />

            </ScatterChart>
        </ResponsiveContainer>

    )


}

export function Graph_rayon_moyen() {

    const [items, setItems] = useState<any[]>([0]);//l'état initial doit être un array ne contenant pas d'objet


    useEffect(() => {
        chercheData().then((tt) => {

            const gg = Object.values(tt)
            const data = gg.reduce((decount, currentValue, index) => {
                if (currentValue.radius !== null && currentValue.discovered !== null) {
                    if (Object.keys(decount).length === 0) {
                        decount["decountVal"] = {};
                        decount["decountNb"] = {};
                    }
                    if (!Object.keys(decount["decountVal"]).includes(currentValue.discovered.toString())) {
                        decount["decountVal"][currentValue.discovered] = currentValue.radius;
                        decount["decountNb"][currentValue.discovered] = 1
                    } else {
                        decount["decountNb"][currentValue.discovered] = decount["decountNb"][currentValue.discovered] + 1;
                        decount["decountVal"][currentValue.discovered] = decount["decountVal"][currentValue.discovered] + currentValue.radius
                    }
                }
                return decount;
            }, {});
            let hh = []
            for (const property in data["decountVal"]) {
                hh.push({ 'year': property, 'value': data["decountVal"][property] / data["decountNb"][property] })
            }
            setItems(hh)
        });
    }, [])


    return (

        <ResponsiveContainer aspect={1.5}>
            <BarChart data={items}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis ticks={[0, 1, 2, 2.5]} />
                {/* <Tooltip /> */}
                <Legend />
                <Bar name="moyenne des rayons en Rjupiter des planètes découvertes" dataKey="value" fill="#8884d8" />
            </BarChart>
        </ResponsiveContainer>

    )


}

export function Moyenne_semi_major_moyen() {

    const [items, setItems] = useState<any[]>([0]);//l'état initial doit être un array ne contenant pas d'objet


    useEffect(() => {
        chercheData().then((tt) => {

            const gg = Object.values(tt)
            const data = gg.reduce((decount, currentValue, index) => {
                if (currentValue.semi_major_axis !== null && currentValue.discovered !== null) {
                    //!!
                    if (currentValue.method !== 'Imaging') {
                        if (Object.keys(decount).length === 0) {
                            decount["decountVal"] = {};
                            decount["decountNb"] = {};
                        }
                        if (!Object.keys(decount["decountVal"]).includes(currentValue.discovered.toString())) {
                            decount["decountVal"][currentValue.discovered] = currentValue.semi_major_axis;
                            decount["decountNb"][currentValue.discovered] = 1
                        } else {
                            decount["decountNb"][currentValue.discovered] = decount["decountNb"][currentValue.discovered] + 1;
                            decount["decountVal"][currentValue.discovered] = decount["decountVal"][currentValue.discovered] + currentValue.semi_major_axis
                        }
                    }
                }
                return decount;
            }, {});
            let hh = []
            for (const property in data["decountVal"]) {
                hh.push({ 'year': property, 'value': data["decountVal"][property] / data["decountNb"][property] })
            }
            setItems(hh)
        });
    }, [])


    return (

        <ResponsiveContainer aspect={2.5}>
            <BarChart data={items}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis ticks={[0, 1, 2, 3, 4]} />
                <Tooltip />
                {/* <Legend /> */}
                <Bar name="(imaging excleu)moyenne des distances à l'étoile en UA des planètes découvertes" dataKey="value" fill="#8884d8" />
            </BarChart>
        </ResponsiveContainer>

    )


}

export function Graph_annee_distance_etoile_depuis_terre() {

    const [items, setItems] = useState<any[]>([0]);//l'état initial doit être un array ne contenant pas d'objet


    useEffect(() => {
        chercheData().then((tt) => {

            const gg = Object.values(tt)
            const sumOfAges = gg.reduce((decount, currentValue) => {
                if (currentValue.star_distance !== null && currentValue.discovered !== null) {

                    if (!Object.keys(decount).includes(currentValue.discovered)) {
                        decount[currentValue.discovered] = currentValue.star_distance;
                    } else {
                        // decount[currentValue.discovered] = decount[currentValue.discovered] + currentValue.semi_major_axis;
                        decount[currentValue.discovered] = decount[currentValue.discovered] > currentValue.star_distance ? decount[currentValue.discovered] : currentValue.star_distance
                    }
                }
                return decount;
            }, {});
            let hh = []
            for (const property in sumOfAges) {
                hh.push({ 'year': property, 'value': sumOfAges[property] })
            }
            setItems(hh)
        });
    }, [])


    return (


        <BarChart data={items}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis name="star distance" />
            {/* <Tooltip /> */}
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
        </BarChart>

    )


}