import React, { useEffect, useState } from 'react';

import Slider from '@material-ui/core/Slider';

import Typography from '@material-ui/core/Typography';

import { subjectrange } from './observable/observable'
import shortid from 'shortid';
import adresse from '../fonction/conf'


interface itemstype {
  max_text: number,
  min_text: number,
  min: string,
  max: string,
  marks: { label: string, value: number }[]
}

type datetimeT = { [key: number]: string } & Iterable<string>



const chercheData = async (url: string): Promise<[itemstype | null, boolean]> => {

  const response = await fetch(url, { mode: 'cors' })
  const responseData = await response.json()

  if (response.ok) {
    let local_range = responseData;
    let datetime: number[]= Object.values(local_range.timestamp)
    let datetext: string[] = Object.values(local_range.datetime)
    var marks2 = []
    for (const [index, element] of Object.entries(datetext)) {
      marks2.push({ label: element, value: datetime[index] });
    }
    let local_range2: itemstype = { max_text: Math.max(...datetime), min_text: Math.min(...datetime), min: datetext.sort()[0], max: datetext.sort()[datetext.length - 1], marks: marks2 }
    // subjectrange.next(datetext.sort()[0] + "-01/" + datetext.sort()[datetext.length - 1] + "-01")
    return [local_range2, false]
  } else {
    return [null, true]
  }
}



function useFetch(url: string): [boolean, itemstype ] {
  let initalObject = {} as itemstype
  const [state, setState] = useState<{ loading: boolean, items: itemstype }>({
    items: initalObject,
    loading: true
  })

  useEffect(function () {
    (async function () {
      const response = await fetch(url, { mode: 'cors' })
      const responseData = await response.json()

      if (response.ok) {
        let local_range = responseData;

        let datetime: number[] = Object.values(local_range.timestamp)
        let datetext: string[] = Object.values(local_range.datetime)
        datetext[12]='2022-01'
        var marks2 = []
        for (const [index, element] of Object.entries(datetext)) {
          marks2.push({ label: element.replace('2021-13', '2022-01').replace('2022-13', '2022-01').substr(2).replace('20', ''), value: datetime[index] });
        }
        let local_range2 = { max_text: Math.max(...datetime), min_text: Math.min(...datetime), min: datetext.sort()[0], max: datetext.sort()[datetext.length - 1], marks: marks2 }
        subjectrange.next([Math.min(...datetime), Math.max(...datetime)])
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
  const [error, range] = useFetch(adresse + ":8052/liste_mois_detail")
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number | number[]): void => {

    subjectrange.next(newValue);

  };
  if (error || error === undefined) {
    return <div>loading...</div>
  } else {
    for (var i = range.marks.length - 2; i > 1; i--) {

      if (i % 2 === 0) {

        range.marks.splice(i, 1);
      }

    }
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