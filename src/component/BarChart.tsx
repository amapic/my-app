import React, { useEffect, useState } from 'react';
import {
    createTheme,
    Theme,
    ThemeProvider,
    SimplePaletteColorOptions
} from '@material-ui/core/styles';
import {
    PaletteOptions
} from '@material-ui/core/styles/createPalette'

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
import adresse from '../fonction/conf'
import { subjectregion, subjectrange, subjectregioncolor } from './observable/observable'
import Title from './Title';
import { liste_nom_region } from '../fonction/fonction';
import theme from '../../custom.d';

const useStyles = makeStyles((theme) => ({
    container_barchart: {
        display: 'flex',
        width: '100%',
        marginRight: 'auto',
        marginLeft: 'auto'
    }
}
));

interface miniDictT {
    name?: string,
    [propName: string]: any
}

const chercheData = async (url: string, liste_selected: string[]) => {

    const response = await fetch(url, { mode: 'cors' });
    const responseData = await response.json();
    var liste_nom_region2: { [key: string]: string } = liste_nom_region
    var liste_selected_str: number[] = []


    liste_selected.forEach(element => liste_selected_str.push(parseInt(element)));
    if (response.ok) {
        var data: miniDictT[] = [];
        var dictOfResponseData = {}
        var miniDict: miniDictT = []

        for (let i: number = 0; i < liste_selected_str.length; i++) {
            miniDict['name'] = liste_nom_region2[liste_selected[i]]
            miniDict['1ere_dose'] = responseData.n_cum_dose1[i]
            miniDict['2eme_dose'] = responseData.n_cum_dose2[i]
            data.push(miniDict);
            miniDict = {}
        }


        return data

    } else {
        alert(JSON.stringify(responseData))
        let miniDictempty = {} as miniDictT[]
        return miniDictempty
    }

}

const format = (num: number): string =>
    String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, '$1 ')

    ;

declare module '@material-ui/core/styles' {
    interface SimplePaletteColorOptions {
        lighter?: string;
        darker?: string;
    }

    interface PaletteColor {
        lighter?: string;
        darker?: string;
    }



}
interface DefaultPaletteOptions extends PaletteOptions {
    primary?: SimplePaletteColorOptions;
}

const Default = (): DefaultPaletteOptions => {

    return {
        primary: {
            lighter: '#ddd',
            light: '#ddd',
            main: '#ddd',
            dark: '#ddd',
            darker: '#ddd'
        },
    };
};

export default function BarChartWrap(props: any) {
    
    
    let miniDictempty = {} as miniDictT[]
    const [items, setItems] = useState<miniDictT[]>(miniDictempty);//l'état initial doit être un array ne contenant pas d'objet
    var g = []
    const classes = useStyles();
    // theme.palette.primary.
    const barColors = [theme.palette.primary.darker,
    theme.palette.secondary.second,
    theme.palette.secondary.third,
    theme.palette.secondary.first];
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

    if (!items || g === null) {
        return null
    }
    return (
        <>
            <div id='contient_responsive' className={classes.container_barchart}>
                < ResponsiveContainer id="responsive_cont_barcharts" height={190} width="100%" >

                    <BarChart barGap="5" data={items} margin={{ top: 5, right: 0, left: 5, bottom: 30 }}>
                        <XAxis dataKey="name" angle={10} textAnchor="begin" interval={0} dy={2} />
                        <YAxis interval={0} tickFormatter={tickFormatter} domain={[0, 100]} tickMargin={15} />
                        <Bar dataKey="1ere_dose"
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