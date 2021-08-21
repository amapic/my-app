import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import LinearProgress from "@material-ui/core/LinearProgress";

import theme from '../style/theme';

import { ResponsiveContainer, Bar, BarChart, XAxis, Cell, YAxis } from 'recharts'


const useStyles = makeStyles((theme) => ({
  depositContext: {
    flex: 1,
    padding: theme.spacing(1)
    // paddingLeft:theme.spacing(1),
    // paddingRight:theme.spacing(1)
  },
  LinearProgress: {
    flex: 1,
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1)
  },
  title: {
    paddingBottom: theme.spacing(4),
    margin: theme.spacing(5)
  },
}));

const chercheData = async (url) => {

  const response = await fetch(url);
  const responseData = await response.json();
  // var liste_nom_region2 = liste_nom_region
  // var liste_selected_str = []
  // liste_selected.forEach(element => liste_selected_str.push(parseInt(element)));
  if (response.ok) {
    var data = [];
    var dictOfResponseData = {}
    var miniDict = {}
    for (const [key, value] of Object.entries(responseData)) {
      // dictOfResponseData[key] = value
      miniDict = {}
      miniDict['name'] = key
      miniDict['1ere dose'] = value*100
      data.push(miniDict);
      
    }

    // for (let i = 0; i < Object.values(dictOfResponseData.reg).length; i++) {
    //   miniDict['name'] = liste_nom_region2[Object.values(dictOfResponseData.reg)[i]]
    //   miniDict['1ere dose'] = Object.values(dictOfResponseData.n_cum_dose1)[i]
    //   // miniDict['2eme dose'] = Object.values(dictOfResponseData.n_cum_dose2)[i]
    //   // if (liste_selected_str.includes(Object.values(dictOfResponseData.reg)[i])) {
    //   //     data.push(miniDict);
    //   // }
    //   miniDict = {}
    // }


    return data

  } else {
    alert(JSON.stringify(responseData))
    return false
  }

}

export default function Deposits3() {
  const [items, setItems] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    chercheData("http://localhost:8052/data_europeenne").then((tt) => {
      setItems(tt.slice(0,3));
    })

  }, []);

  function tickFormatter(value) {
    return value.toString() + "%"
  }

  return (
    <React.Fragment>
      <Title className={classes.title}>Europe </Title>

      <ResponsiveContainer height={350} width={'70%'}>

        <BarChart  data={items} margin={{ top: 5, right: 0, left: 5, bottom: 30 }}>
          <XAxis dataKey="name" angle={20} textAnchor="begin" interval={0} />
          <YAxis tickFormatter={tickFormatter} domain={[0, 100]} tickMargin={0} padding={{ right: 0 }} />
          <Bar dataKey="1ere dose"
          >
            {/* {
              g.map((entry, index) =>
                <Cell key={`cell-${index}`} fill={entry} />
              )
            } */}
          </Bar >
        </BarChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
