import React, { useEffect, useState, useContext } from 'react';
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
    ResponsiveContainer
}
    from 'recharts';
import Title from './Title';
// import { DataContext, RegionSelectedContext, VaccinSelectedContext, RangeContext } from '../context/DataContext';

import { RangeService, VaccinService } from './observable/observable'

// Generate Sales Data
function createData(time, amount, amount2) {
    return {
        time,
        amount,
        amount2
    };
}


const chercheData = async (url) => {

    const response = await fetch(url);
    const responseData = await response.json();
    // console.log(response)
    // console.log(responseData)

    if (response.ok) {
        console.log("ok");
        var data = [];
        var dictOfResponseData = {}
        var miniDict = {}
        for (const [key, value] of Object.entries(responseData)) {
            dictOfResponseData[key] = value
        }
        var indexDatetime = Object.keys(dictOfResponseData[1]);
        var keylist = Object.keys(dictOfResponseData);

        console.log(keylist);

        for (let i = 0; i < indexDatetime.length; i++) {
            for (const [key, value] of Object.entries(dictOfResponseData)) {
                miniDict['time'] = indexDatetime[i].slice(-12, -2)
                miniDict[key] = value[indexDatetime[i]]
                // yahoo[key]=i
            }
            data.push(miniDict);
            miniDict = {}
        }

        // console.log(data)

        var ff = data.slice(1, 100);
        // console.log(ff);
        return data

    } else {
        alert(JSON.stringify(responseData))
        return false
    }

}


export default function Chart(props) {
    let instancesCount = 0
    let vaccin = "0"
    const theme = useTheme();
const [items, setItems] = useState('');
    useEffect(() => {
        instancesCount += 1
        console.log({ instancesCount })
        return () => {
            instancesCount -= 1
            console.log({ instancesCount })
        }
    }, [])
    // var items;
    // const regionSelected = useContext(RegionSelectedContext);
    // const vaccin= useContext(VaccinSelectedContext);
    // const aa= useContext(RangeContext);
    console.log("hh");
    // dataService.setData(this.state.productField);
    // RangeService.getData().subscribe(message => {
    //     console.log(message.value);
    //     setItems(message.value);
    // });
    // VaccinService.getData().subscribe(message => {
    //     console.log(message.value);
    // },console.log(message.value + vaccin));
    // useEffect(() => {

    //     if (regionSelected.regionSelectedlist.length!=0){
    //         // console.log(regionSelected.regionSelectedlist)
    //         // let ggg={};
    //         console.log("prout")
    //         // console.log(regionSelected.regionSelectedlist);
    //         chercheData("http://localhost:8052/detail2/" + regionSelected.regionSelectedlist.join('_') + "/" + vaccin.vaccinSelected).then((tt)=>setItems(tt))
    //     }
    //   }, [regionSelected.regionSelectedlast,vaccin.vaccinSelected,aa.monthRange]);

    //   items.map((object,i)=>console.log())

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
                        {Object.keys(items).map((object, i) =>
                            <Line key={i} type="monotone" dataKey={object} stroke="#556CD6" dot={false} />)
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
                                Vaccination
                            </Label >
                            <  / YAxis >

                            dot = {
                                false
                            }
        
                        </LineChart >
                        <  / ResponsiveContainer >
                        <  /> );
    
}
