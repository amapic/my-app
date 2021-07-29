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
    console.log(response)
    console.log(responseData)
    console.log(url)

    if (response.ok) {
        console.log("ok");
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
const RADIAN = Math.PI / 180;
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const renderCustomizedLabel = ([{ cx, cy, midAngle, innerRadius, outerRadius, percent, index },A]) => {
  const RADIAN = Math.PI / 180;
  // eslint-disable-next-line
  const radius = 10 + innerRadius + (outerRadius - innerRadius);
  // eslint-disable-next-line
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  // eslint-disable-next-line
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
   
    return (
      <text x={x} y={y} fill="red" textAnchor={x > cx ? 'start' : 'end'}  dominantBaseline="central">
        {A[index].name} ({(percent * 100).toFixed(0)}%)
      </text>
    );
  };

export function Camembert(){
    const [items, setItems] = useState([]);//l'état initial doit être un array ne contenant pas d'objet
    console.log("rr")
    // fill={colors[index]}
    useEffect(() => {
      chercheData("http://localhost:8052/bilan_par_vaccin").then((tt)=>{
          var arr=[]
          const radios = liste_vaccin
      Object.keys(tt).forEach((obj,i)=>{
          arr.push(createData(liste_vaccin[obj].name,tt[obj]))
      })
      setItems(arr.slice(1));})
                            
    },[]);
return(
  <>
<Title>Vaccin administré</Title>
<PieChart width={180} height={200} margin={0,0,0,0}>
{/* label={(e)=>renderCustomizedLabel([e,items])}  */}
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