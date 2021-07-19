import React,{useEffect,useState,useContext} from 'react';
// import {
//     useTheme
// }
import Slider from '@material-ui/core/Slider';

import { VaccinSelectedContext } from '../context/DataContext';

import Typography from '@material-ui/core/Typography';


export default function Slider_vaccin() {
    
    const vaccin = useContext(VaccinSelectedContext);

    var marks = [
        {
          value: 0,
          label: 'Tous vaccins',
        },
        {
          value: 1,
          label: 'COMIRNATY Pfizer/BioNTech',
        },
        {
          value: 2,
          label: 'Moderna',
        },
        {
          value: 3,
          label: 'AstraZeneka',
        },
        {
          value: 4,
          label: 'Janssen',
        },
      ];

    const handleChange = (event, newValue) => {
        console.log(newValue);
        vaccin.setVaccinSelected(newValue);
    };

    return(
        <>
<Typography id="range-slider" gutterBottom>
  Temperature range
</Typography> 

<Slider
  defaultValue={0}
  valueLabelDisplay="off"
  min={0}
  max={4}
  aria-labelledby="discrete-slider-restrict"
  step={null}
  marks={marks}
  onChange={handleChange}
/>
</>)
}