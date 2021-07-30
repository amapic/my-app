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

const chercheData = async (url) => {

    const response = await fetch(url);
    const responseData = await response.json();

    if (response.ok) {
        return responseData

    } else {
        alert(JSON.stringify(responseData))
        return false
    }

}

function createData(name, value) {
    return {
        name,
        value
    };
}
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];


export function Camembert(){
    const [items, setItems] = useState([]);//l'état initial doit être un array ne contenant pas d'objet
    useEffect(() => {
      chercheData("http://localhost:8052/bilan_par_vaccin").then((tt)=>{
          var arr=[]
      Object.keys(tt).forEach((obj)=>{
          arr.push(createData(liste_vaccin[obj].name,tt[obj]))
      })
      setItems(arr.slice(1));})
                            
    },[]);
return(
  <>
<Title>Vaccin administré</Title>
<PieChart width={180} height={200} margin={0,0,0,0}>
  <Pie data={items} nameKey="name" cx="50%" cy="50%" outerRadius={40} >
    {
      items.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
      ))
    }
  </Pie>
  <Legend align="left"/>
</PieChart></>);
}