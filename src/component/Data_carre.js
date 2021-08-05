import { Treemap } from 'recharts'
import React, { useState } from 'react'
import shortid from 'shortid';
export default function Data_carre(data2) {

  const data = [
    {
      "name": "Axis",
      "size": 24593
    },
    {
      "name": "Axes",
      "size": 1302
    },
    {
      "name": "AxisGridLine",
      "size": 652
    },
    {
      "name": "AxisLabel",
      "size": 636
    },
    {
      "name": "CartesianAxes",
      "size": 6703
    }
  ]

  const [x, setx] = useState();
  return (
    <Treemap
      key={shortid.generate()}
      isAnimationActive={false}
      width={730}
      height={250}
      data={data2.data}
      dataKey="size"
      ratio={4 / 3}
      stroke="#fff"
      fill="rgb(0, 136, 254)"
    />
  )
}