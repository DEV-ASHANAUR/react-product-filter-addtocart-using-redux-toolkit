import React from 'react'
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const CheckboxArea = ({cuisine,handleCheck}) => {
  const {checked,id,label} = cuisine;
  return (
    <div>
        <FormControlLabel control={<Checkbox checked={checked} onChange={()=>handleCheck(id)} />} label={label} />
    </div>
  )
}

export default CheckboxArea