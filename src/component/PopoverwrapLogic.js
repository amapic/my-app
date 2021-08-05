import React, { useEffect, useState } from 'react';
import {
  subjectregion, subjectregionswitch
} from './observable/observable'
import Popoverwrap from './Popoverwrap';

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



const PopoverwrapLogic = ({ object, paths }) => {
  // const []=
  var hovered = false;
  var timer1;
  // var lasttimestamp=0;
  const [anchorEl, setAnchorEl] = React.useState({ a: false, b: 0, c: 0, d: "" });
  const [mapProps, setmapProps] = useState({
    etat: "init",
    selectedItems: ["11"]
  });

  useEffect(() => {
    subjectregionswitch.subscribe({
      next: (v) => {
        setmapProps({
          selectedItems: v,
          etat: "pas_init"
        })
      }
    });
  }, [])

  const open = Boolean(anchorEl.b);

  useEffect(() => {
    subjectregion.subscribe(
      v => {
        if (v.includes(object)) {
          setmapProps({
            selectedItems: v,
            etat: "pas_init"
          })
        } else {
          setmapProps({
            selectedItems: v,
            etat: "pas_init"
          })
        }
      }
    );
  }, [])

  const handlePopoverOpen = (event) => {
    if (!hovered) {
      hovered=true;
    };

    if (!open) {
      timer1 = setTimeout(
        chercheData("http://localhost:8052/bilan_par_region_dose1/" + object).then((x) => {
          if (hovered) {
            var y = (x * 100).toFixed(2) + "%"
            setAnchorEl({ a: event.domEvent.currentTarget, b: event.domEvent.pageX, c: event.domEvent.pageY, d: y });
          }
        }), 1000);

      

    }

  };

  const handlePopoverClose = () => {
    // lasttimestamp=0
    ;
    // let timer2 = setTimeout({
    // if (open) {
      clearTimeout(timer1)
      setAnchorEl({ a: null, b: 0, c: 0, d: "" });
      hovered = false
      
    // }
    // },1000)

    // clearTimeout(timer2)
  };

  const props = { object, paths, mapProps, anchorEl, open, handlePopoverClose, handlePopoverOpen }
  return (<Popoverwrap key={object} {...props} />)

}
export default PopoverwrapLogic;