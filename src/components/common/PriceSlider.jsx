import React, { useState } from 'react'
import Slider from '@mui/material/Slider';
const PriceSlider = ({ value, changePrice }) => {
  // console.log(value);
  return (
    <div >
      <Slider
        value={value}
        onChange={changePrice}
        min={1000}
        max={5000}
        valueLabelDisplay="on" />
    </div>
  )
}

export default PriceSlider