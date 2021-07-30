import React, { useState } from 'react'
import {
  subjectregion
} from './observable/observable'
import DDD from './Data_carre';
import shortid from 'shortid';
export default function Data_carre_logique(){

  const [data, setData] = useState(null);

  useEffect(() => {
    subjectregion.subscribe({
      next: (v) => {
        let tt;
        v.map((object, i) => {
          tt.append({
            "name": "axis",
            "children": [
              {
                "name": "Axis",
                "size": 24593
              }
            ]
          })
        });
        setData("tt");
        console.log("tttttttttttttttttt");
      }})
    },[])

    if (data) {
      return <DDD key={shortid.generate()} data={data} />
    } else {
      return null
    }

  }
    