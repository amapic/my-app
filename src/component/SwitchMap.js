
import React,{useState,useEffect} from 'react'
import { liste_id_region } from '../fonction/fonction';
import { subjectregionswitch } from "./observable/observable";
import { Switch } from '@material-ui/core';

export function SwitchMap(){
    const [checked,setChecked]=useState(false)

    const toggleChecked = (Value) => {
        if (!Value){
            var rreturn=[]
            var liste_id_region2=liste_id_region
            Object.keys(liste_id_region2).map((object,i)=>rreturn.push(liste_id_region2[object]))
            subjectregionswitch.next(rreturn);
            // setChecked(!checked)
        }else{
            subjectregionswitch.next([11]);
            // setChecked(!checked)
        }
    };

    
    return(
<Switch value="checkedA" inputProps={{ 'aria-label': 'Switch A' }} checked={checked} onChange={toggleChecked(checked)} />)

    }