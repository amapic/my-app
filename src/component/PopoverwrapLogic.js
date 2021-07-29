import React,{useEffect,useState} from 'react';
import {
  subjectregion,subjectregionswitch
} from './observable/observable'
import Popoverwrap from './Popoverwrap';

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



const PopoverwrapLogic = ({object, paths}) => {
  // const []=
  var hovered=false;
  var lasttimestamp=0;
  const [anchorEl, setAnchorEl] = React.useState({ a: false, b: 0, c: 0, d: "" });
  const [mapProps, setmapProps] = useState({
    etat: "init",
    selectedItems: ["11"]
  });

  const open = Boolean(anchorEl.b);

  useEffect(() => {
    subjectregion.subscribe({
      next: (v) => {
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
    });
  }, [])

  const handlePopoverOpen = (event) => {
    // "region-poly-" + object
    console.log(hovered);
    console.log(lasttimestamp);
    if (!hovered){
      hovered=true;
    };
   
      if (!open) {
        setTimeout(
        chercheData("http://localhost:8052/bilan_par_region_dose1/"+object).then((x)=>{
          if (hovered){
            x=(x.value*100).toFixed(2) + "%"
            setAnchorEl({ a: event.domEvent.currentTarget, b: event.domEvent.pageX, c: event.domEvent.pageY, d: x});
          }
      }),1000);
      }
    // }
  };

  const handlePopoverClose = () => {
    lasttimestamp=0
    hovered=false;
    if (open) {
      setAnchorEl({ a: null, b: null, c: 0, d: "" });
    }
  };

  const props={object, paths, mapProps, anchorEl,open,handlePopoverClose,handlePopoverOpen}
  return (<Popoverwrap key={object} {...props}/>)

}
export default PopoverwrapLogic;