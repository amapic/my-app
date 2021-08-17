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
import theme from '../style/theme';
import { string } from 'mathjs';


const chercheData = async (url: string): Promise<any> => {

    const response: Response = await fetch(url);
    const responseData = await response.json();

    if (response.ok) {
        var data = [];
        var dictOfResponseData: { [key: string]: number } = {}
        var miniDict = { time: string, key: string }
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

        return data

    } else {
        alert(JSON.stringify(responseData))
        return false
    }

}

const format = (num: number): string =>
    String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, '$1 ')

    ;

export default function Chart(props) {
    //chart est sensé être rerender qd la valeur range de date est remodifié depuis le composant Slider
    var liste_region = liste_nom_region
    const theme = useTheme();
    const [items, setItems] = useState([0]);//l'état initial doit être un array ne contenant pas d'objet

    const labelFormatter = function (x) {
        return x
    }

    const valueFormatter = function (x, y, z) {
        console.log({ ...props, style: { color: 'white' } });
        return [format(x), liste_region[z.dataKey], { ...props, style: { color: 'white' } }]
    }

    const legendFormatter = function (value, entry, index) {
        return [liste_region[entry.dataKey]]
    }


    useEffect(() => {
        subjectvac.subscribe(
            (v) => {

                let re: (string[]|string) = subjectregion.getValue()
                var reString = re.join('_')
                let rr = subjectrange.getValue()


                if (typeof rr === "object") {
                    var date1 = new Date(rr[0] * 1000).toISOString().slice(0, 10).replace('T', ' ');
                    var date2 = new Date(rr[1] * 1000).toISOString().slice(0, 10).replace('T', ' ');
                    let url = "http://localhost:8052/detail3/" + reString + "/" + v + "/" + date1 + "/" + date2
                    chercheData(url).then((tt) =>
                        setItems(tt));
                }


            }
        );
    }, [])

    useEffect(() => {
        subjectregion.subscribe(
            v => {
                let re = subjectvac.getValue()
                var vString:string = v.join('_')
                let rr = subjectrange.getValue()


                if (typeof rr === "object") {
                    var date1 = new Date(rr[0] * 1000).toISOString().slice(0, 10).replace('T', ' ');
                    var date2 = new Date(rr[1] * 1000).toISOString().slice(0, 10).replace('T', ' ');
                    let url = "http://localhost:8052/detail3/" + vString + "/" + re + "/" + date1 + "/" + date2
                    chercheData(url).then((tt) =>
                        setItems(tt));
                }


            }
        );

    }, [])

    useEffect(() => {
        subjectrange.subscribe(
            (v) => {
                let re = subjectvac.getValue()
                let rr = subjectregion.getValue()
                var rrString: string = rr.join('_')
                if (typeof v === 'object') {
                    var date1 = new Date(v[0] * 1000).toISOString().slice(0, 10).replace('T', ' ');
                    var date2 = new Date(v[1] * 1000).toISOString().slice(0, 10).replace('T', ' ');
                    var url = "http://localhost:8052/detail3/" + rrString + "/" + re + "/" + date1 + "/" + date2

                    // if (typeof re === "string" && typeof rr === "string" && rr !== '') {
                    chercheData(url).then((tt) => {
                        setItems(tt)
                    });
                    // }
                }



            });
    }, [])

    return (
        <  >
            < Title >  <  / Title >
                < ResponsiveContainer height={300} width={'100%'}>
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

                        <Tooltip labelFormatter={labelFormatter} contentStyle={{ color: theme.palette.secondary.fonttooltip }} labelStyle={{ color: theme.palette.secondary.fonttooltip }} formatter={valueFormatter} />
                        <CartesianGrid strokeDasharray="3 3" />
                        {

                            Object.keys(items[0]).map((object, i) =>

                                object !== 'time' ? <Line key={i} type="monotone" dataKey={object} stroke={theme.palette.primary.main} dot={false} /> : null

                            )

                        }


                        < XAxis dataKey="time"

                            tick={{ color: theme.palette.text.secondary.main }}
                        />
                        <YAxis
                            tick={{ color: theme.palette.text.secondary.main }}>

                            <Label
                                angle={270}
                                position="left"
                                style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
                            >
                            </Label >
                        </YAxis>

                        dot = {
                            false
                        }

                    </LineChart >
                    <  / ResponsiveContainer >
                    <  /> );
    
}
