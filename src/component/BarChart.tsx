import React, { useEffect, useState } from 'react';
// import {
//     useTheme
// }
// from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
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
import Title from './Title';
import { liste_nom_region } from '../fonction/fonction';
import theme from '../../custom.d';

const useStyles = makeStyles((theme) => ({
    container_barchart: {
      display: 'flex',
      width:'100%',
      marginRight:'auto',
      marginLeft:'auto'
    }
}
));

const chercheData = async (url: string, liste_selected: [string]) => {

    const response = await fetch(url, { mode: 'cors' });
    const responseData = await response.json();
    var liste_nom_region2: string[] = liste_nom_region
    var liste_selected_str: number[] = []
    // 1ere_dose:number,
    //     2eme_dose:number
    interface miniDictT {
        name?: string,
        [propName: string]: any
    }

    liste_selected.forEach(element => liste_selected_str.push(parseInt(element)));
    if (response.ok) {
        var data: miniDictT[] = [];
        var dictOfResponseData = {}
        var miniDict: miniDictT = []

        for (let i: number = 0; i < liste_selected_str.length; i++) {
            miniDict['name'] = liste_nom_region2[liste_selected[i]]
            miniDict['1ere_dose'] = responseData.n_cum_dose1[i]
            miniDict['2eme_dose'] = responseData.n_cum_dose2[i]
            // if (liste_selected_str.includes(Object.values(dictOfResponseData.reg)[i])) {
            data.push(miniDict);
            // }
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

export default function BarChartWrap(props: any) {
    // const theme = useTheme();
    const [items, setItems] = useState(null);//l'état initial doit être un array ne contenant pas d'objet
    var g = []
    const classes = useStyles();
    const barColors = [theme.palette.secondary.first, theme.palette.secondary.second, theme.palette.secondary.third, theme.palette.secondary.first];
    g = subjectregioncolor.getValue()
    useEffect(() => {
        subjectregion.subscribe(
            v => {

                let url = adresse + ":8052/req_bar_chart"

                chercheData(url, v).then((tt) =>

                    setItems(tt));


            }
        );

    }, [])



    function tickFormatter(value: number): string {
        return value.toString() + "%"

    }

    const labelLegendFormatter = function (x: any): any {
        return null
    }

    const valueLegendFormatter = function (x: number, y: number, z: any) {
        return [x.toFixed(2) + " %", y,]
    }



    const CustomBarWithTarget = (props: any) => {
        const { fill, x, y, width, height, amt, t } = props;

        let totalHeight = y + height;
        let targetY = totalHeight - ((height / amt) * t)

        return <svg>
            <rect x={x} y={y} width={width} height={height} stroke="none" fill={fill} />
            <line x1={x - 8} x2={x + (width + 8)} y1={targetY} y2={targetY} stroke={"#2967c1"} strokeWidth={2} strokeDasharray={"10 5"} />
        </svg>;
    };

    if (!items || g === null) {
        return null
    }
    return (
        <>
            <div id='contient_responsive' className={classes.container_barchart}>
                < ResponsiveContainer id="responsive_cont_barcharts" height={190} width="100%" >
                    {/* <Title>Pourcentage de personne vaccinée par région (dose 1 et 2)</Title> */}
                    {/* <Maps /> */}
                    {/* <Title>Doses administrées </Title> */}
                    {/* <p>Pourcentage de personne vaccinée par région (dose 1 et 2) </p> */}
                    <BarChart barGap="5" data={items} margin={{ top: 5, right: 0, left: 5, bottom: 30 }}>
                        {/* <CartesianGrid strokeDasharray="3 3" /> */}
                        <XAxis dataKey="name" angle={10} textAnchor="begin" interval={0} dy={2} />
                        <YAxis interval={0} tickFormatter={tickFormatter} domain={[0, 100]} tickMargin={15} />
                        {/* <Tooltip labelStyle={{ color: '#000', display: 'none' }} contentStyle={{ color: '#000' }} itemStyle={{ color: '#000' }} labelFormatter={labelLegendFormatter} formatter={valueLegendFormatter} /> */}
                        {/* <Legend /> */}
                        <Bar dataKey="1ere_dose"
                        // label={<CustomizedLabel gg={items} />}
                        // shape={<CustomBarWithTarget/>}
                        >
                            {
                                g.map((entry, index) =>
                                    <Cell key={`cell-${index}`} stroke={entry} fill={'rgb(33,37,39)'} strokeWidth={3} />
                                )
                            }
                        </Bar >

                        <Bar dataKey="2eme_dose"

                        >
                            {
                                g.map((entry, index) =>
                                    <Cell key={`cell-${index}`} stroke={entry} fill={'rgb(33,37,39)'} strokeWidth={3} />

                                )
                            }
                        </Bar >
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </>
    )

}