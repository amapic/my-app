import React, { useEffect, useState } from 'react';
import {
    useTheme
}
    from '@material-ui/core/styles';
import {
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    CartesianGrid,
    Bar,
    BarChart
}
    from 'recharts';
import Title from './Title';

import { subjectregion, subjectrange } from './observable/observable'

import { liste_nom_region } from '../fonction/fonction'
import theme from '../style/theme';


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

        for (let i = 0; i < Object.values(dictOfResponseData.reg).length; i++) {
            miniDict['name'] = Object.values(dictOfResponseData.reg)[i]
            miniDict['1ere dose'] = Object.values(dictOfResponseData.n_cum_dose1)[i]
            miniDict['2eme dose'] = Object.values(dictOfResponseData.n_cum_dose2)[i]
            data.push(miniDict);
            miniDict = {}
        }

        // var keylist = Object.keys(dictOfResponseData);
        // var indexDatetime = Object.keys(dictOfResponseData[keylist[0]]);


        // for (let i = 0; i < indexDatetime.length; i++) {
        //     for (const [key, value] of Object.entries(dictOfResponseData)) {
        //         miniDict['time'] = indexDatetime[i].slice(-12, -2)
        //         miniDict[key] = value[indexDatetime[i]]

        //     }
        //     data.push(miniDict);
        //     miniDict = {}
        // }

        return data

    } else {
        alert(JSON.stringify(responseData))
        return false
    }

}

const format = num =>
    String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, '$1 ')

    ;

export default function BarChartWrap(props) {
    const theme = useTheme();
    const [items, setItems] = useState(null);//l'état initial doit être un array ne contenant pas d'objet

    // const labelFormatter = function (x) {
    //     return x
    // }

    // const valueFormatter = function (x, y, z) {
    //     return [format(x), liste_region[z.dataKey],]
    // }

    // const legendFormatter = function (value, entry, index) {
    //     return [liste_region[entry.dataKey]]
    // }


    // useEffect(() => {
    //     subjectvac.subscribe(
    //         (v) => {

    //             let re = subjectregion.getValue()
    //             re = re.join('_')
    //             let rr = subjectrange.getValue()


    //             if (typeof rr === "object") {
    //                 var date1 = new Date(rr[0] * 1000).toISOString().slice(0, 10).replace('T', ' ');
    //                 var date2 = new Date(rr[1] * 1000).toISOString().slice(0, 10).replace('T', ' ');
    //                 let url = "http://localhost:8052/detail3/" + re + "/" + v + "/" + date1 + "/" + date2
    //                 chercheData(url).then((tt) =>
    //                     setItems(tt));
    //             }


    //         }
    //     );
    // }, [])

    useEffect(() => {
        subjectregion.subscribe(
            v => {
                v = v.join('_')

                let url = "http://localhost:8052/req_bar_chart"
                chercheData(url).then((tt) =>
                    setItems(tt));


            }
        );

    }, [])

    useEffect(() => {
        subjectrange.subscribe(
            v => {
                v = subjectregion.getValue().join('_')

                let url = "http://localhost:8052/req_bar_chart"
                chercheData(url).then((tt) =>
                    setItems(tt));


            }
        );

    }, [])


    var data = [
        {
            "name": "Page A",
            "uv": 4000,
            "pv": 2400
        },
        {
            "name": "Page B",
            "uv": 3000,
            "pv": 1398
        },
        {
            "name": "Page C",
            "uv": 2000,
            "pv": 9800
        },
        {
            "name": "Page D",
            "uv": 2780,
            "pv": 3908
        },
        {
            "name": "Page E",
            "uv": 1890,
            "pv": 4800
        },
        {
            "name": "Page F",
            "uv": 2390,
            "pv": 3800
        },
        {
            "name": "Page G",
            "uv": 3490,
            "pv": 4300
        }
    ]
    if (!items) {
        return null
    }
    return (

        <BarChart width={1000} height={400} data={items}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis scale="log" domain={['auto', 'auto']} />
            <Tooltip />
            <Legend />
            <Bar dataKey="1ere dose" fill="#8884d8" >
                {
                    this.state.chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={barColors[index % 20]} />
                    ))
                }
                </Bar >
                <Bar dataKey="2eme dose" fill="#82ca9d" >
                    {
                        subjectregion.getValue().map((entry, index) =>
                            <Cell key={`cell-${index}`} fill={barColors[index % 20]} />
                        )
                    }
                    </Bar >
        </BarChart>
    //     Object.keys(items[0]).map((object, i) =>

    //     object !== 'time' ? <Line key={i} type="monotone" dataKey={object} stroke={theme.palette.primary.main} dot={false} /> : null

                // )

                )

}