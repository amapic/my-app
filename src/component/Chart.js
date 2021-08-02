import React, { useEffect, useState } from 'react';
// import from 'react-dom';
import {
    useTheme
}
    from '@material-ui/core/styles';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Label,
    Tooltip,
    Legend,
    CartesianGrid,
    ResponsiveContainer
}
    from 'recharts';
import Title from './Title';

import { subjectvac, subjectrange, subjectregion } from './observable/observable'

import { liste_nom_region } from '../fonction/fonction'



const chercheData = async (url) => {

    const response = await fetch(url);
    const responseData = await response.json();

    if (response.ok) {
        var data = [];
        var dictOfResponseData = {}
        var miniDict = {}
        for (const [key, value] of Object.entries(responseData)) {
            dictOfResponseData[key] = value
        }

        var keylist = Object.keys(dictOfResponseData);
        var indexDatetime = Object.keys(dictOfResponseData[keylist[0]]);


        for (let i = 0; i < indexDatetime.length; i++) {
            for (const [key, value] of Object.entries(dictOfResponseData)) {
                miniDict['time'] = indexDatetime[i].slice(-12, -2)
                miniDict[key] = value[indexDatetime[i]]

            }
            data.push(miniDict);
            miniDict = {}
        }

        // conversionkey(data)
        return data

    } else {
        alert(JSON.stringify(responseData))
        return false
    }

}

const format = num =>
    String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, '$1 ')

    ;

export default function Chart(props) {
    let instancesCount = 0
    var liste_region = liste_nom_region
    const theme = useTheme();
    const valeurReginitial = "11"
    const [items, setItems] = useState([0]);//l'état initial doit être un array ne contenant pas d'objet

    const labelFormatter = function (x) {
        return x
    }

    const valueFormatter = function (x, y, z) {
        return [format(x), liste_region[z.dataKey],]
    }

    const legendFormatter = function (value, entry, index) {
        return [liste_region[entry.dataKey]]
    }


    useEffect(() => {
        subjectvac.subscribe({
            next: (v) => {

                let re = subjectregion.getValue()
                re = re.join('_')
                let rr = subjectrange.getValue()
                let url = "http://localhost:8052/detail3/" + re + "/" + v + "/" + rr

                if (re !== '' && typeof re === "string" && typeof rr === "string" && typeof v === "string") {
                    chercheData(url).then((tt) =>
                        setItems(tt));
                }


            }
        });
    }, [])

    useEffect(() => {
        subjectregion.subscribe(
                v=>{
                            let re = subjectvac.getValue()
                            v = v.join('_')
                            let rr = subjectrange.getValue()
                            let url = "http://localhost:8052/detail3/" + v + "/" + re + "/" + rr
            
                            if (v !== '' && typeof re === "string" && typeof rr === "string" && typeof v === "string") {
                                chercheData(url).then((tt) =>
                                    setItems(tt));
                            }
    })
        // subjectregion.subscribe({
        //     next: (v) => {
        //         let re = subjectvac.getValue()
        //         v = v.join('_')
        //         let rr = subjectrange.getValue()
        //         let url = "http://localhost:8052/detail3/" + v + "/" + re + "/" + rr

        //         // console.log(url);
        //         if (v !== '' && typeof re === "string" && typeof rr === "string" && typeof v === "string") {
        //             chercheData(url).then((tt) =>
        //                 setItems(tt));
        //         }


        //     }
        // });

    }, [])

    useEffect(() => {
        subjectrange.subscribe({
            next: (v) => {
                let re = subjectvac.getValue()
                let rr = subjectregion.getValue()
                rr = rr.join('_')
                if (typeof v==='object') {
                    var date1 =new Date(v[0] * 1000).toISOString().slice(0, 10).replace('T', ' ');
                    var date2 =new Date(v[1] * 1000).toISOString().slice(0, 10).replace('T', ' ');
                    var url = "http://localhost:8052/detail3/" + rr + "/" + re + "/" + date1 + "/" + date2

                    if (typeof re === "string" && typeof rr === "string" && rr !== '') {
                        chercheData(url).then((tt) => {
                            setItems(tt)
                        });
                    }
                }


            }
        });
    }, [])

    return (
        <  >
            < Title >  <  / Title >
                < ResponsiveContainer >
                    < LineChart
                        data={
                            items
                        }
                        margin={{
                            top: 16,
                            right: 16,
                            bottom: 0,
                            left: 24,
                        }
                        }
                    >

                        <Legend formatter={legendFormatter} />

                        <Tooltip labelFormatter={labelFormatter} formatter={valueFormatter} />
                        <CartesianGrid strokeDasharray="3 3" />
                        {

                            Object.keys(items[0]).map((object, i) =>

                                object !== 'time' ? <Line key={i} type="monotone" dataKey={object} stroke="#556CD6" dot={false} /> : null

                            )

                        }

                        {/* <Line type="monotone" dataKey="2" stroke="#556CD6" dot={false} />  */}
                        {/* } */}
                        {/* <Line type="monotone" dataKey="amount2" stroke="#556CD6" dot={false} /> */}
                        {/* < Line type = "monotone" dataKey = "1" stroke = {
            theme.palette.primary.main
        }/> */}

                        < XAxis dataKey="time" stroke={
                            theme.palette.text.secondary
                        }
                        />
                        <YAxis stroke={theme.palette.text.secondary}>

                            <Label
                                angle={270}
                                position="left"
                                style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
                            >
                                {/* Vaccination */}
                            </Label >
                            <  / YAxis >

                            dot = {
                                false
                            }
        
                        </LineChart >
                        <  / ResponsiveContainer >
                        <  /> );
    
}
