import {
    PieChart,
    Pie,
    Cell,
    Legend
}
    from 'recharts';

import React,{useState,useEffect} from 'react'
import { liste_vaccin } from '../data/liste_vaccin';
import Title from './Title';
import theme from '../style/theme';

const chercheData =async (url: string): Promise<any> =>{

    const response = await fetch(url);
    const responseData = await response.json();

    if (response.ok) {
        return responseData

    } else {
        alert(JSON.stringify(responseData))
        return false
    }

}

interface createDataT {
    name:string,
    value:string
}

function createData(name:string, value:string) {
    return {
        name,
        value
    };
}
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const COLORS2 = [theme.palette.secondary.first, theme.palette.secondary.second, theme.palette.secondary.third, theme.palette.secondary.first];


export function Camembert(){
    const [items, setItems] = useState<createDataT[]>([]);//l'état initial doit être un array ne contenant pas d'objet
    useEffect(() => {
      chercheData("http://localhost:8052/bilan_par_vaccin").then((tt)=>{
          var arr:createDataT[]=[]
      Object.keys(tt).forEach((obj:string)=>{
          arr.push(createData(liste_vaccin[obj].name,tt[obj]))
      })
      setItems(arr.slice(1));})
                            
    },[]);
return(
  <>
<Title align="center">Vaccin administré</Title>
<PieChart width={180} height={200} margin={0,0,0,0}>
  <Pie data={items} nameKey="name" cx="50%" cy="50%" outerRadius={40} >
    {
      items.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS2[index % COLORS2.length]}/>
      ))
    }
  </Pie>
  <Legend align="left"/>
</PieChart></>);
}