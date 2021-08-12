import React, { useEffect, useState, useContext } from 'react';

import Slider from '@material-ui/core/Slider';

import Typography from '@material-ui/core/Typography';

import { subjectrange } from './observable/observable'
import shortid from 'shortid';

import {SyntheticEvent} from './interface'

const chercheData = async (url:string) :Promise<any>=> {

  const response = await fetch(url)
  const responseData = await response.json()

  if (response.ok) {
    let local_range = responseData;

    let datetime:number[] = Object.values(local_range.timestamp)
    let datetext:string[] = Object.values(local_range.datetime)
    var marks2 = []
    for (const [index, element] of datetext.entries()) {
      marks2.push({ label: element, value: datetime[index] });
    }
    let local_range2 = { max_text: Math.max(...datetime), min_text: Math.min(...datetime), min: datetext.sort()[0], max: datetext.sort()[datetext.length - 1], marks: marks2 }
    subjectrange.next(datetext.sort()[0] + "-01/" + datetext.sort()[datetext.length - 1] + "-01")
    return [local_range2, false]
  } else {
    return [null, true]
  }
}

const chercheDataWrap=async(url:string):Promise<any>=>{
  return chercheData(url).then(x=>
    x)
}

function useFetch(url:string) {
  const [state, setState] = useState<{items:any[],loading:boolean}>({
    items: [],
    loading: true
  })

  useEffect(function () {
    (async function () {
      const response = await fetch(url)
      const responseData = await response.json()

      if (response.ok) {
        let local_range = responseData;

        let datetime:number[] = Object.values(local_range.timestamp)
        let datetext:string[] = Object.values(local_range.datetime)
        var marks2 = []
        for (const [index, element] of datetext.entries()) {
          marks2.push({ label: element, value: datetime[index] });
        }
        // let datetext   sortBy(datetext,['age'])
        let local_range2 = { max_text: Math.max(...datetime), min_text: Math.min(...datetime), min: datetext.sort()[0], max: datetext.sort()[datetext.length - 1], marks: marks2 }
        subjectrange.next([Math.min(...datetime),Math.max(...datetime)])
        setState({ items: local_range2, loading: false });
      } else {
        alert(JSON.stringify(responseData))
        setState(s => ({ ...s, loading: false }))
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
  // const { range, error } = useSWR("http://localhost:8052/liste_mois_detail", chercheDataWrap)
  const [error:boolean, range:any] = useFetch("http://localhost:8052/liste_mois_detail")
  const handleChange = (event:SyntheticEvent, newValue:[number,number]) => {

    subjectrange.next(newValue);

  };
  if (error || error === undefined) {
    return <div>loading...</div>
  } else {
    return (
      <>
        <Typography id="range-slider" gutterBottom>
          Date
          {range.max}
        </Typography>

        <Slider
          key={shortid.generate()}
          defaultValue={[range.min_text, range.max_text]}
          valueLabelDisplay="off"
          min={range.min_text}
          max={range.max_text}
          aria-labelledby="range-slider"
          step={null}
          color="primary"
          marks={range.marks}
          onChange={handleChange}
        />
      </>)
  }
}