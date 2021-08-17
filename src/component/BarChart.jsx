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
    BarChart,
    Cell
}
    from 'recharts';
import Title from './Title';

import { subjectregion, subjectrange, subjectregioncolor } from './observable/observable'

import { liste_nom_region } from '../fonction/fonction'
import theme from '../style/theme';


const chercheData = async (url, liste_selected) => {

    const response = await fetch(url);
    const responseData = await response.json();
    var liste_nom_region2 = liste_nom_region
    var liste_selected_str=[]
    liste_selected.forEach(element => liste_selected_str.push(parseInt(element)));
    if (response.ok) {
        var data = [];
        var dictOfResponseData = {}
        var miniDict = {}
        for (const [key, value] of Object.entries(responseData)) {
            dictOfResponseData[key] = value
        }

        for (let i = 0; i < Object.values(dictOfResponseData.reg).length; i++) {
            // liste_nom_region[Object.values(dictOfResponseData.reg)[i]]
            // console.log(Object.values(dictOfResponseData.reg)[i]);
            miniDict['name'] = liste_nom_region2[Object.values(dictOfResponseData.reg)[i]]
            miniDict['1ere dose'] = Object.values(dictOfResponseData.n_cum_dose1)[i]
            miniDict['2eme dose'] = Object.values(dictOfResponseData.n_cum_dose2)[i]
            if (liste_selected_str.includes(Object.values(dictOfResponseData.reg)[i])) {
                data.push(miniDict);
            }
            miniDict = {}
        }


        return data

    } else {
        alert(JSON.stringify(responseData))
        return false
    }

}

const format = (num) =>
    String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, '$1 ')

    ;

export default function BarChartWrap(props) {
    const theme = useTheme();
    const [items, setItems] = useState(null);//l'état initial doit être un array ne contenant pas d'objet
    var g;
    const barColors = [theme.palette.secondary.first, theme.palette.secondary.second, theme.palette.secondary.third, theme.palette.secondary.first];
    g = subjectregioncolor.getValue()
    useEffect(() => {
        subjectregion.subscribe(
            v => {

                let url = "http://localhost:8052/req_bar_chart"
                chercheData(url, v).then((tt) =>

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
    if (!items || g === null) {
        return null
    }
    return (

        <BarChart width="100%" height={300} data={items}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" angle={45} textAnchor="begin" />
            <YAxis scale="log" domain={['auto', 'auto']} tickMargin={15} padding={{ right: 20 }} />
            <Bar dataKey="1ere dose"  >
                {/* {
                    g.map((entry, index) =>
                        <Cell key={`cell-${index}`} fill={entry} />
                    )
                } */}
            </Bar >

            <Bar dataKey="2eme dose"  >
                {/* {
                    g.map((entry, index) =>
                        <Cell key={`cell-${index}`} fill={entry} />
                    )
                } */}
            </Bar >
        </BarChart>

    )

}