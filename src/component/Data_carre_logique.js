import React, { useState, useEffect } from 'react'
import {
  subjectregion
} from './observable/observable'
import Data_carre from './Data_carre';
import shortid from 'shortid';
import { liste_nom_region } from '../fonction/fonction'
export default function Data_carre_logique() {

  const [data, setData] = useState(null);

  useEffect(() => {
    subjectregion.subscribe(
      v => {
        if (typeof v !== 'undefined') {
          var tt = [];
          var liste_nom_region2 = liste_nom_region;
          v.map((object, i) => {
            tt.push({
              "name": liste_nom_region2[object],
              "size": 24593
            })
          });
          setData(tt);
        }
      })
  }, [])

  if (data) {
    return <Data_carre key={shortid.generate()} data={data} />
  } else {
    return null
  }

}
