import React,{useEffect,useState,useContext} from 'react';

import Slider from '@material-ui/core/Slider';

import Typography from '@material-ui/core/Typography';

import {subjectrange} from './observable/observable'

function useFetch (url) {
  const [state, setState] = useState({
      items: [],
      loading: true
  })

  useEffect(function () {
      (async function () {
          const response = await fetch(url)
          const responseData = await response.json()
          console.log(responseData)
        
        if (response.ok) {
        let local_range=responseData;

        let datetime=Object.values(local_range.timestamp)
        let datetext=Object.values(local_range.datetime)
        var marks2=[]
        for (const [index, element] of datetext.entries()) {
            marks2.push({label:element,value:datetime[index]});
            }
        // let datetext   sortBy(datetext,['age'])
        let local_range2={max_text:Math.max(...datetime),min_text:Math.min(...datetime),min:datetext.sort()[0],max:datetext.sort()[datetext.length-1],marks:marks2}
        subjectrange.next(datetext.sort()[0] + "-01/" + datetext.sort()[datetext.length-1]+ "-01")
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

export default function SliderZone() {
    
  // subjectrange est mis à jour dans useFetch
    const [loadingrange, range] = useFetch("http://localhost:8052/liste_mois_detail")
    // console.log(marks)
 
    const handleChange = (event, newValue) => {
        console.log(newValue);

        subjectrange.next("2021-03-03/2021-04-04");
        
    };



    return(
        <>
<Typography id="range-slider" gutterBottom>
  Date
  {/* { range.max}  */}
</Typography> 

<Slider
  // valueLabelDisplay
  defaultValue={[1608359008,1626330208]}
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