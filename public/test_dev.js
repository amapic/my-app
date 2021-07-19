import React,{useEffect} from 'react';
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

// Generate Sales Data
function createData(time, amount) {
    return {
        time,
        amount
    };
}

var doGetTEXT=async function () {

    // Call fetch(url) with default options.
    // It returns a Promise object (Resolve response object)
    var myInit = {
        mode: 'cors'
    }
	var data = [];
    var arrayTime = [];
    var arrayAmount = [];
    var aPromise = fetch("http://localhost:8052/detail/2/2", myInit);
    // var aPromise = fetch("https://proutos.azurewebsites.net/a");
    // Work with Promise object:
    aPromise
    .then(response => {
        console.log("OK! Server returns a response object:");
        // console.log(response.json());
        return response.json();
    })
    .then(jjour => {
        // console.log(jjour.datetime);
		for (var key in jjour.datetime){
			var value = jjour.datetime[key];
			arrayTime.push(value);
		}
		for (var key in jjour.n_cum_dose1){
			var value = jjour.n_cum_dose1[key];
			arrayAmount.push(value);
		}

    }).finally(() => {
        
		// console.log(arrayAmount);
		
        arrayAmount.forEach((x, i) => data.push(createData(arrayTime[i].toString(), i)));
        // console.log("rr");
		// console.log(data);
		// console.log("tt");
		
    })
    .catch(function (error) {
        console.log("Noooooo! Something error:");
        // Network Error!
        console.log(error);
    });

    return data
}
// const data = [
// createData('00:00', 0),
// createData('03:00', 300),
// createData('06:00', 600),
// createData('09:00', 800),
// createData('12:00', 1500),
// createData('15:00', 2000),
// createData('18:00', 2400),
// createData('21:00', 2400),
// createData('27:00', undefined),
// ];


const getdata=function(){
	var xx = doGetTEXT();
	return xx
}


export default function Chart() {
    const theme = useTheme();
    const data=getdata();
	console.log(data);
	useEffect(() => {
    // You need to restrict it at some point
    const data=getdata();
	console.log(data);
  }, []);
    return (
         <  >
         < Title > Today <  / Title >
         < ResponsiveContainer >
         < LineChart
        data = {
            data
        }
        margin = { {
                top: 16,
                right: 16,
                bottom: 0,
                left: 24,
            }
        }
         >
         < XAxis dataKey = "time" stroke = {
            theme.palette.text.secondary
        }
        />
                          <YAxis stroke={theme.palette.text.secondary}>
                            <Label
                              angle={270}
                              position="left"
                              style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
                            >
                              Sales ($)
                            </Label >
         <  / YAxis >
         < Line type = "monotone" dataKey = "amount" stroke = {
            theme.palette.primary.main
        }
        dot = {
            false
        }
        />
                        </LineChart >
         <  / ResponsiveContainer >
         <  /  > );
}
