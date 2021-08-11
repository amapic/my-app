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

import { subjectregion, subjectrange,subjectregioncolor } from './observable/observable'

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

    const barColors = [theme.palette.secondary.first, theme.palette.secondary.second, theme.palette.secondary.third, theme.palette.secondary.first];
    var g=subjectregioncolor.getValue()
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
                        g.map((entry, index) =>
                            <Cell key={`cell-${index}`} fill={barColors[index]} />
                        )
                    }
                </Bar >
                <Bar dataKey="2eme dose" fill="#82ca9d" >
                    {
                        g.map((entry, index) =>
                            <Cell key={`cell-${index}`} fill={barColors[index]} />
                        )
                    }
                    </Bar >
        </BarChart>
    //     Object.keys(items[0]).map((object, i) =>

    //     object !== 'time' ? <Line key={i} type="monotone" dataKey={object} stroke={theme.palette.primary.main} dot={false} /> : null

                // )

                )

}