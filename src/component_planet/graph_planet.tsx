import React, { useEffect, useState } from 'react';
import {
    LineChart,
    ScatterChart,
    Line,
    XAxis,
    YAxis,
    ZAxis,
    Label,
    Tooltip,
    Legend,
    Scatter,
    CartesianGrid,
    ResponsiveContainer,
    Cell,
    BarChart,
    Bar,
    Dot
} from 'recharts'
// import fetch from 'node-fetch'
const fetch = require('node-fetch')
// const dfd = require("danfojs-node")

export const AA: String = 'RR'

export const chercheData = async () => {

    const response = await fetch("http://127.0.0.1:8080/api/planets");
    const responseData = await response.json();
    // console.log(responseData);
    if (response.ok) {
        var data = [];
        var dictOfResponseData: { [key: string]: any } = {}
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
const ColoredCircle = () => {

    const styles = { backgroundColor: 'red', color: 'blue', bordercolor: 'black' };
    // const styles = {};

    // return color ? (
    //     <>
    //         <span className="colored-circle" style={styles} />
    //     </>
    // ) : null;

    // className="colored-circle"

    return <span className="ahah" style={styles} />
};

const CustomizedShape = (props) => {
    const { cx, cy, fill, riderName } = props;
    return (
        <g>
            <Dot cx={cx} cy={cy} r={1} fill={fill} />
            <g transform={`translate(${cx},${cy})`}>
                <text x={10} y={0} dy={4} textAnchor="left">{riderName}</text>
            </g>
        </g>
    );
};
// interface createDataT {
//     name: string,
//     value: number
//   }
// export default function Planet() {

//     const [items, setItems] = useState<any[]>([]);;//l'état initial doit être un array ne contenant pas d'objet

//     const labelFormatter = function (x: string) {
//         return x;
//     }

//     function data() {
//         const response = chercheData()
//     }

//     useEffect(() => {
//         chercheData().then((tt) => {


//             let gg = Object.values(tt).slice(0, 1000)
//             console.log(gg);
//             setItems(gg)
//         });
//     }, [])


//     return (
//         <ScatterChart width={730} height={250}
//             margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
//             {/* <CartesianGrid strokeDasharray="3 3" /> */}
//             <XAxis label="masse" dataKey="mass" name="masse" type="number" ticks={[0.01, 0.1, 10, 150]} scale="log" domain={[0.01, 100]} unit=" Mjup" />
//             <YAxis label="période orbitale" dataKey="orbital_period" name="periode orbitale" type="number" scale="log" domain={[0.01, 1000000]} unit=" jour" />
//             {/* <ZAxis dataKey="z" range={[64, 144]} name="score" unit="km" /> */}
//             <Tooltip cursor={{ strokeDasharray: '3 3' }} />
//             <Legend />
//             <Scatter name="A school" data={items} shape={<ColoredCircle color="red" />} />

//         </ScatterChart>
//     )


// }

export function Graph_masse_distance() {

    const [items, setItems] = useState([0]);//l'état initial doit être un array ne contenant pas d'objet


    useEffect(() => {
        chercheData().then((tt) => {

            var gg = Object.values(tt)
            // console.log(gg);
            // gg.reverse.forEach((index,iitem)=>{
            // if(iitem.mass===null){
            //     gg
            // }})

            for (var i = gg.length - 1; i >= 0; i--) {
                if (gg[i].mass === null || gg[i].orbital_period === null) {
                    gg.splice(i, 1);
                }
            }

            setItems(gg)
        });
    }, [])


    return (
        <>
            <span className="mx-auto w-50">Masse en Masse jupitérienne et période de révolution en jour</span>
            <ScatterChart width={730} height={250} id="masse_distance"
                margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
                {/* <CartesianGrid strokeDasharray="3 3" /> */}
                <XAxis dataKey="mass" name="masse" type="number" ticks={[0.01, 0.1, 1, 10, 150]} scale="log" domain={[0.01, 100]} unit=" Mjup" />
                <YAxis dataKey="orbital_period" name="periode orbitale" type="number" scale="log" domain={[0.01, 1000000]} unit=" jour" />
                {/* <ZAxis dataKey="z" range={[64, 144]} name="score" unit="km" /> */}
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Legend />
                <Scatter name="A school" data={items} shape={<CustomizedShape />} />

            </ScatterChart>
        </>
    )


}

export function Graph_annee() {

    const [items, setItems] = useState<any[]>([0]);//l'état initial doit être un array ne contenant pas d'objet


    useEffect(() => {
        chercheData().then((tt) => {

            const gg = Object.values(tt)

            const sumOfAges = gg.reduce((decount, currentValue) => {
                if (currentValue.discovered !== null) {
                    if (!Object.keys(decount).includes(currentValue.discovered.toString())) {
                        decount[currentValue.discovered] = 1;
                    } else {
                        decount[currentValue.discovered] = decount[currentValue.discovered] + 1;
                    }
                }
                return decount;
            }, {});
            let hh = []
            for (const property in sumOfAges) {
                hh.push({ 'year': property, 'value': sumOfAges[property] })
            }
            console.log("sgsg");
            setItems(hh)
        });
    }, [])


    return (


        <BarChart width={730} height={250} data={items}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            {/* <Tooltip /> */}
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
        </BarChart>

    )


}

export function Taille_planete() {

    const [items, setItems] = useState([0]);//l'état initial doit être un array ne contenant pas d'objet


    useEffect(() => {
        chercheData().then((tt) => {

            let gg = Object.values(tt)
            // console.log(gg);
            setItems(gg)
        });
    }, [])


    return (


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

    )


}

export function Graph_zone_habitable() {

    const [items, setItems] = useState([0]);//l'état initial doit être un array ne contenant pas d'objet


    useEffect(() => {
        chercheData().then((tt) => {

            let gg = Object.values(tt)
            // console.log(gg);
            setItems(gg)
        });
    }, [])


    return (


        <ScatterChart width={730} height={250}
            margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
            <YAxis allowDataOverflow={true} label="température de l'étoile" dataKey="temp" name="masse" type="number" ticks={[0, 3000, 4000, 5000, 6000, 7000]} domain={[0, 8000]} unit="K" />
            <XAxis allowDataOverflow={true} label="distance à l'étoile" dataKey="semi_major_axis" name="periode orbitale" type="number" domain={[200, 700]} unit=" jour" />
            {/* <ZAxis dataKey="z" range={[64, 144]} name="score" unit="km" /> */}
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Legend />
            <Scatter name="A school" data={items} shape="cross" />

        </ScatterChart>

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
            console.log("sgsg");
            setItems(hh)
        });
    }, [])


    return (


        <BarChart width={730} height={250} data={items}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis ticks={[0, 1, 2, 2.5]} />
            {/* <Tooltip /> */}
            <Legend />
            <Bar name="moyenne des rayons en Rjupiter des planètes découvertes" dataKey="value" fill="#8884d8" />
        </BarChart>

    )


}

export function Graph_semi_major_moyen() {

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
            console.log("sgsg");
            setItems(hh)
        });
    }, [])


    return (


        <BarChart width={730} height={250} data={items}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis ticks={[0, 1, 2, 3, 4]} />
            {/* <Tooltip /> */}
            <Legend />
            <Bar name="(imaging excleu)moyenne des distances à l'étoile en UA des planètes découvertes" dataKey="value" fill="#8884d8" />
        </BarChart>

    )


}

export function Graph_annee_distance_etoile_depuis_terre() {

    const [items, setItems] = useState<any[]>([0]);//l'état initial doit être un array ne contenant pas d'objet


    useEffect(() => {
        chercheData().then((tt) => {

            const gg = Object.values(tt)
            var counter = 0
            const sumOfAges = gg.reduce((decount, currentValue) => {
                if (currentValue.star_distance !== null && currentValue.discovered !== null) {
                    counter += 1
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
            console.log("sgsg");
            setItems(hh)
        });
    }, [])


    return (


        <BarChart width={730} height={250} data={items}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis name="star distance" />
            {/* <Tooltip /> */}
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
        </BarChart>

    )


}
