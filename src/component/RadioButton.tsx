import { liste_vaccin } from "../data/liste_vaccin";
import { ButtonGroup, ToggleButton } from 'react-bootstrap';
import React, { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { subjectvac } from "./observable/observable";

export function ToggleButtonPerso(props:any) {
  // const [checked, setChecked] = useState(false);
  const [radioValue, setRadioValue] = useState('0');

  const radios = liste_vaccin
  const handleChange = (newValue:string) => {
    console.log(newValue);
    subjectvac.next(newValue);
  };

  return (
    <>
      <br />
      <div className="btnn-group">
        {radios.map((item, index) => {
          let classInput
          let classLabel
          if (index === 0) {
            classInput = "btnn-check first"
            classLabel = "btnn btnn-secondary btnn-secondary-first"
          } else if (index === radios.length - 1) {
            classInput = "btnn-check btnn-check-last"
            classLabel = "btnn btnn-secondary btnn-secondary-last"
          } else {
            classInput = "btnn-check btnn-check"
            classLabel = "btnn btnn-secondary"
          }
          return (

            <>
            {radioValue === item.value}
              <input checked={radioValue === item.value} onChange={(e) => { setRadioValue(e.currentTarget.value); handleChange(e.currentTarget.value) }} className={classInput} id={"radio1-" + item.value.toString()} name="radio" type="radio" value={item.value.toString()}/>
              <label id={"radio2-" + item.value.toString()} htmlFor={"radio1-" + item.value.toString()} role="button" className={classLabel}>{item.name}</label>
            </>)
        })}
      </div>
      {/* <ButtonGroup className="mb-2">
        {radios.map((radio, idx) => {

          return (
            <ToggleButton
              key={idx}
              id={`radio-${idx}`}
              type="radio"
              variant="secondary"
              name="radio"
              value={radio.value}
              checked={radioValue === radio.value}
              onChange={(e) => { setRadioValue(e.currentTarget.value); handleChange(e.currentTarget.value) }}
            >
              {radio.name}
            </ToggleButton>
          )
        })}
      </ButtonGroup> */}

    </>
  );
}
