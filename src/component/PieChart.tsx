import {
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer
}
  from 'recharts';

import React, { useState, useEffect } from 'react'
import { liste_vaccin,liste_vaccinT } from '../data/liste_vaccin';
import Title from './Title';
import theme from '../../custom.d';
import adresse from '../fonction/conf'
const chercheData = async (url: string): Promise<any> => {

  const response = await fetch(url, { mode: 'cors' });
  const responseData = await response.json();

  if (response.ok) {
    return responseData

  } else {
    alert(JSON.stringify(responseData))
    console.log(JSON.stringify(responseData))
    return false
  }

}
interface createDataT {
  name: string,
  value: number
}

function createData(name: string, value: number) {
  return {
    name,
    value
  };
}

// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const COLORS2 = [theme.palette.neutralShade.main, theme.palette.secondary.tt, theme.palette.secondary.third, theme.palette.secondary.fourth];
// const COLORS2 =[theme.palette.neutralShade.main, theme.palette.secondary.prout, '#FFBB28', '#FF8042'];
// const hhh=theme.palette.neutralShade.main


export function Camembert() {
  const [items, setItems] = useState<createDataT[]>([]);//l'état initial doit être un array ne contenant pas d'objet
  useEffect(() => {
    chercheData(adresse + ":8052/bilan_par_vaccin").then((tt:{[k:string]:number}) => {
      var arr:createDataT[] = []
      type A = keyof liste_vaccinT;
      Object.keys(tt).forEach((obj:string):void=> {
        arr.push(createData(liste_vaccin[obj].name, tt[obj]))
      })
      setItems(arr.slice(1));
    })

  }, []);
  return (
    <>
      <Title>Vaccin administré</Title>
      <ResponsiveContainer aspect={0.7}>
      <PieChart >
        <Pie isAnimationActive={false} data={items} dataKey="value" nameKey="name"  cx="50%" cy="50%" outerRadius="80%"  >
          {
            items.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS2[index % COLORS2.length]} />
            ))
          }
        </Pie>
        <Legend align="left" />
      </PieChart>
      </ResponsiveContainer>
      </>
      );
}