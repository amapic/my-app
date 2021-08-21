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
    Cell,
    ResponsiveContainer,
    Label,
    Text
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
    var liste_selected_str = []
    liste_selected.forEach(element => liste_selected_str.push(parseInt(element)));
    if (response.ok) {
        var data = [];
        var dictOfResponseData = {}
        var miniDict = {}
        for (const [key, value] of Object.entries(responseData)) {
            dictOfResponseData[key] = value
        }

        for (let i = 0; i < Object.values(dictOfResponseData.reg).length; i++) {
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



const format = num =>
    String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, '$1 ')

    ;

export default function BarChartWrap(props) {
    const theme = useTheme();
    const [items, setItems] = useState(null);//l'état initial doit être un array ne contenant pas d'objet
    var g = []
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

    function CustomizedLabel(props) {
        const { x, y, fill, value, gg } = props;
        if (gg !== undefined) {
            console.log(gg[0].name);
        }
        return (<Text
            x={x}
            y={y}
            dy={0}
            fontSize='16'
            fontFamily='sans-serif'
            fill="#fff"
            angle="90"
            textAnchor="middle">{

                gg !== undefined ? gg[0].name : value + '%'
            }</Text>)
    }

    function tickFormatter(value){
        return value.toString() + "%"

    }


    if (!items || g === null) {
        return null
    }
    console.log(g);
    return (
        <>
            < ResponsiveContainer id="responsive_cont_barcharts" height={360} width={'50%'}>
                <BarChart width={1000}  data={items} margin={{ top: 5, right: 0, left: 5, bottom: 30  }}>
                    {/* <CartesianGrid strokeDasharray="3 3" /> */}
                    <XAxis dataKey="name" angle={20} textAnchor="begin" interval={0}  />
                    <YAxis tickFormatter={tickFormatter} domain={[0, 100]} tickMargin={15} padding={{ right: 20 }} />
                    {/* <Tooltip /> */}
                    {/* <Legend /> */}
                    <Bar dataKey="1ere dose"
                    // label={<CustomizedLabel gg={items} />}
                    >
                        {
                            // for (const [key, value] of Object.entries(g)) {
                            //     <Cell key={`cell-${key}`} fill={value} />
                            // }
                            g.map((entry, index) =>
                                <Cell key={`cell-${index}`} fill={entry} />
                            )
                        }
                    </Bar >

                    <Bar dataKey="2eme dose"
                    // label={<CustomizedLabel />}
                    >
                        {
                            g.map((entry, index) =>
                                <Cell key={`cell-${index}`} fill={entry} />

                            )
                        }
                    </Bar >
                </BarChart>
            </ResponsiveContainer>
        </>
    )

}