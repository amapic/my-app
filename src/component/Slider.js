import React,{useEffect,useState,useContext} from 'react';
// import {
//     useTheme
// }
import Slider from '@material-ui/core/Slider';

import { DataContext } from '../context/DataContext';

import Typography from '@material-ui/core/Typography';
import { Global } from 'recharts';

import {RangeService,VaccinService} from './observable/observable'

function useFetch (url) {
  const [state, setState] = useState({
      items: [],
      loading: true
  })

  useEffect(function () {
      (async function () {
          const response = await fetch(url)
          const responseData = await response.json()
          // const responseData =response
          console.log(responseData)
    
        if (response.ok) {
        let local_range=responseData;

        let datetime=Object.values(local_range.timestamp)
        let datetext=Object.values(local_range.datetime)
        var marks2=[]
        for (const [index, element] of datetext.entries()) {
            marks2.push({label:element,value:datetime[index]});
            }

        let local_range2={max_text:Math.max(...datetime),min_text:Math.min(...datetime),min:Math.max(...datetext),max:Math.max(...datetext),marks:marks2}

        // setRange(local_range2)
        setState({items:local_range2,loading:false});
          } else {
              alert(JSON.stringify(responseData))
              setState(s => ({...s, loading: false}))
          }
      })()
  }, [])

  return [
      state.loading,
      state.items
  ]
}

export default function Slider_zone() {
    
    // const data = useContext(DataContext);
    const [loadingrange, range] = useFetch("http://localhost:8052/liste_mois_detail")
    // const rangeGlobal = useContext(RangeContext);
    var marks = [
        {
          value: 0,
          label: '0°C',
        },
        {
          value: 20,
          label: '20°C',
        },
        {
          value: 37,
          label: '37°C',
        },
        {
          value: 100,
          label: '100°C',
        },
      ];
    console.log(marks)
    let instancesCount = 0
    // const [range, setRange] = React.useState({max:100,min:-10});

    // useFetch("http://localhost:8052/liste_mois_detail") mettre ça dans useEffect
    // commencer par charger les données pas synchro, charger une seule fois une data au premier chargement
    const handleChange = (event, newValue) => {
        console.log(newValue);
        // console.log(range);
        RangeService.setData(newValue);
        VaccinService.setData(newValue);
        // rangeGlobal.setMonthRange(newValue);
    };

    // useEffect(() => {
    //   instancesCount += 1
    //   console.log({instancesCount})
    //   return () => {
    //     instancesCount -= 1
    //     console.log({instancesCount})
    //   }
    // }, [])


    // useEffect(function () {
    // if (typeof data.monthRange.timestamp !== 'undefined'){
    //     let local_range=data.monthRange;

    //     let datetime=Object.values(local_range.timestamp)
    //     let datetext=Object.values(local_range.datetime)
    //     var marks2=[]
    //     for (const [index, element] of datetext.entries()) {
    //         marks2.push({label:element,value:datetime[index]});
    //         }
            
    //     let local_range2={max:Math.max(...datetime),min:Math.min(...datetime),marks:marks2}

    //     setRange(local_range2);

    // }
    //   }, [data.monthRange]);


    return(
        <>
<Typography id="range-slider" gutterBottom>
  Temperature range
  {/* { range.max}  */}
</Typography> 

<Slider
  
  defaultValue={[range.min,range.max]}
  valueLabelDisplay="off"
  min={range.min_text}
  max={range.max_text}
  aria-labelledby="range-slider"
  step={null}
  marks={range.marks}
  onChangeCommitted={handleChange}
/>
</>)
}