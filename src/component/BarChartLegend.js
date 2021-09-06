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
// import Title from './Title';
import adresse from '../fonction/conf'
import { subjectregion, subjectrange, subjectregioncolor } from './observable/observable'

import theme from '../../custom';

const format = num =>
    String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, '$1 ')

    ;

export default function BarChartLegend(props) {
    const theme = useTheme();
    // const [items, setItems] = useState(null);//l'état initial doit être un array ne contenant pas d'objet

    const items = [{ name: 'Ile-de-France', "1ere_dose": 75.250048254, "2eme_dose": 54.082483771}]

    function CustomizedLabel(props) {
        const { x, y, fill, value, gg } = props;
        if (gg !== undefined) {
            // console.log(gg[0].name);
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

    function tickFormatter(value) {
        return value.toString() + "%"

    }



    return (
        <>
            <div>
                < ResponsiveContainer id="responsive_cont_barcharts" height={150} width={150} >
                    {/* <Maps /> */}
                    <BarChart width={1000} barGap="5" data={items} margin={{ top: 5, right: 0, left: 5, bottom: 30 }}>
                        <XAxis dataKey="name" hide={true} axisLine={false}  tickLine={false} angle={10} textAnchor="begin" interval={0} dy={2} />
                        <YAxis interval={0} hide={true}  axisLine={false}  tickLine={false} tickFormatter={tickFormatter} domain={[0, 100]} tickMargin={15} padding={{ right: 20 }} />
                        {/* <Tooltip /> */}
                        {/* <Legend /> */}
                        <Bar dataKey="1ere_dose"
                        // label={<CustomizedLabel gg={items} />}
                        // shape={<CustomBarWithTarget/>}
                        >

                            <Cell key="grdhq" stroke={theme.palette.secondary.first} fill={theme.palette.secondary.first} strokeWidth={1} />

                        </Bar >

                        <Bar dataKey="2eme_dose"

                        >

                            <Cell key="grq" stroke={theme.palette.secondary.first} fill={theme.palette.secondary.first} strokeWidth={1} />

                        </Bar >
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </>
    )

}